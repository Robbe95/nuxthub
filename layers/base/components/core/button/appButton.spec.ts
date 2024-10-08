import AppButton from '@base/components/core/button/AppButton.vue'
import { useButtonStyle } from '@base/components/core/button/button.style'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppLoader from '@base/components/core/loader/AppLoader.vue'
import { mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
} from 'vitest'

const buttonStyle = useButtonStyle()

describe('appButton', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Test content',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toContain('Test content')
  })

  it('renders the specified button type', () => {
    const wrapper = mount(AppButton, {
      props: {
        type: 'submit',
      },
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('applies classes from specified variant', () => {
    const style = buttonStyle.button({
      size: 'default',
      variant: 'ghost',
    })
    const wrapper = mount(AppButton, {
      props: {
        variant: 'ghost',
      },
    })

    expect(wrapper.attributes('class')).toBe(style)
  })

  it('renders icons correctly', () => {
    const wrapper = mount(AppButton, {
      global: {
        components: {
          AppIcon,
        },
      },
      props: {
        iconLeft: 'checkmark',
      },
      slots: {
        default: 'Test content',
      },
    })
    const iconComponent = wrapper.findComponent(AppIcon)

    expect(iconComponent.props('icon')).toBe('checkmark')
  })

  it('shows loader if isLoading is true', () => {
    const wrapper = mount(AppButton, {
      global: {
        components: {
          AppLoader,
        },
      },
      props: {
        isLoading: true,
      },
      slots: {
        default: 'Test content',
      },
    })

    const loaderComponent = wrapper.findComponent(AppLoader)

    expect(loaderComponent.exists()).toBe(true)
  })

  it('doesn\'t show loader if isLoading is false', () => {
    const wrapper = mount(AppButton, {
      global: {
        components: {
          AppLoader,
        },
      },
      props: {
        isLoading: false,
      },
      slots: {
        default: 'Test content',
      },
    })

    const loaderComponent = wrapper.findComponent(AppLoader)

    expect(loaderComponent.exists()).toBe(false)
  })

  it('disabled attribute exists if isDisabled is true', () => {
    const wrapper = mount(AppButton, {
      props: {
        isDisabled: true,
      },
      slots: {
        default: 'Test content',
      },
    })

    expect(wrapper.attributes('disabled')).toBe('')
  })

  it('disabled attribute doesn\'t exist if isDisabled is false', () => {
    const wrapper = mount(AppButton, {
      props: {
        isDisabled: false,
      },
      slots: {
        default: 'Test content',
      },
    })

    expect(wrapper.attributes('disabled')).toBe(undefined)
  })
})
