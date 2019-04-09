import React from 'react'
import addons from '@storybook/addons'
import WrapStory from './WrapStory'

export const withThemes = (themes, GlobalStyle) => (storyFn, context) => {
  const channel = addons.getChannel();
  return (
    <WrapStory
      GlobalStyle={GlobalStyle}
      themes={themes}
      channel={channel}
      >{storyFn(context)}
    </WrapStory>
  )
}
