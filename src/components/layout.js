import React from "react"
import Bio from "../components/bio"
import SEO from "../components/seo"
import { IntlProvider } from "react-intl"
import messages from "../locales"
import { ThemeProvider } from "./theme-context"

import "intl"

const Layout = ({
  location,
  title,
  children,
  navMenus,
  langs,
  author = { name: '' },
}) => {
  const { langKey } = langs

  return (
    <IntlProvider
      locale={langKey}
      key={langs.defaultLangKey}
      messages={messages[langKey]}
    >
      <ThemeProvider>
        <div className="bg-primary text-primary">
          <SEO title={title} />
          <Bio navMenus={navMenus} langs={langs} />
          <header />
          <main className="min-h-body">{children}</main>
          <footer className="global-wrapper flex justify-center">
            Copyright © {new Date().getFullYear()} {author?.name}
          </footer>
        </div>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default Layout
