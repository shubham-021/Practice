const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Modern scraper for The Hindu newspaper's national/India section
 * Designed to overcome common blocking mechanisms
 */
async function scrapeTheHinduNational() {
  try {
    // Target URL
    const url = 'https://www.thehindu.com/news/national/';
    
    // Configure headers to closely mimic a real browser
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Sec-Ch-Ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'Referer': 'https://www.google.com/'
    };
    
    console.log(`Fetching data from The Hindu national section: ${url}`);
    
    // Make the request with a timeout
    const response = await axios.get(url, { 
      headers,
      timeout: 30000, // 30 seconds timeout
      maxRedirects: 5
    });
    
    // For debugging purposes, save the HTML
    fs.writeFileSync('thehindu_response.html', response.data, 'utf8');
    console.log(`Saved raw HTML response (${response.data.length} bytes)`);
    
    // Load the response into cheerio
    const $ = cheerio.load(response.data);
    const headlines = [];
    
    // Helper function to clean text
    const cleanText = (text) => {
      return text.replace(/\s+/g, ' ').trim();
    };
    
    // Helper function to add headline without duplicates
    const addHeadline = (title, link, source) => {
      // Skip empty or already existing headlines
      if (!title || headlines.some(h => h.title === title)) return;
      
      // Make sure link is absolute URL
      if (link && !link.startsWith('http')) {
        link = new URL(link, url).href;
      }
      
      headlines.push({
        title: cleanText(title),
        link,
        source
      });
    };
    
    console.log('Extracting headlines using multiple selectors...');
    
    // Method 1: Find all articles
    $('article').each((i, element) => {
      const title = $(element).find('h2, h3, .title, .card-title').text();
      const link = $(element).find('a').attr('href');
      if (title) addHeadline(title, link, 'article');
    });
    
    // Method 2: Find all story cards
    $('.story-card').each((i, element) => {
      const title = $(element).find('h1, h2, h3, h4').text();
      const link = $(element).find('a').attr('href');
      if (title) addHeadline(title, link, 'story-card');
    });
    
    // Method 3: Find all links that look like news articles
    $('a').each((i, element) => {
      const $el = $(element);
      const href = $el.attr('href');
      const text = $el.text();
      
      // Check if this link seems like a news article
      if (href && text && href.includes('/article') && href.includes('thehindu.com')) {
        // Get the closest heading or use the link text itself
        let title = $el.closest('div').find('h2, h3, h4').text() || text;
        addHeadline(title, href, 'article-link');
      }
    });
    
    // Method 4: Find headlines by common classes
    const headlineSelectors = [
      '.title', '.headline', '.heading', '.card-title',
      '[class*="title"]', '[class*="headline"]', '[class*="heading"]'
    ];
    
    headlineSelectors.forEach(selector => {
      $(selector).each((i, element) => {
        const $el = $(element);
        // Skip elements that are likely not headlines
        if ($el.find('img').length > 0 && $el.text().length < 10) return;
        
        const title = $el.text();
        const link = $el.is('a') ? $el.attr('href') : $el.find('a').attr('href') || $el.closest('a').attr('href');
        
        if (title && title.length > 15) {
          addHeadline(title, link, `selector-${selector}`);
        }
      });
    });
    
    // Method 5: Look specifically for common The Hindu patterns
    // Based on analyzing the site structure
    $('.31x31-topic-strip ul li').each((i, element) => {
      const title = $(element).text();
      const link = $(element).find('a').attr('href');
      addHeadline(title, link, '31x31-topic-strip');
    });
    
    $('.100_4x_1 h3').each((i, element) => {
      const title = $(element).text();
      const link = $(element).find('a').attr('href') || $(element).closest('a').attr('href');
      addHeadline(title, link, '100_4x_1');
    });
    
    $('.otherstories ul li').each((i, element) => {
      const title = $(element).text();
      const link = $(element).find('a').attr('href');
      addHeadline(title, link, 'otherstories');
    });
    
    // Save the results
    const outputFile = 'thehindu_headlines.json';
    fs.writeFileSync(
      outputFile,
      JSON.stringify(headlines, null, 2),
      'utf8'
    );
    
    console.log(`Found ${headlines.length} headlines`);
    console.log(`Headlines saved to ${outputFile}`);
    
    // Print some sample headlines
    console.log('\nSample headlines:');
    headlines.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Link: ${item.link}`);
      console.log(`   Source: ${item.source}`);
      console.log('-------------------');
    });
    
    return headlines;
  } catch (error) {
    console.error('Error scraping The Hindu:', error.message);
    if (error.response) {
      console.error(`Status code: ${error.response.status}`);
    }
    throw error;
  }
}

// Execute the function
scrapeTheHinduNational()
  .then(headlines => {
    console.log(`Successfully extracted ${headlines.length} headlines from The Hindu national section`);
  })
  .catch(error => {
    console.error('Failed to scrape The Hindu:', error);
  });