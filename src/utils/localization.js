const localizeUrl = (language, defaultLangKey, url) => {
  // /zh/hello-world/index.zh/ -> /hello-world
  // /hello-world/index.en/ -> /en/hello-world
  // let url = slug.
  return `/${language}${url}`
    .replace(new RegExp(`index.${language}/`), '')
    .replace(new RegExp(`^/${defaultLangKey}`), '')
}

const getBlogUrl = (language, defaultLangKey, url) => {
  // /zh/hello-world/index.zh/ -> /hello-world
  // /hello-world/index.en/ -> /en/hello-world
  // let url = slug.
  return localizeUrl(language, defaultLangKey, `/blog${url}`)
}

const getCurrentLangKey = (slug) => {
  // /hello-world/index.en
  // /hello-world/index.zh
  const arr = slug.split('.')
  const len = arr.length
  if (len < 1) {
    new Error('Please name the markdown file to .en.md or .zh.md.')
  }
  return arr[len - 1].replace('/', '')
}

const getLangKey = (url, { langs, defaultLangKey }) => {
  let result = defaultLangKey
  langs.forEach(lang => {
    if (new RegExp(`/${lang}/`).test(url)) {
      result = lang
    }
  })

  return result
}

module.exports = {
  localizeUrl,
  getBlogUrl,
  getLangKey,
  getCurrentLangKey,
}