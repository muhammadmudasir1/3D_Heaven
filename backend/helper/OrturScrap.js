import puppeteer from "puppeteer";

const OrturScrap = async (url) => {
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: false
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { timeout: 60000 });
    await page.evaluate(() => {
        localStorage.setItem('currentCurrency', 'EUR');
      });
    let discountedPriceSelector = '.product-info__price .text-on-sale .money';
    let regularPriceSelector = ".product-info__price .line-through .money"
    let discountedPrice = ""
    let regularPrice = ""
    await page.waitForSelector(discountedPriceSelector);
    // console.log(6)
    discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
    try {
        await page.waitForSelector(regularPriceSelector);
        regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);

    } catch (error) {
        console.log("Regular Price not Found")
    }
    let unit = discountedPrice[0]
    discountedPrice = parseFloat(discountedPrice.trim().replace(/\,/g, '').slice(1))
    regularPrice = parseFloat(regularPrice.trim().replace(/\,/g, '').slice(1))
    regularPrice = regularPrice === discountedPrice ? null : regularPrice

    await browser.close();

    return {
        discountedPrice,
        regularPrice,
        unit
    };

};

export default OrturScrap;
