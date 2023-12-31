import puppeteer from "puppeteer";

const ArtilleryScrap = async (url) => {
        const browser = await puppeteer.launch({
            // headless: false,
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        
        let discountedPriceSelector = 'gp-product-price';

            await page.waitForSelector(discountedPriceSelector);
            const Prices = await page.$$eval(discountedPriceSelector, elements => {
                return elements.map(element => element.textContent.trim());
            })
            let [discountedPrice,regularPrice]=Prices
            let unit=discountedPrice[0]
            discountedPrice=parseFloat(discountedPrice.slice(1))
            regularPrice=parseFloat(regularPrice.slice(1))

        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default ArtilleryScrap;
