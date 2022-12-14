// working code Export and populates array of hotel names and urls and store them in a Json File

const puppeteer = require("puppeteer");
const fs = require("fs");
const chalk = require("chalk");
const outputFile = "./swatHotelsDetails.json";
const hotelsDetailsFile = [];

//reading data from the json file

(async function main() {
  let content = fs.readFileSync("swat.json", "utf-8");
  const data = JSON.parse(content);

  // function to collect URL of each element in a data and then internally calls the getHotelDetail Function for gathering Details

  for (url of data) {
    const data = await HotelsDetails(url.hotelUrl);
    console.log(data);
    hotelsDetailsFile.push({
      Hotel: data,
    });
  }
  exportResults(hotelsDetailsFile);
  //console.log(hotelsDetailsFile);
  console.log("debugger end point");
})();

async function HotelsDetails(URL) {
  const url = URL;
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();

  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);

  await page.goto(url);

  await new Promise((r) => setTimeout(r, 2000));

  await page.screenshot({ path: "example.png" });

  // evaluate the page and grab the details....
  const hotelDetails = await page.evaluate(async () => {

    await new Promise((r) => setTimeout(r, 2000));

    document.querySelector("[href='#Overview']").click();

    const hotelName = Array.from(
      document.querySelectorAll('[data-stid="content-hotel-title"] > h1')
    ).map((name) => name.textContent);

    const property_Highlights1 = Array.from(
      document.querySelectorAll(
        '[data-stid="hotel-amenities-list"] > div > ul > div > li'
      )
    ).map((name) => name.textContent);

    const property_Highlights2 = Array.from(
      document.querySelectorAll(".uitk-spacing-margin-block-two li")
    ).map((name) => name.textContent);

    document.querySelector("[href='#Offers']").click();
    await new Promise((r) => setTimeout(r, 2000));

    const aa = document.querySelector('[data-stid="section-room-list"]');
    const Rooms = Array.from(
      aa.querySelectorAll(
        ".uitk-layout-grid-item div.uitk-layout-flex-item > div.uitk-spacing-padding-blockstart-three , .uitk-layout-grid-item div.uitk-layout-flex-item > div > div div[data-stid='price-summary']"
      )
    ).map((name) => name.textContent);

    document.querySelector("[href='#Location']").click();
    await new Promise((r) => setTimeout(r, 2000));

    const about_this_area = Array.from(
      document.querySelectorAll(".uitk-layout-columns-minwidth-seventy_two li")
    ).map((name) => name.textContent);

    const about_this_property = Array.from(
      document.querySelectorAll("[data-stid='content-item'] > div")
    ).map((name) => name.textContent);

    document.querySelector("[href='#Amenities']").click();
    await new Promise((r) => setTimeout(r, 2000));

    const at_a_glance = Array.from(
      document.querySelectorAll(
        "div#Amenities div.uitk-card-content-section div.uitk-layout-columns > div.uitk-spacing-margin-blockend-four"
      )
    ).map((name) => name.textContent);

    document.querySelector("[href='#Policies']").click();
    await new Promise((r) => setTimeout(r, 2000));

    const fees_policies = Array.from(
      document.querySelectorAll(
        "div#Policies [data-stid='content-item'] > div > div p"
      )
    ).map((name) => name.textContent);

    const also_known_as_for = Array.from(
      document.querySelectorAll(
        "div#Policies [data-stid='content-item'] > div > div > div > div.uitk-layout-flex-item"
      )
    ).map((name) => name.textContent);

    const list = [];
    list.push({
      hotelName: hotelName,
      Property_Highlights1: property_Highlights1,
      Property_Highlights2: property_Highlights2,
      Rooms_Types: Rooms,
      About_This_Area: about_this_area,
      About_This_Property: about_this_property,
      At_a_Glance: at_a_glance,
      Fees_And_Policies: fees_policies,
      Also_Known_as_For: also_known_as_for,
    });

    return list;
  });

  //exportResults(hotelsDetailsFile);
  //console.log(hotelDetails);

  await browser.close();
  return hotelDetails;
}

const exportResults = (parsedResults) => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 3), (err) => {
    if (err) {
      console.log(err);
    }
    console.log(
      chalk.yellow.bgBlue(
        `\n ${chalk.underline.bold(
          parsedResults.length
        )} Results exported successfully to ${chalk.underline.bold(
          outputFile
        )}\n`
      )
    );
  });
};
