const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeTheHinduWithPuppeteer() {
  const url = 'https://www.thehindu.com/news/national/';
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`Loading The Hindu national section: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    const headlines = await page.evaluate(() => {
      const cleanText = (text) => text.replace(/\s+/g, ' ').trim();
      const results = [];
      const links = document.querySelectorAll('a');

      links.forEach(link => {
        const title = cleanText(link.innerText);
        const href = link.href;

        if (
          title.length > 15 &&
          href.includes('/news/national/') &&
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
    });

    const outputFile = 'thehindu_headlines.json';
    fs.writeFileSync(outputFile, JSON.stringify(headlines, null, 2), 'utf8');

    console.log(`✅ Found ${headlines.length} headlines`);
    console.log(`💾 Headlines saved to ${outputFile}`);
    console.log('\n📌 Sample headlines:\n');

    headlines.slice(0, 5).forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Link: ${item.link}`);
      console.log('-------------------');
    });

    return headlines;
  } catch (error) {
    console.error('❌ Error scraping with Puppeteer:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the scraper
scrapeTheHinduWithPuppeteer();
