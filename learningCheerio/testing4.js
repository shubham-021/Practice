const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * Scrape The Hindu national section using Puppeteer
 * This is more effective against modern websites with JavaScript rendering
 * and anti-scraping mechanisms
 */
async function scrapeTheHinduWithPuppeteer() {
  console.log('Launching browser...');
  // Launch Puppeteer with appropriate options
  const browser = await puppeteer.launch({
    headless: "new", // Use the new headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
    ]
  });

  const page = await browser.newPage();
  
  // Set a realistic viewport
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Set user agent to avoid detection
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
  
  // Set extra HTTP headers
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Referer': 'https://www.google.com/'
  });

  try {
    // Navigate to The Hindu national section
    const url = 'https://www.thehindu.com/news/national/';
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { 
      waitUntil: 'networkidle2', // Wait until the network is idle
      timeout: 60000 // 60 seconds timeout
    });
    
    // Wait for content to load
    console.log('Waiting for content to load...');
    await page.waitForSelector('article, .story-card, .story-card-news, h2, h3', { timeout: 30000 });
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'thehindu_screenshot.png', fullPage: true });
    console.log('Screenshot saved as thehindu_screenshot.png');

    // Save the HTML content for analysis
    const htmlContent = await page.content();
    fs.writeFileSync('thehindu_puppeteer.html', htmlContent, 'utf8');
    console.log('HTML content saved to thehindu_puppeteer.html');

    // Extract all headlines
    console.log('Extracting headlines...');
    const headlines = await page.evaluate(() => {
      const results = [];
      const seen = new Set(); // To avoid duplicates
      
      // Helper function to clean text
      const cleanText = (text) => {
        return text.replace(/\s+/g, ' ').trim();
      };
      
      // Helper function to add a headline if it's not a duplicate
      const addHeadline = (title, link, source) => {
        title = cleanText(title);
        if (!title || seen.has(title)) return;
        seen.add(title);
        
        results.push({ title, link, source });
      };

      // Method 1: Extract from story cards
      document.querySelectorAll('.story-card').forEach(card => {
        const titleEl = card.querySelector('h1, h2, h3, h4');
        if (titleEl) {
          const title = titleEl.textContent;
          const linkEl = card.querySelector('a');
          const link = linkEl ? linkEl.href : null;
          addHeadline(title, link, 'story-card');
        }
      });
      
      // Method 2: Extract from article elements
      document.querySelectorAll('article').forEach(article => {
        const titleEl = article.querySelector('h1, h2, h3, h4, .title');
        if (titleEl) {
          const title = titleEl.textContent;
          const linkEl = article.querySelector('a');
          const link = linkEl ? linkEl.href : null;
          addHeadline(title, link, 'article');
        }
      });
      
      // Method 3: Extract from common heading elements that look like news
      document.querySelectorAll('h2, h3').forEach(heading => {
        // Skip very short headings or ones that seem like section titles
        if (heading.textContent.length < 20) return;
        
        const title = heading.textContent;
        const linkEl = heading.querySelector('a') || heading.closest('a');
        const link = linkEl ? linkEl.href : null;
        
        // Only include if it seems like a news headline (has enough text and possibly a link)
        if (title && title.length > 15) {
          addHeadline(title, link, 'heading');
        }
      });
      
      // Method 4: Find all links that look like articles
      document.querySelectorAll('a').forEach(link => {
        const href = link.href;
        // Focus on article links
        if (href && href.includes('/article') && href.includes('thehindu.com')) {
          const text = link.textContent;
          if (text && text.length > 15 && !text.includes('ADVERTISEMENT')) {
            addHeadline(text, href, 'article-link');
          }
        }
      });
      
      // Find headlines in specific sections
      const contentSections = [
        '.31x31-topic-strip', 
        '.100_4x_1',
        '.otherstories',
        '.storytracker-sm-heading',
        '.card-title',
        '.storylist1',
        '.brief-story',
        '.main-content'
      ];
      
      contentSections.forEach(selector => {
        document.querySelectorAll(selector).forEach(section => {
          // Get direct headline if section is a heading
          if (section.tagName === 'H1' || section.tagName === 'H2' || section.tagName === 'H3') {
            const title = section.textContent;
            const linkEl = section.querySelector('a') || section.closest('a');
            const link = linkEl ? linkEl.href : null;
            addHeadline(title, link, selector);
            return;
          }
          
          // Look for headlines within this section
          section.querySelectorAll('h1, h2, h3, h4, .title, .heading, a').forEach(el => {
            const title = el.textContent;
            if (title && title.length > 15 && !title.includes('ADVERTISEMENT')) {
              const linkEl = el.tagName === 'A' ? el : el.querySelector('a') || el.closest('a');
              const link = linkEl ? linkEl.href : null;
              addHeadline(title, link, `${selector}-child`);
            }
          });
        });
      });
      
      return results;
    });

    // Save results to file
    const outputFile = 'thehindu_puppeteer_headlines.json';
    fs.writeFileSync(
      outputFile,
      JSON.stringify(headlines, null, 2),
      'utf8'
    );
    
    console.log(`Found ${headlines.length} headlines`);
    console.log(`Results saved to ${outputFile}`);
    
    // Print sample headlines
    console.log('\nSample headlines:');
    headlines.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Link: ${item.link || 'No link'}`);
      console.log(`   Source: ${item.source}`);
      console.log('-------------------');
    });
    
    return headlines;
  } catch (error) {
    console.error('Error during scraping:', error);
    // Still take a screenshot in case of error to see what went wrong
    try {
      await page.screenshot({ path: 'thehindu_error_screenshot.png' });
      console.log('Error screenshot saved as thehindu_error_screenshot.png');
    } catch (screenshotError) {
      console.error('Failed to take error screenshot:', screenshotError);
    }
    throw error;
  } finally {
    // Always close the browser
    await browser.close();
    console.log('Browser closed');
  }
}

scrapeTheHinduWithPuppeteer()
.then(headlines => {
    console.log(`Successfully extracted ${headlines.length} headlines`);
})
.catch(error => {
    console.error('Failed to scrape The Hindu:', error);
    process.exit(1);
});