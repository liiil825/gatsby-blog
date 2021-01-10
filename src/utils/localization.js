const localizeUrl = (url, language, defaultLangKey) => {
  // /zh/hello-world/index.zh/ -> /hello-world
  // /hello-world/index.en/ -> /en/hello-world
  // let url = slug.
  return `/${language}${url}`
    .replace(new RegExp(`/index.${language}/`), '')
    .replace(new RegExp(`^/${defaultLangKey}`), '')
}

const getBlogUrl = (language, defaultLangKey, url) => {
  // /zh/hello-world/index.zh/ -> /hello-world
  // /hello-world/index.en/ -> /en/hello-world
  // let url = slug.
  return localizeUrl(`/blog${url}`, language, defaultLangKey)
}

const getCurrentLangKey = (slug) => {
  // /hello-world/index.en
  // /hello-world/index.zh
  const arr = slug.split('.')
  const len = arr.length
  if (len < 1) {
    new Error('Please name the markdown file to .en.md or .zh.md')
  }
  return arr[len - 1].replace('/', '')
}

const getLangUrl = (url, { langKey = '', langs, defaultLangKey }) => {
  // /hello-world/ -> /en/hello-world
  // /hello-world/ -> /hello-world
  // let lang = langKey
  let lang = getLangKeyFromUrl(url, { langKey, langs, defaultLangKey })
  if (lang === langKey) {
    return url
  }

  return `/${langKey}${url}`
    .replace(new RegExp(`/${lang}/`), '/')
    .replace(new RegExp(`^/${defaultLangKey}`), '')
}

const getLangKeyFromUrl = (url, { langKey, langs, defaultLangKey }) => {
  let result = defaultLangKey
  langs.forEach(lang => {
    if (new RegExp(`/${lang}/`).test(url)) {
      result = lang
    }
  })

  return result
}

const getLangMenus = (url, langs, defaultLangKey) => {
  let lang = getLangKeyFromUrl(url, { langs, defaultLangKey })
  return langs.map(langKey => ({
    url: getLangUrl(url, { langKey, langs, defaultLangKey }),
    langKey,
    selected: lang === langKey,
  }))
}

const initLangMenu = ({
  pathname,
  langs,
  defaultLangKey,
  previous,
  next,
  prefix = 'blog'
 }) => {
  let url = pathname
  const navMenus = getLangMenus(url, langs, defaultLangKey)
  console.log(langs, defaultLangKey)
  let langKey = getLangKeyFromUrl(url, { langs, defaultLangKey })
  let prevUrl = !previous ? '' : localizeUrl(`/${prefix}${previous.fields.slug}`, langKey, defaultLangKey)
  let nextUrl = !next ? '' : localizeUrl(`/${prefix}${next.fields.slug}`, langKey, defaultLangKey)

  return {
    navMenus,
    prevUrl,
    nextUrl,
  }
}

module.exports = {
  localizeUrl,
  getBlogUrl,
  getLangKeyFromUrl,
  getLangUrl,
  getLangMenus,
  initLangMenu,
  getCurrentLangKey,
}