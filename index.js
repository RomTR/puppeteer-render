const puppeteer = require('puppeteer');

const express = require('express')
const app = express()
const port = process.env.PORT || 3001;

async function getData() {
 
}


app.get('/', async (req, res) => {
  const browser = await puppeteer.launch({headless: 'new',
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  await page.goto('https://www.windguru.cz/station/2748');
  await page.waitForTimeout(1000);
  await page.waitForSelector('.wgs_wind_avg_value')
  //await page.waitForFunction('document.getElementsByClassName("wgs_wind_avg_value")[0].childNodes[0].length > 0')
  const data = await page.evaluate(() => {
    return document.querySelector('.wgs_wind_avg_value').innerText;
  });
  //console.log(data);
  await browser.close();
  res.json({wind: data})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})