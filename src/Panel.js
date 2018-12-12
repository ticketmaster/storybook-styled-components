import React from 'react';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: null,
      themes: {},
      initialised: false,
    };

    this.onInit = this.onInit.bind(this)
    this.updateTheme = this.updateTheme.bind(this)

    this.props.channel.on('storybook-styled-components:init', this.onInit);
  }

  componentWillUnmount() {
    this.props.channel.removeListener('storybook-styled-components:init', this.onInit);
  }

  onInit(themes) {
    const queryTheme = this.props.api.getQueryParam('currentTheme')

    const theme = queryTheme
      ? queryTheme
      : this.state.theme ? this.state.theme : Object.keys(themes)[0]

    this.setTheme(themes, theme)
  }

  updateTheme(e) {
    this.setTheme(this.state.themes, e.target.value)
  }

  setTheme(themes, theme) {
    this.setState({ themes, theme })
    this.props.channel.emit('storybook-styled-components:update', theme)
    this.props.api.setQueryParams({ currentTheme: theme })
  }

  render() {
    if(!this.props.active) return (null);

    const { theme, themes } = this.state

    if (!theme) return <div>Addon is initialising</div>

    return (
      <div>
        <select value={theme} onChange={this.updateTheme}>
          {Object.keys(themes).map(theme => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
      </div>
    )
  }
}
