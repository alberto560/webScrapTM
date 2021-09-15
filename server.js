const express = require('express')
const bodyParser = require('body-parser');
const scraper = require('./utils/scraper')
const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }));

//justo
//central en linea
//chedraui
//superama

app.get('/', (req, res) => {
  global.producto = 'salsa de soya';
  const justoProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeJusto()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Justo scrape failed'))
  })

  const centralProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeCentral()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Central scrape failed'))
  })

  const chedrauiProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeChedraui()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Chedraui scrape failed'))
  })

  const superamaProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeSuperama()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Superama scrape failed'))
  })

  Promise.all([justoProducts, centralProducts, chedrauiProducts, superamaProducts])
    .then(data => {
      res.render('index', { data: { articles: data[0], articlesCentral: data[1], articlesChedraui: data[2], articlesSuperama: data[3] } })
    })
    .catch(err => res.status(500).send(err))

})

app.post('/evaluar', (req, res) => {

  global.producto = req.body.search;

  const justoProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeJusto()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Justo scrape failed'))
  })

  const centralProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeCentral()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('CeL scrape failed'))
  })


  const chedrauiProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeChedraui()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Chedraui scrape failed'))
  })

  const superamaProducts = new Promise((resolve, reject) => {
    scraper
      .scrapeSuperama()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Superama scrape failed'))
  })

  Promise.all([justoProducts, centralProducts, chedrauiProducts, superamaProducts])
    .then(data => {
      res.render('index', { data: { articles: data[0], articlesCentral: data[1], articlesChedraui: data[2], articlesSuperama: data[3] } })
    })
    .catch(err => res.status(500).send(err))
})

app.listen(process.env.PORT || 3000)
