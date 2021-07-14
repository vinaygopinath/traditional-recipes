import React from "react"
import "./App.css"
import { BrowserRouter, Redirect, Route } from "react-router-dom"
import CountryPage from "./pages/country/CountryPage"
import { Box, Grommet } from "grommet"
import "./i18n"
import SiteHeader from "./common-components/site-header/SiteHeader"

const theme = {
  global: {
    colors: {
      react: "#282c34",
    },
    font: {
      size: "18px",
      height: "20px",
      family:
        "'Inter', Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
  },
}

function App() {
  return (
    <React.Suspense fallback="Loading..">
      <Grommet theme={theme} full>
        <SiteHeader />
        <Box pad="medium">
          <BrowserRouter>
            <Route exact path="/">
              <Redirect to="/kenya" />
            </Route>
            <Route path="/:country" component={CountryPage} />
          </BrowserRouter>
        </Box>
      </Grommet>
    </React.Suspense>
  )
}

export default App
