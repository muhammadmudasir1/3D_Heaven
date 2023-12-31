import puppeteer from "puppeteer";

const jakeScrap = async (url) => {
        const browser = await puppeteer.launch({
            // headless: false,
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        
        let discountedPriceSelector = ' .p-price__retail';
        let regularPriceSelector=' .p-price__instead';
        let discountedPrice=null
        let regularPrice=null

        if (!(await page.$(discountedPriceSelector))) {
            discountedPriceSelector = '.p-price__reduced';

            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);

            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            regularPrice=parseFloat(regularPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','))
        }
        else{
            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);


        }
        
        let unit=discountedPrice[discountedPrice.length-1]
        discountedPrice=parseFloat(discountedPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','))


    
        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default jakeScrap;
