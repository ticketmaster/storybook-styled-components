import React from 'react'
import addons from '@storybook/addons'
import Panel from './Panel'

addons.register('storybook-styled-components', api => {
  const channel = addons.getChannel();

  addons.addPanel('storybook-styled-components/panel', {
    title: 'Theme Picker',
    render: (panelState) => <Panel channel={channel} api={api} key="theme-picker-panel" active={panelState.active} />,
  })
})
