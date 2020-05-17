//import extractor from './db'
const express = require('express'); //returns a function
var cors = require('cors')
const app = express();
var http = require('http');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyD80BxCIt79TN2n8XU9u9oe7QhzHIUrqN0",
  authDomain: "web-scrapper-dff3f.firebaseapp.com",
  databaseURL: "https://web-scrapper-dff3f.firebaseio.com",
  projectId: "web-scrapper-dff3f",
  storageBucket: "web-scrapper-dff3f.appspot.com",
  messagingSenderId: "10008667671"
};
firebase.initializeApp(config);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("", (req, res, next) => {
  res.send("<h1>home page</h1>");
  firebase.database().ref('/extractors').set([
    {
      "id": 0,
      "title": "mygov.com",
      "url": "https://www.mygov.in/covid-19"
    },
    {
      "id": 1,
      "title": "imdb.com",
      "url": "https://www.imdb.com/title/tt0068646/"
    }
  ]);
});

//get list of extractot
app.get("/api/list", (req, res, next) => {
  var extractorReference = firebase.database().ref("/extractors/");
  extractorReference.on("value",
    function (snapshot) {
      console.log(snapshot.val());
      res.json({
        data: snapshot.val(),
        success: 'true',
        message: 'Fetched Extractor successfully',
      });
      extractorReference.off("value");
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    });
});

//get unique extractor
app.get("/api/:id", (req, res, next) => {
  console.log("inside get unique extractor api", req);
  const id = parseInt(req.params.id);
  var data, extractor = {}, error;
  //get data from firebase
  var extractorReference = firebase.database().ref("/extractors/" + id);
  extractorReference.on("value",
    function (snapshot) {
      console.log("snap val", snapshot.val());
      extractor = snapshot.val();
      console.log("Extractor : ", extractor)
      //visit the url and process the page
      async function run(url) {
        let result = []
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        console.log("Inside run ");
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
            return { title };
          })
        }
        await browser.close();
        console.log('data', result);
        return result;
      }
      run(extractor.url).then((result) => {
        res.send({
          success: 'true',
          message: 'Extractor-' + id + ' fetched ' + 'successfully',
          data: [result]
        })
      }).catch((error) => {
        res.send({
          success: 'fail',
          message: 'Extractor-' + id + ' fetched ' + 'failed',
          data: error
        })
      });
      extractorReference.off("value");
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send({
        success: 'fail',
        message: 'Extractor-' + id + ' fetched ' + 'failed: ' + errorObject.code,
      })
    });
})

//create new extractor
app.put("/api/add", (req, res) => {
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
  } else if (!req.body.id) {
    return res.status(400).send({
      success: 'false',
      message: 'id is required'
    })
  }
  const ext = {
    id: req.body.id,
    title: req.body.title,
    url: req.body.url
  }
  var extractorReference = firebase.database().ref('/extractors/' + req.body.id);
  extractorReference.set(ext,
    function (error) {
      if (error) {
        res.status(200).send({
          success: 'false',
          message: error,
          ext
        })
      }
      else {
        res.status(200).send({
          success: 'true',
          message: 'Extractor added successfully',
          ext
        })
      }
    });
})
//Delete an instance
app.delete('/api/delete/:id', function (req, res) {

  try {
    console.log("inside get unique extractor api", req);
    const id = parseInt(req.params.id);
    const extractor = firebase.database().ref('/extractors/' + id);
    extractor.remove();
    return res.status(200).send({
      success: 'true',
      message: 'Extractor deleted successfully - '+id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: 'false',
      message: 'Extractor deletion failed with error: ' + error,
    });
  }
  console.log("HTTP DELETE Request");
  //todo
});

app.listen(3000, () => {
  console.log("server is listing on port 3000");
})
