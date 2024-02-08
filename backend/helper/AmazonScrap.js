import puppeteer from "puppeteer";

const AmazonScrap = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false
        });
        let regularPrice = null;
        const page = await browser.newPage();
        await page.goto(url, { timeout: 60000 });

        // Add a delay to mimic human-like behavior
        await page.waitForTimeout(3000);

        // Emulate a different user agent
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");

        let discountedPriceSelector = '.apexPriceToPay > .a-offscreen';
        let regularPriceSelector = '.a-price.a-text-price.a-size-base > .a-offscreen';
        
        if (!(await page.$(discountedPriceSelector))) {
            discountedPriceSelector = '.priceToPay > .a-offscreen';
            regularPriceSelector = '.a-price.a-text-price.a-size-base > .a-offscreen';
        }

        await page.waitForSelector(discountedPriceSelector, { timeout: 60000 });
        let discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);

        try {
            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            regularPrice = parseFloat(regularPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','));

        } catch (error) {
            console.log("Cannot find regular price");
        }

        let unit = discountedPrice[discountedPrice.length - 1];
        discountedPrice = discountedPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',');
        discountedPrice = parseFloat(discountedPrice.slice(0, discountedPrice.length - 1));

        await browser.close();
        console.log({
            discountedPrice,
            regularPrice,
            unit
        })
        return {
            discountedPrice,
            regularPrice,
            unit
        };

    } catch (error) {
        console.log(error)
        console.log("Can not find price");
        return;
    }
};

export default AmazonScrap;
