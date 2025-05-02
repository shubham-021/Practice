const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeTheHinduSection(section = 'national', options = {}) {
  // Default options
  const defaultOptions = {
    useProxy: false,
    proxyUrl: null,
    saveToFile: true,
    outputFile: `the-hindu-${section}-headlines.json`,
    delay: 0
  };
  
  // Merge default options with provided options
  const config = { ...defaultOptions, ...options };
  
  try {
    // Map section names to URLs
    const sectionUrls = {
      'national': 'https://www.thehindu.com/news/national/',
      'international': 'https://www.thehindu.com/news/international/',
      'business': 'https://www.thehindu.com/business/',
      'sport': 'https://www.thehindu.com/sport/',
      'entertainment': 'https://www.thehindu.com/entertainment/',
      'science': 'https://www.thehindu.com/sci-tech/'
    };
    
    // Get the URL for the requested section
    const url = sectionUrls[section] || sectionUrls['national'];
    
    // Set a realistic user agent
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Referer': 'https://www.thehindu.com/',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    };
    
    // Create request config
    const requestConfig = { headers };
    
    // Add proxy if enabled
    if (config.useProxy && config.proxyUrl) {
      requestConfig.proxy = {
        host: new URL(config.proxyUrl).hostname,
        port: parseInt(new URL(config.proxyUrl).port),
        protocol: new URL(config.proxyUrl).protocol.slice(0, -1)
      };
    }
    
    // Optional delay to be more respectful to the server
    if (config.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, config.delay));
    }
    
    console.log(`Fetching data from The Hindu - ${section} section...`);
    const response = await axios.get(url, requestConfig);
    const $ = cheerio.load(response.data);
    
    // Arrays to store our headlines
    const headlines = [];
    
    // Function to add an item to headlines array to avoid duplicates
    const addHeadline = (headline, link, source, imageUrl = null) => {
      // Skip if empty or already exists
      if (!headline || headlines.some(h => h.headline === headline)) return;
      
      // Ensure link is absolute
      if (link && !link.startsWith('http')) {
        link = new URL(link, url).href;
      }
      
      headlines.push({
        headline,
        link,
        source,
        imageUrl,
        timestamp: new Date().toISOString()
      });
    };
    
    // ==== MAIN CONTENT SCRAPING ====
    // 1. The primary story cards
    $('.story-card').each((i, element) => {
      const headlineElement = $(element).find('.story-card-news h3, .story-card-news h2');
      const headline = headlineElement.text().trim();
      const link = $(element).find('a').attr('href');
      const imageUrl = $(element).find('img').attr('src') || null;
      
      addHeadline(headline, link, 'story-card', imageUrl);
    });
    
    // 2. Top story section
    $('.top-news ul li').each((i, element) => {
      const headline = $(element).find('a').text().trim();
      const link = $(element).find('a').attr('href');
      
      addHeadline(headline, link, 'top-news');
    });
    
    // 3. Other news sections
    $('.other-news ul li').each((i, element) => {
      const headline = $(element).find('a').text().trim();
      const link = $(element).find('a').attr('href');
      
      addHeadline(headline, link, 'other-news');
    });
    
    // 4. Trending titles
    $('.trending-title').each((i, element) => {
      const headline = $(element).text().trim();
      const link = $(element).closest('a').attr('href');
      
      addHeadline(headline, link, 'trending-title');
    });
    
    // 5. More general section for list stories
    $('.storylist1 li').each((i, element) => {
      const headline = $(element).find('a').text().trim();
      const link = $(element).find('a').attr('href');
      
      addHeadline(headline, link, 'storylist1');
    });
    
    // 6. Special featured section
    $('.special-5 .hover-icon').each((i, element) => {
      const headline = $(element).text().trim();
      const link = $(element).closest('a').attr('href');
      
      addHeadline(headline, link, 'special-featured');
    });
    
    // 7. List-title section
    $('.list-title').each((i, element) => {
      const headline = $(element).text().trim();
      const link = $(element).closest('a').attr('href');
      
      addHeadline(headline, link, 'list-title');
    });

    console.log(`Found ${headlines.length} headlines in the ${section} section`);
    
    // Save to file if enabled
    if (config.saveToFile) {
      fs.writeFileSync(
        config.outputFile,
        JSON.stringify(headlines, null, 2),
        'utf8'
      );
      console.log(`Headlines saved to ${config.outputFile}`);
    }
    
    return headlines;
  } catch (error) {
    console.error(`Error scraping The Hindu ${section} section:`, error.message);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Scrape India/National section
    const headlines = await scrapeTheHinduSection('national', {
      delay: 2000, // 2 second delay
      saveToFile: true
    });
    
    // Display first 5 headlines
    console.log('Sample headlines:');
    headlines.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. ${item.headline}`);
      console.log(`   Link: ${item.link}`);
      console.log(`   Source class: ${item.source}`);
      console.log('-------------------');
    });
    
    console.log(`Total headlines found: ${headlines.length}`);
  } catch (error) {
    console.error('Failed to run scraper:', error.message);
  }
}

// Run the script
main();

// Export for use in other files
module.exports = { scrapeTheHinduSection };