import puppeteer from "puppeteer";

const TomTopScrap = async (url) => {
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        // await page.setOfflineMode(true); // Emulate offline mode

        let discountedPriceSelector='#detailPrice';
        let regularPriceSelector='#d_origprice';
        let unitSelector=".symbolLab"
        let discountedPrice=""
        let regularPrice=""
        let unit=""

            await page.waitForSelector(discountedPriceSelector);
            await page.waitForSelector(unitSelector);
            unit=await page.$eval(unitSelector,element => element.textContent)
            unit=unit[unit.length-1]
            if(!(unit==="$")){
                await page.reload()
            }

            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            try {
                await page.waitForSelector(regularPriceSelector);
                regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
                
            } catch (error) {
                console.log("Regular Price is not Found")
            }

            discountedPrice=parseFloat(discountedPrice.trim().replace(/\,/g, ''))
            regularPrice=regularPrice ? parseFloat(regularPrice.trim().match(/\d+\.\d+/g)[0]):null

            
            regularPrice=regularPrice===discountedPrice?null:regularPrice

        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default TomTopScrap;
