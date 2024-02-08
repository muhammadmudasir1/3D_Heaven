import puppeteer from "puppeteer";

const EbayScrap = async (url) => {
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: false
        });
        let regularPrice = null;
        const page = await browser.newPage();
        await page.goto(url);

        let discountedPriceSelector = '.x-bin-price__content';
        
        await page.waitForSelector(discountedPriceSelector);
        let discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
        console.log(discountedPrice)
        const unitMatch = discountedPrice.match(/[A-Z]{3}/);
        let unit =unitMatch ? unitMatch[0] : null;
        unit=unit==="EUR"?"€":unit==="US"?"$":unit
        let match = discountedPrice.match(/\d+(,\d+)?/);
        // const matchedPrice=discountedPrice.match(/EUR \d+,\d+/)
        discountedPrice=match[0]
        // discountedPrice=matchedPrice[0]
        if (!(unit==="$")){
            discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','))
            // regularPrice=parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
        }
        else{
            discountedPrice=parseFloat(discountedPrice.trim())
            regularPrice=parseFloat(regularPrice.trim())
        }
    
        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default EbayScrap;
