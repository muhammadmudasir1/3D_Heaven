import puppeteer from "puppeteer";

const CrealityScrap = async (url) => {
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        
        let discountedPriceSelector = '.current-price';
        let regularPriceSelector=' .product-info__header_compare-at-price';
        let discountedPrice=""
        let regularPrice=""

            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            let unit=discountedPrice[0]
            discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))

            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            regularPrice=parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))

            regularPrice=regularPrice===discountedPrice?null:regularPrice


        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default CrealityScrap;
