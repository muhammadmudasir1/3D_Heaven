import puppeteer from "puppeteer";

const EbayScrap = async (url) => {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: false
        });
        let regularPrice = null;
        const page = await browser.newPage();
        await page.goto(url);

        let discountedPriceSelector = '.x-bin-price__content';
        
        await page.waitForSelector(discountedPriceSelector);
        let discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
        const unitMatch = discountedPrice.match(/[A-Z]{3}/);
        let unit =unitMatch ? unitMatch[0] : null;
        unit=unit==="EUR"?"€":unit==="US"?"$":unit
        let match = discountedPrice.match(/\d+(,\d+)?/);
        discountedPrice=match?match[0]:null
        discountedPrice=parseFloat(discountedPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','))
    
        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default EbayScrap;
