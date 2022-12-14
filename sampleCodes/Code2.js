// working code This code populates the Names of the hotel and urls in the same array working code

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);


    const url= 'https://www.hotels.com/Hotel-Search?adults=2&d1=2022-12-20&d2=2022-12-21&destination=Swat%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan&endDate=2022-12-21&latLong=35.232475%2C72.511635&locale=en_IE&pos=HCOM_EMEA&regionId=553248635975094920&selected=&semdtl=&siteid=300000025&sort=RECOMMENDED&startDate=2022-12-20'
    await page.goto(url);

    await new Promise(r => setTimeout(r, 2000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 2000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 2000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 2000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 2000))
    await page.click("[data-stid='show-more-results']")
    await new Promise(r => setTimeout(r, 2000))

    await page.screenshot({path: 'example.png'});

//*********************************************************************** */

    //grab the name of the title hotel
    const titles = await page.evaluate(() => {
        const hotelNames = Array.from(document.querySelectorAll('.uitk-spacing-margin-blockstart-three  div > div > h2'))
            .map((name)=> name.textContent);
          const URL =  Array.from(document.querySelectorAll('.uitk-spacing-margin-blockstart-three > div > a'))
            .map((name)=>name.href);
            return [hotelNames,URL];
         
             
        });
    // let hotelsTitle = [];
    // console.log(titles.length);
    // console.dir(titles, {'maxArrayLength': null});
    console.log(titles)
    // for(let count = 0;count < titles.length; count++){
    //     //console.log(count , titles[count]);
    //     hotelsTitle.push({
    //          No : count , Title : titles[count]
    //     });
    // }
    // // console.log(hotelsTitle);
    // console.dir(hotelsTitle, {'maxArrayLength': null});










//*********************************************************************** */

    // // grab the url of the hotel
    // const urls = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('.uitk-spacing-margin-blockstart-three div > a'))
    //         .map((name)=>name.getAttribute('href')));
    // let HotelsUrl = []
    // console.log(urls.length);
    // //console.log(urls);
    // for(let count = 2;count < urls.length; count++){
    //     //console.log(count , urls[count]);
    //     HotelsUrl.push({
    //         No : count , Url : urls[count]
    //     });    
    // }
    // //console.log(HotelsUrl);
    // console.dir(HotelsUrl, {'maxArrayLength': null});


//*********************************************************************** */

//     //grab the location of the hotel
//     const location = await page.evaluate(() => 
//         Array.from(document.querySelectorAll('.uitk-spacing-margin-blockstart-three div > .truncate-lines-2'))
//             .map((name)=>name.textContent));
//        let HotelsLocation = [] 
//     console.log(location.length);
//    // console.log(location);
//    for(let count = 0;count < location.length; count++){
//     //console.log(count , location[count]);
//     HotelsLocation.push({
//         No : count , Location : location[count]
//     });
//     }
//     //console.log(HotelsLocation);
//     console.dir(HotelsLocation, {'maxArrayLength': null});



//*********************************************************************** */

    // //grab the images of the hotel
    // const images = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('.uitk-spacing-margin-blockstart-three div > figure>  .uitk-image-placeholder > img'))
    //         .map((name)=>name.getAttribute('src')));
        
    // console.log(images.length);
    // //console.log(images);
    // for(let count = 0;count < images.length; count++){
    //     console.log(count , images[count]);
    //     }


//*********************************************************************** */

// //grab the Price of the Room
// const Price = await page.evaluate(() => 
// Array.from(document.querySelectorAll('.uitk-spacing-margin-blockstart-three div div >  .uitk-layout-flex > [data-test-id="price-summary-message-line"] > div > span '))
//     .map((name)=>name.textContent));
// let priceTag = []
// console.log(Price.length);
// //console.log(Price);
// for(let count = 0;count < Price.length; count++){
// //console.log(count , Price[count]);
//     priceTag.push({
//         No : count , price : Price[count]
//     });
// }
// console.log(priceTag);


//******************************************************************** */


    await browser.close();

})();