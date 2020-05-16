let extractors = [
  {
    "id": 1,
    "title": "mygov.com",
    "url": "https://www.mygov.in/covid-19",
    runScript:
      "let element = document.querySelector('div.title_wrapper > h1');let title = element.innerText; return {title}",
    runInputsData: [

    ]
  },
  {
    "id": 2,
    "title": "amazon.com",
    "url": "https://www.amazon.com/find-your-store/b/?node=17608448011",
    runScript:
      "let element = document.querySelector('div.title_wrapper > h1');let title = element.innerText; return {title}",
    runInputsData: [

    ]
  },
  {
    id: 3,
    title: "imdb.com",
    url: "https://www.imdb.com/title/tt0068646/",
    runScript:
      "let element = document.querySelector('div.title_wrapper > h1');let title = element.innerText; return {title}",
    runInputsData: [

    ]
  }
]

module.exports = extractors;