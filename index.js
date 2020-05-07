const puppeteer = require('puppeteer');

async function getP() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();
  const url = "https://www.bigbasket.com/ps/?q=bread";
  await page.goto(url);
  await page.waitFor('div.items');

  const result = await page.$$eval('div.items', rows =>{
    return rows.map(row =>{
    const properties = {};
    const titleElement = row.querySelector('div.item');
    properties.title = titleElement.innerText;
    return properties;
    })
  })
  console.log(result)
}

getP();