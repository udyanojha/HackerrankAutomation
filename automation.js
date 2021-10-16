// node automation.js --url=https://www.hackerrank.com --config=config.json
// npm init -y
// npm install minimist 
// npm install puppeteer -g
let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

let userid = configJSO.userid;
let password = configJSO.password;
let moderator = configJSO.moderator;

async function run(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(args.url);
    
    await page.waitForSelector("a[href='https://www.hackerrank.com/access-account/']");
    await page.click("a[href='https://www.hackerrank.com/access-account/']");

    await page.waitForSelector(`a[href="https://www.hackerrank.com/login"]`);
    await page.click(`a[href="https://www.hackerrank.com/login"]`);

    // await page.waitForNavigation({ waitUntil: 'networkidle2' });

    await page.waitForSelector(`input[name="username"]`);
    await page.click(`input[name="username"]`);
    await page.keyboard.type(userid);
    
    await page.waitForSelector(`input[name="password"]`);
    await page.click(`input[name="password"]`);
    await page.keyboard.type(password, {
        delay: 30
    });

    await page.waitForSelector(`button[data-analytics="LoginPassword"]`);
    
    await page.click(`button[data-analytics="LoginPassword"]`);    
    
    await page.waitForSelector(`a[href="/contests"]`)
    await page.click(`a[href="/contests"]`)

    await page.waitForSelector(`a[href="/administration/contests/"]`);
    await page.click(`a[href="/administration/contests/"]`);
    // console.log()
   // let contestLinks = page.evaluate
    // await browser.close();
  }

  run();

