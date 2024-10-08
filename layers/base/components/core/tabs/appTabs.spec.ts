import AppBadge from '@base/components/core/badge/AppBadge.vue'
import AppTabs from '@base/components/core/tabs/AppTabs.vue'
import type { TabItem } from '@base/types/core/tabItem.type'
import { mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
} from 'vitest'

describe('appTabs', () => {
  it('renders tabs labels correctly', () => {
    const tabs: TabItem[] = [
      {
        id: 'Tab 1',
        label: 'Tab 1',
      },
      {
        id: 'Tab 2',
        label: 'Tab 2',
      },
    ]

    if (tabs[0] == null) {
      throw new Error('No tabs provided')
    }
    const wrapper = mount(AppTabs, {
      props: {
        items: tabs,
        tab: tabs[0],
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('button')[0]?.text()).toBe('Tab 1')
    expect(wrapper.findAll('button')[1]?.text()).toBe('Tab 2')
  })

  it('renders tab badge correctly', () => {
    const tabs: TabItem[] = [
      {
        id: 'Tab 1',
        badge: {
          class: 'bg-red-500',
          label: 'badge',
        },
        label: 'Tab 1',
      },
    ]

    if (tabs[0] == null) {
      throw new Error('No tabs provided')
    }

    const wrapper = mount(AppTabs, {
      global: {
        components: {
          AppBadge,
        },
      },
      props: {
        items: tabs,
        tab: tabs[0],
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(AppBadge).text()).toBe('badge')
    expect(wrapper.findComponent(AppBadge).attributes('class')?.includes('bg-red-500')).toBe(true)
  })
})
