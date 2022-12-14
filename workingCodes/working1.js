// working code Export and populates array of hotel names and urls and store them in a Json File

const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');
const outputFile = './swat.json';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);


    const url= 'https://www.hotels.com/Hotel-Search?adults=2&d1=2022-12-20&d2=2022-12-21&destination=Swat%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan&endDate=2022-12-21&latLong=35.232475%2C72.511635&locale=en_IE&pos=HCOM_EMEA&regionId=553248635975094920&selected=&semdtl=&siteid=300000025&sort=RECOMMENDED&startDate=2022-12-20'
    await page.goto(url);

    await new Promise(r => setTimeout(r, 5000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 5000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 5000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 5000))

    await page.screenshot({path: 'example.png'});

//*********************************************************************** */

    //grab the name of the title hotel and url both at the same time
    const hotels = await page.evaluate(() => {
            const hotelNames = { NameOfTheHotels:
                Array.from(document.querySelectorAll('[data-stid="lodging-card-responsive"] h2'))
                .map((name)=> name.textContent)
            }
            const urls =  {  UrlsOfTheHotels: Array.from(document.querySelectorAll('[data-stid="lodging-card-responsive"] > a'))
                .map((name)=>name.href)
            }
           // console.log(hotelNames.NameOfTheHotels.length)
           // console.log(urls.UrlsOfTheHotels.length)
            const list = [];
            for(j=0; j<hotelNames.NameOfTheHotels.length; j++) {
                console.log("Debug Hurrrah");
                list.push({
                    "hotelName": hotelNames.NameOfTheHotels[j],
                    "hotelUrl": urls.UrlsOfTheHotels[j]
                });
            }
     return list;     
    });
        
    exportResults(hotels)
    //console.log(hotels)



    await browser.close();

})();
const exportResults = (parsedResults) => {
    fs.writeFile(outputFile, JSON.stringify(parsedResults , null, 3), (err) => {
      if (err) {
        console.log(err)
      }
      console.log(chalk.yellow.bgBlue(`\n ${chalk.underline.bold(parsedResults.length)} Results exported successfully to ${chalk.underline.bold(outputFile)}\n`))
    })
  }