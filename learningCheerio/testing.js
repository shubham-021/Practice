const axios = require('axios')
const cheerio = require('cheerio')

async function scrapetext(url){
    try{
        const url = 'https://www.thehindu.com/news/national/';
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

        console.log('Fetching data from The Hindu - India Section...');

        const res = await axios.get(url , {headers});
        const $ = cheerio.load(res.data)

        const headlines = []
        console.log('Extracting main headlines...')

        $('.story-card').each((i,element)=>{
            const headlineElement = $(element).find('.story-card-news h3 , .story-card-news h2');
            const headline = headlineElement.text().trim();
            const link = $(element).find('a').attr('href')

            if(headline){
                headlines.push({
                    headline,
                    link,
                    source : 'story-card'
                })
            }
        })

        $('.storylist1 li').each((i, element) => {
            const headline = $(element).find('a').text().trim();
            const link = $(element).find('a').attr('href');
            
            if (headline) {
              headlines.push({
                headline,
                link,
                source: 'storylist1'
              });
            }
          })

          $('.trending-title').each((i,element)=>{
            const headline = $(element).find('a').text().trim();
            const link = $(element).find('a').attr('href');
            
            if (headline) {
              headlines.push({
                headline,
                link,
                source: 'trending-title'
              });
            }
          })

        $('.100_3x_4').each((i,element)=>{
            const headline = $(element).find('a').text().trim();
            const link = $(element).find('a').attr('href');
            
            if (headline) {
              headlines.push({
                headline,
                link,
                source: '100_3x_4'
              });
            }
        })

        console.log(`Found ${headlines.length} headlines`)

        return headlines
    } catch (error){
        console.error('Error scraping The Hindu:' , error)
        throw error
    }
}


scrapetext()
.then(headlines => {
    console.log('Headlines from The Hindu - India Section');
    headlines.forEach((item , index) => {
        console.log(`${index+1}. ${item.headline}`)
        console.log(`Link: ${item.link}`)
        console.log(`Source class: ${item.source}`)
        console.log('----------------------------------------')
    })
})
.catch(error => {
    console.error('Failed to scrape The Hindu:' , error.message)
})