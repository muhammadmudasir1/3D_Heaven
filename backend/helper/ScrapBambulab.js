import puppeteer from "puppeteer";

const ScrapBambulab=async(url)=>{
    const prices=[]

    const browser=await puppeteer.launch({
        headless:true,
        defaultViewport:false
    });
    const page=await browser.newPage();
    await page.goto(url)
    await page.waitForSelector('div > .ProductMeta__Price')
    const priceParent = await page.$('div.ProductMeta__PriceList.Heading');

    if(priceParent){
        const childerns=await priceParent.$$('*')
        for (const childElement of childerns) {
            const childTextContent = await page.evaluate(el => el.textContent, childElement);
            prices.push(childTextContent)

    }}
    await browser.close()
    const result={
        prices:[]
    }
    if(prices.length>0){
        const unit = (prices[0].match(/[A-Z]{3}/))[0];
        result['unit']=unit
        result.unit=result.unit==="USD"&&"$"

        prices.forEach((ele,index)=>{
            const price=parseFloat(ele.replace(/[^0-9.]/g, ''))
            result.prices.push(price)
        })
    }
    let [discountedPrice,regularPrice]=result.prices
    regularPrice=regularPrice?regularPrice:null

    return {
        discountedPrice,
        regularPrice,
        "unit":result.unit
    }
}

export default ScrapBambulab