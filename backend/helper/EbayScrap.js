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
        let regularPriceSelector = '.x-bin-price__content .ux-textspans--STRIKETHROUGH';
        
        await page.waitForSelector(discountedPriceSelector);
        let discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
        try {
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            let regularPriceMatch = regularPrice.match(/\d+(,\d+)?/);
            regularPrice=regularPriceMatch[0]
            
        } catch (error) {
            console.log(error)
        }
        const unitMatch = discountedPrice.match(/[A-Z]{3}/);
        let unit =unitMatch ? unitMatch[0] : null;
        unit=unit==="EUR"?"€":unit==="US"?"$":unit
        let match = discountedPrice.match(/\d+(,\d+)?/);
        discountedPrice=match[0]
        if (!(unit==="$")){
            discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','))
            console.log(regularPrice)
            regularPrice=regularPrice ? parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',')):null
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
