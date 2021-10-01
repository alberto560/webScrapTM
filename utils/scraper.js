const puppeteer = require('puppeteer')

const scrapeJusto = async () => {

  const browser = await puppeteer.launch(); //{headless: false}
  const page = await browser.newPage();

  await page.goto('http://justo.mx');
  //await page.screenshot({path: 'justo1.jpg'});

  await page.type('#search', producto);
  //await page.screenshot({path: 'justo2.jpg'});

  await page.click('#search-form button');
  await page.waitForSelector('.styles__StyledCard-justo__sc-1usw4yt-0');
  //await page.screenshot({path: 'justo3.jpg'});

  const enlaces = await page.evaluate(()=>{
    const elements = document.querySelectorAll ('.styles__StyledCard-justo__sc-1usw4yt-0 article a');

    const links = [];
    for(let element of elements){
      links.push(element.href);
    }
    return links;
  });

  //console.log(enlaces.length);
  const productos = [];
  for(let enlace of enlaces){
    await page.goto(enlace);
    await page.waitForSelector('.product__info')

    const producto = await page.evaluate(()=>{
      const tmp = {};
      tmp.tittle = document.querySelector('.product__info div h1').innerText;
      tmp.price = document.querySelector('.product__info div p span span').innerText;
      return tmp;
    });
    productos.push(producto);
  }

  console.log(productos);
  await browser.close();
  return productos;

}

const scrapeCentral = async () => {

  const browser = await puppeteer.launch(); //{headless: false}
  const page = await browser.newPage();

  await page.goto('http://www.centralenlinea.com/');
  //await page.screenshot({path: 'central1.jpg'});

  await page.waitFor(3000);
  await page.click('#checkZipCode div .right a');
  await page.waitFor(1000);
  await page.click('.modal-trigger');
  await page.type('#small-searchterms', producto);
  //await page.screenshot({path: 'central2.jpg'});
  await page.keyboard.press('Enter');
  await page.waitForSelector('.product-grid');
  //await page.screenshot({path: 'central3.jpg'});
  await page.waitFor(2000);
  await page.click('#checkZipCode div .right a');
  await page.waitFor(1000);

  const productos = await page.evaluate(()=>{
    //const elements = document.querySelectorAll('.product-grid div div .product-card div .card-title').innerText;
    const productos = document.querySelectorAll('[data-list=Búsqueda] .card-title-container span');
    const precios = document.querySelectorAll('[data-list=Búsqueda] .product-price');

    const links = [];

    for (var i = 0; i < productos.length; i++) {
      const tmp = {};
      tmp.tittle = productos[i].innerText
      tmp.price = precios[i].innerText

      links.push(tmp);
    }
    return links;
  });

  console.log(productos);

  await browser.close();
  return productos;

}

const scrapeChedraui = async () => {

  const browser = await puppeteer.launch(); //{headless: false}
  const page = await browser.newPage();

  await page.goto('http://www.chedraui.com.mx/');
  //await page.screenshot({path: 'chedraui1.jpg'});

  await page.waitFor(2000);
  await page.click('#linkSearchBox');
  await page.waitFor(2000);
  await page.type('#linkSearchBox', producto);
  //await page.screenshot({path: 'chedraui2.jpg'});

  await page.keyboard.press('Enter');
  await page.waitFor(2000);
  //await page.screenshot({path: 'chedraui3.jpg'});


  const productos = await page.evaluate(()=>{

    const productos = document.querySelectorAll('.js-plp-product-click .wrap-text-hook a');
    const precios = document.querySelectorAll('.js-plp-product-click .product__list_single_line div .product__listing--price');

    const links = [];

    for (var i = 0; i < productos.length; i++) {
      const tmp = {};
      tmp.tittle = productos[i].innerText
      tmp.price = precios[i].innerText

      links.push(tmp);
    }
    return links;
  });

  console.log(productos);

  await browser.close();
  return productos;

}

const scrapeSuperama = async () => {

  const browser = await puppeteer.launch(); //{headless: false}
  const page = await browser.newPage();

  await page.goto('http://www.superama.com.mx/');
  //await page.screenshot({path: 'superama1.jpg'});

  await page.type('#serachTextV3', producto);
  //await page.screenshot({path: 'superama2.jpg'});
  await page.waitFor(1000);

  await page.keyboard.press('Enter');
  await page.waitFor(7000);
  //await page.screenshot({path: 'superama3.jpg'});
  await page.waitFor(6000);
  const productos = await page.evaluate(()=>{

    const productos = document.querySelectorAll('.isotope-item .itemGrid .upcName p a');
    const precios = document.querySelectorAll('.isotope-item .itemGrid .upcPrice');

    const links = [];

    for (var i = 0; i < productos.length; i++) {
      const tmp = {};
      tmp.tittle = productos[i].innerText
      tmp.price = precios[i].innerText

      links.push(tmp);
    }
    return links;
  });

  console.log(productos);

  await browser.close();
  return productos;

}

module.exports.scrapeJusto = scrapeJusto
module.exports.scrapeCentral = scrapeCentral
module.exports.scrapeChedraui = scrapeChedraui
module.exports.scrapeSuperama = scrapeSuperama







/*
const puppeteer = require('puppeteer')

const scrapeMedium = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://medium.com/search?q=headless%20browser')

  const scrapedData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'div.postArticle-content a:first-child[data-action-value]'
      )
    )
      .filter(node => node.querySelector('.graf--title'))
      .map(link => ({
        title: link.querySelector('.graf--title').textContent,
        link: link.getAttribute('data-action-value')
      }))
  )

  await browser.close()
  return scrapedData
}

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.youtube.com/results?search_query=headless+browser'
  )

  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.ytd-video-renderer #video-title'))
      .map(link => ({
        title: link.getAttribute('title'),
        link: link.getAttribute('href')
      }))
      .slice(0, 10)
  )


  await browser.close()
  return scrapedData
}

module.exports.scrapeMedium = scrapeMedium
module.exports.scrapeYoutube = scrapeYoutube

*/














/*
const puppeteer = require('puppeteer');

(async ()=>{
  const browser = await puppeteer.launch(); //{headless: false}
  const page = await browser.newPage();

  await page.goto('http://justo.mx');
  await page.screenshot({path: 'justo1.jpg'});

  await page.type('#search', 'Jitomate Saladette');
  await page.screenshot({path: 'justo2.jpg'});

  await page.click('#search-form button');
  await page.waitForSelector('.styles__StyledCard-justo__sc-1usw4yt-0');
  await page.screenshot({path: 'justo3.jpg'});

  const enlaces = await page.evaluate(()=>{
    const elements = document.querySelectorAll ('.styles__StyledCard-justo__sc-1usw4yt-0 article a');

    const links = [];
    for(let element of elements){
      links.push(element.href);
    }
    return links;
  });

  //console.log(enlaces.length);
  const productos = [];
  for(let enlace of enlaces){
    await page.goto(enlace);
    await page.waitForSelector('.product__info')

    const producto = await page.evaluate(()=>{
      const tmp = {};
      tmp.tittle = document.querySelector('.product__info div h1').innerText;
      tmp.price = document.querySelector('.product__info div p span span').innerText;
      return tmp;
    });
    productos.push(producto);
  }

  console.log(productos);
  await browser.close();
})();
*/
