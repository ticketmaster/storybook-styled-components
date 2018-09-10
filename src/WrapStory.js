import React from 'react';
import { ThemeProvider } from 'styled-components'

export default class WrapStory extends React.Component {

  constructor(props) {
    super(props)
    const keys = Object.keys(props.themes)
    this.state = {theme: props.themes[keys[0]]}
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.props.channel.emit('storybook-styled-components:init', this.props.themes)
    this.props.channel.on('storybook-styled-components:update', this.updateState)
  }

  componentWillUnmount() {
    this.props.channel.removeListener('storybook-styled-components:init', this.props.themes)
    this.props.channel.removeListener('storybook-styled-components:update', this.updateState)
  }

  componentWillReceiveProps(props) {
    this.setState(props)
  }

  updateState(theme) {
    const {themes} = this.props
    this.setState({theme: themes[theme]})
  }

  render() {
    const {children} = this.props
    const {theme} = this.state
    return theme ? <ThemeProvider theme={theme}>{children}</ThemeProvider> : children
  }
}
