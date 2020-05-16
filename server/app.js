var extractor = require('./db');

const express = require('express'); //returns a function
var cors = require('cors')
const app = express();
var http = require('http');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("", (req, res, next) => {
  res.send("<h1>home page</h1>");
});

//get list of extractot
app.get("/api/list", (req, res, next) => {
  res.status(200).send({
    data: extractor,
    success: 'true',
    message: 'Fetched Extractor successfully',
  });
});

//get unique extractor
app.get("/api/:id", (req, res, next) => {
  console.log("inside get unique extractor api", req);
  const id = parseInt(req.params.id);
  var data;

  extractor.map((value, index, arr) => {

    async function run(url) {
      let result = []
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      if (url == "https://www.mygov.in/covid-19") {

        await page.waitFor('div.views-row');

        result = await page.$$eval('div.views-row', rows => {
          return rows.map(row => {
            const properties = {};
            const stateName = row.querySelector('span.st_name');
            const stateCount = row.querySelector('span.st_number');
            properties.state_name = stateName.innerText;
            properties.state_count = stateCount.innerText;
            return properties;
          })
        })

      } else if (url == "https://www.imdb.com/title/tt0068646/") {
        data = await page.evaluate(() => {
          let title = document.querySelector('div.title_wrapper > h1').innerText;
          return {title};
        })
      }
      await browser.close();
      console.log('data', result);
      return result;
    }

    if (value.id === id) {
      run(value.url).then((result) => {
        res.send({
          success: 'true',
          message: 'Extractor-' + id + ' fetched ' + 'successfully',
          data: [result]
        })
      }).catch(() => {
        res.send({
          success: 'fail',
          message: 'Extractor-' + id + ' fetched ' + 'failed',
          data: []
        })
      });

    }
  })
  //script code hardcoded
});

//create new extractor
app.post("/api/add", (req, res) => {
  console.log("req.body", req.body)
  if (!req.body.url) {
    return res.status(400).send({
      success: 'false',
      message: 'url is required'
    });
  } else if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    })

  }
  const ext = {
    id: extractor.length + 1,
    title: req.body.title,
    url: req.body.url
  }
  extractor.push(ext);
  console.log("Ext", extractor);
  res.status(200).send({
    success: 'true',
    message: 'Extractor added successfully',
    ext
  })
})

app.get("/runextractor", async (req, res, next) => {
  try {
    console.log("inside node api");

    const url = req.query.url;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let data = await page.evaluate((runscript) => {
      return new Function(runscript)();
    },req.query.runscript);

    console.log("data", data);
    await browser.close();
    res.send([data]);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("server is listing on port 3000");
})
