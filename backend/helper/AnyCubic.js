import puppeteer from "puppeteer";

const AnyCubic = async (url) => {
        const browser = await puppeteer.launch({
            headless: "new",
            defaultViewport: false
        });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url,{timeout:60000});
        
        let discountedPriceSelector = '.product__price-varies';
        let regularPriceSelector=' .product__price--compare';
        let discountedPrice=""
        let regularPrice=""

            await page.waitForSelector(discountedPriceSelector,{ timeout: 50000 });
            const price = await page.$eval(discountedPriceSelector, element => element.textContent);
            console.log(price.split("-"))
            discountedPrice=price.split("-")[0]
            regularPrice=price.split("-").length>1 && price.split("-")[1]
            let unit=discountedPrice[0]
            // await page.waitForSelector(regularPriceSelector,{ timeout: 50000 });
            // regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);

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
