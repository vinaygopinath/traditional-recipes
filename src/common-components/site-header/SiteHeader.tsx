import { Anchor, Header, ResponsiveContext, Box, Menu } from "grommet"
import { Grommet as GrommetIcon, Menu as MenuIcon } from "grommet-icons"
import React from "react"
import { withTranslation, WithTranslation } from "react-i18next"
import "./SiteHeader.scss"

type SiteHeaderProps = WithTranslation

class SiteHeader extends React.PureComponent<SiteHeaderProps> {
  getSmallScreenHeader() {
    return (
      <Box justify="end">
        <Menu
          a11yTitle="Navigation Menu"
          dropProps={{ align: { top: "bottom", right: "right" } }}
          icon={<MenuIcon color="brand" />}
          items={[
            {
              label: (
                <Box pad="small" className="header-item">
                  {this.getLocaleString("site_header_about")}
                </Box>
              ),
              href: "/about",
            },
          ]}
        />
      </Box>
    )
  }

  getStandardHeader() {
    return (
      <Box justify="end" direction="row" gap="medium">
        <Anchor
          className="header-item"
          href="/about"
          label={this.getLocaleString("site_header_about")}
        />
      </Box>
    )
  }

  getLocaleString(translationKey: string, args: any = undefined): string {
    return this.props.t(translationKey, args)
  }

  render() {
    return (
      <Header background="light-4" pad="small" height="xxsmall">
        <Anchor
          className="header-title"
          href="https://traditional.recipes"
          icon={<GrommetIcon color="document" />}
          label={this.getLocaleString("site_header_title")}
        />

        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small"
              ? this.getSmallScreenHeader()
              : this.getStandardHeader()
          }
        </ResponsiveContext.Consumer>
      </Header>
    )
  }
}

export default withTranslation(["site-header"])(SiteHeader)
