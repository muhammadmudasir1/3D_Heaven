import puppeteer from "puppeteer";

const RevopointScrap = async (url) => {
        const browser = await puppeteer.launch({
            // headless: false,
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        await page.setOfflineMode(true);

        
        let discountedPriceSelector = '.price-list--lg .money';
        let discountedPrice=""
        let regularPrice=null

            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            let unit=discountedPrice[0]

            if (!(unit==="$")){
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
            }
            else{
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\,/g, '').slice(1))
            }

        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default RevopointScrap;
