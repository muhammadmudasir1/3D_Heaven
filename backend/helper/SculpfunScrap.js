import puppeteer from "puppeteer";

const SculpfunScrap = async (url) => {
        const browser = await puppeteer.launch({
            // headless: false,
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        await page.setOfflineMode(true); // Emulate offline mode

        let discountedPriceSelector = '.price--medium .price__regular';
        let regularPriceSelector='.price--medium .price__compare';
        let discountedPrice=""
        let regularPrice=""

            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            let unit=discountedPrice[0]

            if (!(unit==="$")){
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
                regularPrice=parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
            }
            else{
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\,/g, '').slice(1))
                regularPrice=parseFloat(regularPrice.trim().replace(/\,/g, '').slice(1))
            }
            regularPrice=regularPrice===discountedPrice?null:regularPrice

        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default SculpfunScrap;
