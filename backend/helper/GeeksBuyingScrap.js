import puppeteer from "puppeteer";

const GeeksBuyingScrap=async (url)=>{
    const browser=await puppeteer.launch({
        headless: "new",
        defaultViewport:false
    });
    const page=await browser.newPage();
    await page.goto(url)
    await page.waitForSelector('#saleprice')
    await page.waitForSelector('#regprice')
    await page.waitForSelector('#currencyF')
    let discountedPrice = await page.$eval('#saleprice', element => element.textContent);
    let regularPrice = await page.$eval('#regprice', element => element.textContent);
    let unit = await page.$eval('#currencyF', element => element.textContent);
    discountedPrice=parseFloat(discountedPrice.replace(/[^0-9.]/g, ''))
    regularPrice=parseFloat(regularPrice.replace(/[^0-9.]/g, ''))
    
    await browser.close()
    return {
        discountedPrice,
        regularPrice,
        unit
    }
}
export default GeeksBuyingScrap