const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fetchAndGetCheerioObject = async (url) => {
  const text = await fetch('https://mostminds.com/')
  const textHtml = await text.text()
  return cheerio.load(textHtml)
}
;(async () => {
  const $ = await fetchAndGetCheerioObject
  const bodyText = await $('body')
  const html = bodyText.html()
  const h = '<h1> hello <h2>'
  const allTags = html.match(/<\w*>/g, 0)
  console.log(allTags)
})()