import puppeteer from "puppeteer";

const ElegoScrap = async (url) => {
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        await page.setOfflineMode(true); // Emulate offline mode

        
        let discountedPriceSelector = '.gf_product-prices > .gf_product-price';
        let regularPriceSelector='.gf_product-prices > .gf_product-compare-price';
        let discountedPrice=""
        let regularPrice=""

        try {
            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            
        } catch (error) {
            discountedPriceSelector=".product-price-container .discounted"
            regularPriceSelector=".product-price-container  .amount"
            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
        }

            let unit=discountedPrice[0]

            if (!(unit==="$")){
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
                regularPrice=parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
            }
            else{
                discountedPrice=parseFloat(discountedPrice.trim().slice(1))
                regularPrice=parseFloat(regularPrice.trim().slice(1))
            }

        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default ElegoScrap;
