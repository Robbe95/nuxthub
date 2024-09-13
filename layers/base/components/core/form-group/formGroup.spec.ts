import FormGroup from '@base/components/core/form-group/FormGroup.vue'
import { mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
} from 'vitest'
import { h, type VNode } from 'vue'

describe('formGroup', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(FormGroup, {
      slots: {
        default(): VNode {
          return h('button', 'content')
        },
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('content')
  })
})
