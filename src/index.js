import React from 'react'
import addons from '@storybook/addons'
import WrapStory from './WrapStory'

export const withThemes = themes => (storyFn, context) => {
  const channel = addons.getChannel();
  return (
    <WrapStory
      themes={themes}
      channel={channel}
      >{storyFn(context)}
    </WrapStory>
  )
}
