// import puppeteer from "puppeteer";

// const ScrapBambulab=async(url)=>{
//     const prices=[]

//     const browser=await puppeteer.launch({
//         headless:false,
//         defaultViewport:false,
//         timeout: 60000,
//     });
//     const page=await browser.newPage();
//     await page.goto(url)
//     await page.waitForSelector('div.ProductMeta__PriceList.Heading');

//     console.log("selector is finded")
//     const priceParent = await page.$('div.ProductMeta__PriceList.Heading');

//     if(priceParent){
//         const childerns=await priceParent.$$('*')
//         for (const childElement of childerns) {
//             const childTextContent = await page.evaluate(el => el.textContent, childElement);
//             prices.push(childTextContent)

//     }}
//     await browser.close()
//     let [discountedPrice,regularPrice]=prices
//     let unit=discountedPrice[0]
//     // const result={
//     //     prices:[]
//     // }
//     // if(prices.length>0){
//     //     const unit = (prices[0].match(/[A-Z]{3}/))[0];
//     //     result['unit']=unit
//     //     result.unit=result.unit==="USD"&&"$"
        
//     //     prices.forEach((ele,index)=>{
//     //         const price=parseFloat(ele.replace(/[^0-9.]/g, ''))
//     //         result.prices.push(price)
//     //     })
//     // }
//     // let [discountedPrice,regularPrice]=result.prices
//     // console.log(discountedPrice)
//     if (!(unit==="$")){
//         discountedPrice=parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
//         // regularPrice=parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1))
//     }
//     else{
//         discountedPrice=parseFloat(discountedPrice.trim().slice(1))
//         // regularPrice=parseFloat(regularPrice.trim().slice(1))
//     }


//     regularPrice=regularPrice?regularPrice:null

//     return {
//         discountedPrice,
//         regularPrice,
//         "unit":unit
//     }
// }

// export default ScrapBambulab
import puppeteer from "puppeteer";

const ScrapBambulab = async (url) => {
    const prices = [];

    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: false,
        timeout: 60000,
    });

    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });
        
        await page.waitForFunction(() => document.querySelector('div.ProductMeta__PriceList.Heading') !== null, { timeout: 60000 });

        const priceParent = await page.$('div.ProductMeta__PriceList.Heading');

        if (priceParent) {
            const children = await priceParent.$$('*');

            for (const childElement of children) {
                const childTextContent = await page.evaluate(el => el.textContent, childElement);
                prices.push(childTextContent);
            }
        }
    } catch (error) {
        console.error('Error during navigation:', error);
    } finally {
        await browser.close();
    }

    let [discountedPrice, regularPrice] = prices;
    let unit = discountedPrice[0];

    if (!(unit === "$")) {
        discountedPrice = parseFloat(discountedPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1));
    } else {
        // console.log(discountedPrice)
        discountedPrice = parseFloat(discountedPrice.replace(/[^0-9.]/g, ''));
    }

    regularPrice = regularPrice ? parseFloat(regularPrice.trim()) : null;

    return {
        discountedPrice,
        regularPrice,
        "unit": unit
    };
};

export default ScrapBambulab;
