import React from "react"
import Bio from "../components/bio"
import SEO from "../components/seo"
import { IntlProvider } from 'react-intl'
import messages from '../locales'

import 'intl'

const Layout = ({ location, title, children, navMenus, langs }) => {
  const { langKey } = langs
  console.log('message:', messages)
  console.log('langKey:', langKey)
  console.log('messages[langKey]:', messages[langKey])
  return (
    <IntlProvider
      locale={langKey}
      key={langs.defaultLangKey}
      messages={messages[langKey]}
    >
      <div className="">
        <SEO title="" />
        <Bio navMenus={navMenus} langs={langs} />
        <header />
        <main>{children}</main>
        <footer className="global-wrapper flex">
          © {new Date().getFullYear()}
        </footer>
      </div>
    </IntlProvider>
  )
}

export default Layout