import React from 'react'
import addonAPI from '@storybook/addons'
import { ThemeProvider } from 'styled-components'

export default themes => {
  // TODO, add some validation and nice error reporting

  const channel = addonAPI.getChannel()

  class StyledComponentsThemePicker extends React.Component {
    state = {
      theme: null,
    }

    constructor() {
      super()

      channel.emit('storybook-styled-components/init', themes)
      channel.on('storybook-styled-components/update', this.onThemeUpdate)
    }

    onThemeUpdate = theme => this.setState({ theme })

    getActiveTheme = () => themes[this.state.theme]

    render() {
      if (!this.state.theme) return null

      return (
        <ThemeProvider theme={() => this.getActiveTheme()}>
          {this.props.children}
        </ThemeProvider>
      )
    }
  }

  return story => (
    <StyledComponentsThemePicker>{story()}</StyledComponentsThemePicker>
  )
}
