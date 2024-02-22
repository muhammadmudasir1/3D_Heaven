import puppeteer from "puppeteer";

const OrturScrap = async (url) => {
    const browser = await puppeteer.launch({
        headless: "",
        defaultViewport: false
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url);
    // await page.setOfflineMode(true); // Emulate offline mode

    // let discountedPriceSelector = '.suspend_addtocart .new-price .money, .tt-product-single-info .sale-price .money';
    // let regularPriceSelector = ".tt-product-single-info .old-price"
    await page.evaluate(() => {
        localStorage.setItem('currentCurrency', 'EUR');
      });
    let discountedPriceSelector = '.sale-price .etrans-money';
    let regularPriceSelector = ".old-price .etrans-money"
    let discountedPrice = ""
    let regularPrice = ""

    await page.waitForSelector(discountedPriceSelector);
    discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
    // console.log(discountedPrice)
    // try {
        await page.waitForSelector(regularPriceSelector);
        regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);

    // } catch (error) {
        console.log("Regular Price not Found")

    // }
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
