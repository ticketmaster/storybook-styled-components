import React from 'react'
import addonAPI from '@storybook/addons'

class PanelContainer extends React.Component {
  state = {
    theme: null,
    themes: {},
    initialised: false,
  }

  constructor(props) {
    super()

    props.channel.on('storybook-styled-components/init', this.onInit)
  }

  onInit = themes => {
    const queryTheme = this.props.api.getQueryParam('currentTheme')

    const theme = queryTheme
      ? queryTheme
      : this.state.theme ? this.state.theme : Object.keys(themes)[0]

    this.setTheme(themes, theme)
  }

  updateTheme = e => {
    const newTheme = e.target.value
    this.setTheme(this.state.themes, newTheme)
  }

  setTheme(themes, theme) {
    this.setState({ themes, theme })
    this.props.channel.emit('storybook-styled-components/update', theme)
    this.props.api.setQueryParams({ currentTheme: theme })
  }

  render() {
    const { theme, themes } = this.state

    if (!theme) return <div>Addon is initialising</div>

    return (
      <div>
        <select value={this.state.theme} onChange={this.updateTheme}>
          {Object.keys(themes).map(theme => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

addonAPI.register('storybook-styled-components', storybookAPI => {
  addonAPI.addPanel('storybook-styled-components/panel', {
    title: 'Theme Picker',
    render: () => (
      <PanelContainer channel={addonAPI.getChannel()} api={storybookAPI} />
    ),
  })
})
