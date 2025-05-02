const puppeteer = require('puppeteer');
const fs = require('fs');

const categories = {
  National: 'https://www.thehindu.com/news/national/',
  International: 'https://www.thehindu.com/news/international/',
  Business: 'https://www.thehindu.com/business/',
  Sports: 'https://www.thehindu.com/sport/',
  Science: 'https://www.thehindu.com/sci-tech/',
  Entertainment: 'https://www.thehindu.com/entertainment/'
};

async function scrapeCategory(page, category, url) {
  console.log(`Scraping ${category} from ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  const headlines = await page.evaluate((category) => {
    const cleanText = (text) => text.replace(/\s+/g, ' ').trim();
    const results = [];
    const links = document.querySelectorAll('a');

    links.forEach(link => {
      const title = cleanText(link.innerText);
      const href = link.href;

      if (
        title.length > 15 &&
        href.includes('/' + category.toLowerCase()) &&
        !results.some(h => h.title === title)
      ) {
        results.push({
          title,
          link: href,
          timestamp: new Date().toISOString()
        });
      }
    });

    return results;
  }, category);

  return headlines;
}

async function scrapeAllCategories() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const finalResults = {};

  try {
    for (const [category, url] of Object.entries(categories)) {
      const headlines = await scrapeCategory(page, category, url);
      finalResults[category] = headlines;
      console.log(`${category}: ${headlines.length} headlines`);
    }

    const outputFile = 'thehindu_all_headlines.json';
    fs.writeFileSync(outputFile, JSON.stringify(finalResults, null, 2), 'utf8');
    console.log(`\nAll headlines saved to ${outputFile}`);
  } catch (err) {
    console.error('Scraping error:', err.message);
  } finally {
    await browser.close();
  }
}

scrapeAllCategories();
