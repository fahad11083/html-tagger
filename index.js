const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { irrelevantTags } = require('./constants');
const fetchAndGetCheerioObject = async (url) => {
  const text = await fetch('http://example.com/')
  const textHtml = await text.text()
  return cheerio.load(textHtml)
}
const removeCharacters = (str) => {
  const chars = {'<':'','>':''}
  return str.replace(/[<>]/g, m => chars[m])
}
;(async () => {
  try {
    const $ = await fetchAndGetCheerioObject()
    const bodyText = await $('body')
    const html = bodyText.html()
    const h = '<h1> hello <h2>'
    const allTags = html.match(/<\w*>/g, 0)
    const uniqueTags = []
    for (const tag of allTags) {
      if (!uniqueTags.includes(tag) && !irrelevantTags.includes(tag)) uniqueTags.push(tag)
    }
    const text = 'More information...'
    let selector
    for(const tag of uniqueTags) {
      selector = removeCharacters(tag) + ':contains(\'' + text + '\')'
      console.log(selector)
      const selectorText = $(`${selector}`).last().text()
      if (selectorText === text) break
    }
    console.log("this is your selector path", selector)
    const tag = $("h1:contains('Example Domain')").last().text()
    
  }catch (e) {
    console.log(e)
  }
})()