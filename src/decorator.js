import React from 'react'
import addons from '@storybook/addons'
import { ThemeProvider } from 'styled-components'

class StyledComponentsThemePicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = { theme: '' }
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.props.channel.emit('storybook-styled-components:init', this.props.themes)
    this.props.channel.on('storybook-styled-components:update', this.updateState)
  }

  componentWillUnmount(){
    this.props.channel.removeListener('storybook-styled-components:init', this.props.themes)
    this.props.channel.removeListener('storybook-styled-components:update', theme => this.setState({ theme }))

  }

  componentWithReceiveProps(props) {
    console.log('componentWithReceiveProps', props)
    this.setState(props)
  }
  updateState(theme) {
    console.log('updateState', theme)
    this.setState({theme})
  }
  render() {
    const {themes, children} = this.props;
    const {theme} = this.state;

    return themes[theme]
    ? <ThemeProvider theme={themes[theme]}>{this.props.children}</ThemeProvider>
    : this.props.children
  }
}

const wrapperTheme = (themes) => {
  const channel = addons.getChannel();
  return (storyFn, context) => (
    <StyledComponentsThemePicker
      themes={themes}
      channel={channel}
      >{storyFn(context)}
    </StyledComponentsThemePicker>
  );
}

export function withThemes(themes, defaultTheme) {
  return (storyFn, context) => wrapperTheme(themes, defaultTheme)(storyFn, context)
}
