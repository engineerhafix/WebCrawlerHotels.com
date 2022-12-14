const puppeteer = require('puppeteer');



// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {

    // Pass the User-Agent Test.
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    }

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url= 'https://www.booking.com/searchresults.en-us.html?label=gen173nr-1FCAEoggI46AdIM1gEaLUBiAEBmAExuAEXyAEP2AEB6AEB-AECiAIBqAIDuAKo5_SbBsACAdICJDBiZDc1YjY0LWE5NjItNDZjYy05MjNlLTgxYjgyNTUwMmI4MNgCBeACAQ&aid=304142&ss=Mingora&ssne=Mingora&ssne_untouched=Mingora&lang=en-us&sb=1&src_elem=sb&src=index&dest_id=-2769132&dest_type=city&checkin=2022-11-27&checkout=2022-11-30&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure&offset=0'
    await page.goto(url);

    await page.screenshot({path: 'example.png'});
    const selector = "div#search_results_table div > h3 > a";

    //await page.waitForSelector('h3 > a');

    const titles = await page.evaluate(() => 
        Array.from(document.querySelectorAll("h3 > a"))
            .map((name) => name.innerContent)
        );
        
    console.log(titles.length);
    console.log(titles);


    await browser.close();

})();