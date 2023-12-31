import puppeteer from "puppeteer";

const AnyCubic = async (url) => {
        const browser = await puppeteer.launch({
            // headless: false,
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url);
        
        let discountedPriceSelector = 'span[data-product-price].product__price';
        let regularPriceSelector=' .product__price--compare';
        let discountedPrice=""
        let regularPrice=""

            await page.waitForSelector(discountedPriceSelector);
            discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);
            let unit=discountedPrice[0]

            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);

            if(unit!=="$"){
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
                regularPrice=regularPrice && regularPrice.length>0?parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1)):null
            }
            else{
                discountedPrice=parseFloat(discountedPrice.trim().replace(/\,/g, '').slice(1))
                regularPrice=regularPrice && regularPrice.length>0?parseFloat(regularPrice.replace(/\,/g, '').trim().slice(1)):null

            }


        await browser.close();

        return {
            discountedPrice,
            regularPrice,
            unit
        };

};

export default AnyCubic;
