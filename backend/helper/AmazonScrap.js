import puppeteer from "puppeteer";

const AmazonScrap = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false
        });
        const cookies = [
            {
              name: 'x-amz-captcha-2',
              value: 'ein+OWV6fAh8Nj9ob3KQJw==',
              url:"https://www.amazon.de"
            },
            {
              name: 'x-amz-captcha-1',
              value: '1707681299743344',
              url:"https://www.amazon.de"
            },
            {
              name: 'ubid-acbde',
              value: '260-3435382-6113253',
              url:"https://www.amazon.de"
            },
            {
              name: 'session-token',
              value: 'uj3VsV5xmdbVC+NSCmfy8m1/tOL8J1bRBmlFvAxH9NffLecJY0YMBzdSKqd3S0NBoXrQ12PyfyKPhVgu/cm2Xdwu+f5iHXYv1ZsxkYbLTl2T2VmQG/vfLE1rqzNknuMFHZP9tF3yRlf5h5r+FBS3ZE5XrxxxUfvuvpj6erhmQtYvgimVa8VnnSVHJ17wrlmsmtF6tCFYtGK4g/1BCvwlFjpJFuX+FZGyc+FK6pSliZboJESsxD3d43QcGhuPzWdCFbGJl/jPs2SwsFhQBVgJ9GxnxEDt4MK8I3cUpOyztVVQm7Cp/oY70FCPQeHXRH5pk7n/P1qsY7T2bs604sF+HV2SU4W6UuCa',
              url:"https://www.amazon.de"
            },
            {
              name: 'session-id-time',
              value: '2082787201l',
              url:"https://www.amazon.de"
            },
            {
              name: 'session-id',
              value: 'session-id',
              url:"https://www.amazon.de"
            },
            {
              name: 'lc-acbde',
              value: 'de_DE',
              url:"https://www.amazon.de"
            },
            {
              name: 'i18n-prefs',
              value: 'EUR',
              url:"https://www.amazon.de"
            },
            {
              name: 'csm-sid',
              value: '751-8058369-9925421',
              url:"https://www.amazon.de"
            },
            {
              name: 'csm-hit',
              value: 'tb:917MNG4A52H12C7SM0VF+s-917MNG4A52H12C7SM0VF|1707674115076&t:1707674115076&adb:adblk_no',
              url:"https://www.amazon.de"
            }
          ];

        let regularPrice = null;
        const page = await browser.newPage();
        page.setCookie(...cookies)
        await page.goto(url, { timeout: 60000 });

        // Add a delay to mimic human-like behavior
        await page.waitForTimeout(3000);

        // Emulate a different user agent
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36");

        let discountedPriceSelector = '.apexPriceToPay > .a-offscreen';
        let regularPriceSelector = '.a-price.a-text-price.a-size-base > .a-offscreen';
        
        if (!(await page.$(discountedPriceSelector))) {
            discountedPriceSelector = '.priceToPay > .a-offscreen';
            regularPriceSelector = '.a-price.a-text-price.a-size-base > .a-offscreen';
        }

        await page.waitForSelector(discountedPriceSelector, { timeout: 60000 });
        let discountedPrice = await page.$eval(discountedPriceSelector, element => element.textContent);

        try {
            await page.waitForSelector(regularPriceSelector);
            regularPrice = await page.$eval(regularPriceSelector, element => element.textContent);
            regularPrice = parseFloat(regularPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ','));

        } catch (error) {
            console.log("Cannot find regular price");
        }

        let unit = discountedPrice[discountedPrice.length - 1];
        discountedPrice = discountedPrice.replace(/\./g, '').replace(/,/g, '.').replace(/\|/g, ',');
        discountedPrice = parseFloat(discountedPrice.slice(0, discountedPrice.length - 1));

        await browser.close();
        console.log({
            discountedPrice,
            regularPrice,
            unit
        })
        return {
            discountedPrice,
            regularPrice,
            unit
        };

    } catch (error) {
        console.log(error)
        console.log("Can not find price");
        return;
    }
};

export default AmazonScrap;
