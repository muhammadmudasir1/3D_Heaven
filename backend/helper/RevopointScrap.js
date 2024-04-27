import puppeteer from "puppeteer";
import * as cheerio from 'cheerio'
const RevopointScrap = async (url) => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: false
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url);
    await page.goto(url);
    await page.setOfflineMode(true);


    let discountedPriceSelector = '.price-list--lg .money';
    let regularPriceSelector = '.sr-only .price-list ';
    let discountedPrice = ""
    let regularPrice = null

    await page.waitForSelector(discountedPriceSelector, { timeout: 60000 });
    discountedPrice = await page.$eval(discountedPriceSelector, element => element.innerHTML);
    const $ = cheerio.load(discountedPrice)
    let moneyTerm = $('span.sr-only')[0]['next'].data;
    discountedPrice = moneyTerm

    let unit = discountedPrice[0]

    if (!(unit === "$")) {
        discountedPrice = parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
    }
    else {
        discountedPrice = parseFloat(discountedPrice.trim().replace(/\,/g, '').slice(1))
    }

    // await browser.close();

    return {
        discountedPrice,
        regularPrice,
        unit
    };

};

export default RevopointScrap;
