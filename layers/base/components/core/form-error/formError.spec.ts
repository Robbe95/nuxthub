import FormError from '@base/components/core/form-error/FormError.vue'
import { mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
} from 'vitest'

describe('formError', () => {
  it('renders errors correctly', () => {
    const wrapper = mount(FormError, {
      props: {
        isVisible: true,
        errors: { _errors: [
          'error',
        ] },
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('error')
  })

  it('renders nothing if isVisible is false', () => {
    const wrapper = mount(FormError, {
      props: {
        isVisible: false,
        errors: { _errors: [
          'error',
        ] },
      },
    })

    expect(wrapper.text()).toBeFalsy()
  })
})
