const express = require('express'); //returns a function
var cors = require('cors')
const app = express();
var http = require('http');
const puppeteer = require('puppeteer');

app.use(cors());

app.get("", (req, res, next) => {
  res.send("<h1>home page</h1>");
});

app.get("/api", (req, res, next) => {
  console.log("inside node api",res);
  var data;
  async function run () {
    let url = 'https://www.imdb.com/title/tt0068646/';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    data = await page.evaluate(() => {
      let title = document.querySelector('div.title_wrapper > h1').innerText;
      return {title};
    })
    console.log('data',data);
    await browser.close();
    res.send({
      data: [data]
    });
  }
  run();
  //script code hardcoded
  
});

app.listen(3000, () => {
  console.log("server is listing on port 3000");
})
