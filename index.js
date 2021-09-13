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
