import React from "react"
import Bio from "../components/bio"
import SEO from "../components/seo"
import { IntlProvider } from 'react-intl'
import messages from '../locales'

import 'intl'

const Layout = ({ location, title, children, navMenus, langs, author = { name: '' } }) => {
  const { langKey } = langs

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
        <footer className="global-wrapper flex justify-center">
          Copyright © {new Date().getFullYear()} {author?.name}
        </footer>
      </div>
    </IntlProvider>
  )
}

export default Layout