import puppeteer from "puppeteer";
import ScrapBambulab from "./ScrapBambulab.js";
import GeeksBuyingScrap from "./GeeksBuyingScrap.js";
import AmazonScrap from "./AmazonScrap.js";
import EbayScrap from "./EbayScrap.js";
import jakeScrap from "./JakeScrap.js";
import AnyCubic from "./AnyCubic.js";
import ArtilleryScrap from "./ArtilleryScrap.js";
import CrealityScrap from "./CrealityScrap.js";
import ElegoScrap from "./ElegoScrap.js";
import RevopointScrap from "./RevopointScrap.js";
import SculpfunScrap from "./SculpfunScrap.js";
import TwoTreesScrap from "./TwoTreesScrap.js";
import QidiTech from "./QidiTechScrap.js";
import TomTopScrap from "./TomTopScrap.js";
import OrturScrap from "./OrturScrap.js";

const sideScrapwithelegoo =async ()=>{
    const browser=await puppeteer.launch({
        headless:true,
        defaultViewport:false
    });
    const page=await browser.newPage();
    await page.goto("https://eu.elegoo.com/products/neptune-4-max-fdm-3d-printer")
    await page.waitForSelector('.gf_product-price')
    let dynamicContent = await page.$eval('.gf_product-price', element => element.textContent);
    dynamicContent=dynamicContent.replace(/[^0-9.]/g, '')
    


    console.log('Dynamic Content:',  parseFloat(dynamicContent));
    await browser.close()

}
const sideScrapwithRevopoint =async ()=>{
    const browser=await puppeteer.launch({
        headless:true,
        defaultViewport:false
    });
    const page=await browser.newPage();
    await page.goto("https://global.revopoint3d.com/products/standalone-3d-scanner-miraco")
    await page.waitForSelector('.product-info__price > .rating-with-text > .price-list > .text-lg > .money')
    let dynamicContent = await page.$eval('.product-info__price > .rating-with-text > .price-list > .text-lg > .money', element => element.textContent);
    let match = dynamicContent.match(/\d+(,\d+)?/);
    dynamicContent=match?match[0]:null

    console.log('Dynamic Content:',  dynamicContent);
    await browser.close()

}




// const result=await GeeksBuyingScrap("https://www.geekbuying.com/go/8DXCdjiY#")
// const result=await AmazonScrap('https://www.amazon.de/Revopoint-3D-Scanner-Engineering-modifizierte-Standardausf%C3%BChrung/dp/B0BVZJFH27?ref_=ast_sto_dp&th=1#')
// const result=await EbayScrap("https://ebay.us/pXpFi5#")
// const result=await jakeScrap("https://tidd.ly/3Rf6FpN#")
// const result=await AnyCubic("https://de.anycubic.com/collections/3d-drucker/products/kobra-2-max#")
// const result= await ArtilleryScrap("https://www.artillery3d.com/collections/3d-printers/products/artillery-sidewinder-x3-plus#")
// const result=await ScrapBambulab('https://shareasale.com/r.cfm?b=2420414&u=3493388&m=138211&urllink=&afftrack=#')
// const result=await CrealityScrap("https://tidd.ly/41dbDYP#")
// const result=await ElegoScrap("https://shareasale.com/r.cfm?b=2351046&u=3493388&m=104244&urllink=&afftrack=#")
// const result=await RevopointScrap("http://shrsl.com/4c571#")
// const result=await SculpfunScrap("http://shrsl.com/4c5ax#")
// const result=await TwoTreesScrap("https://shareasale.com/r.cfm?b=2400710&u=3493388&m=128497&urllink=&afftrack=#")
// const result=await QidiTech("https://shareasale.com/r.cfm?b=2395087&u=3493388&m=130069&urllink=&afftrack=#")
// const result=await TomTopScrap("https://www.tomtop.com/p-rtoqd-xmax3-eu.html?aid=3dheaven&cr=#")
const result=await OrturScrap("https://ortur.net/de-eu/products/ortur-laser-master-3-engraver-cutter-machine?ref=rRyC2ONQGFuvQ-&variant=44969743286505#")

console.log(result)