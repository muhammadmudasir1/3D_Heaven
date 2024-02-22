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
        regularPrice = regularPrice? parseFloat(regularPrice.trim().replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',').slice(1)):null;
    } else {
        discountedPrice = parseFloat(discountedPrice.replace(/[^0-9.]/g, ''));
    }
    return {
        discountedPrice,
        regularPrice,
        "unit": unit
    };
};

export default ScrapBambulab;
