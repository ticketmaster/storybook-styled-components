import React from 'react';
import { ThemeProvider } from 'styled-components'

export default class WrapStory extends React.Component {

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
    this.props.channel.removeListener('storybook-styled-components:update', this.updateState)
  }

  componentWillReceiveProps(props) {
    this.setState(props)
  }

  updateState(theme) {
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
