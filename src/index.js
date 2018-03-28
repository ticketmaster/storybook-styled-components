import React from 'react'
import addons from '@storybook/addons'
import { ThemeProvider } from 'styled-components'
import WrapStyledComponentsThemePicker from './WrapStory'

const wrapperTheme = (themes) => {
  const channel = addons.getChannel();
  return (storyFn, context) => (
    <WrapStyledComponentsThemePicker
      themes={themes}
      channel={channel}
      >{storyFn(context)}
    </WrapStyledComponentsThemePicker>
  );
}

export function withThemes(themes, defaultTheme) {
  return (storyFn, context) => wrapperTheme(themes, defaultTheme)(storyFn, context)
}
