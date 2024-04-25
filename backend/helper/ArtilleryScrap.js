import puppeteer from "puppeteer";

const ArtilleryScrap = async (url) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url,{ timeout: 60000 });

    let discountedPriceSelector = 'product-variant-listener dd';
    // let discountedPriceSelector = '#b-price .#price-item .@regular .#price-value ';
    let regularPriceSelector = 'product-variant-listener dd';
    let discountedPrice=""
    let regularPrice=""

    try {
        await page.waitForSelector(discountedPriceSelector);
        // const element = await page.$x("//*[contains(concat(' ',normalize-space(@class),' '),' @regular ')]");
        // console.log(element)
        discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
        await page.waitForSelector(regularPriceSelector);
        regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
        
    } catch (error) {
        // console.log(discountedPrice)
        console.log("regular price is not found")
        // await page.waitForSelector(regularPriceSelector);
        // discountedPrice = await page.$eval(regularPriceSelector, element => element.textContent);
    }
    await browser.close();

    return {
        discountedPrice,
        regularPrice,
        // unit
    };

};

export default ArtilleryScrap;
