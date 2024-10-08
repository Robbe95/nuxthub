import { useFormLabelStyle } from '@base/components/core/form-label/formLabel.style'
import FormLabel from '@base/components/core/form-label/FormLabel.vue'
import AppIcon from '@base/components/core/icon/AppIcon.vue'
import AppTooltip from '@base/components/core/tooltip/AppTooltip.vue'
import { flushPromises, mount } from '@vue/test-utils'
import {
  describe,
  expect,
  it,
} from 'vitest'

const labelStyle = useFormLabelStyle()

describe('formLabel', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(FormLabel, {
      props: {
        for: 'id',
        label: 'Label',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('Label')
    expect(wrapper.attributes('for')).toBe('id')
  })

  it('adapts the label correctly if required', () => {
    const wrapper = mount(FormLabel, {
      props: {
        isRequired: true,
        for: 'id',
        label: 'Label',
      },
    })

    expect(wrapper.find('span').text().includes('*')).toBe(true)
  })

  it('renders given tooltip content and icon', async () => {
    const wrapper = mount(FormLabel, {
      global: {
        components: {
          AppIcon,
          AppTooltip,
        },
      },
      props: {
        for: 'id',
        label: 'Label',
        tooltip: 'Tooltip',
      },
    })

    await flushPromises()

    expect(wrapper.findComponent(AppTooltip).props().content).toBe('Tooltip')
    expect(wrapper.findComponent(AppIcon).exists()).toBe(true)
  })

  it('applies correct classes if invalid', () => {
    const style = labelStyle.label({
      isDisabled: false,
      isInvalid: true,
    })
    const wrapper = mount(FormLabel, {
      props: {
        isInvalid: true,
        for: 'id',
        label: 'Label',
      },
    })

    expect(wrapper.find('span').attributes('class')).toBe(style)
  })

  it('applies correct classes if disabled', () => {
    const style = labelStyle.label({
      isDisabled: true,
      isInvalid: false,
    })
    const wrapper = mount(FormLabel, {
      props: {
        isDisabled: true,
        for: 'id',
        label: 'Label',
      },
    })

    expect(wrapper.find('span').attributes('class')).toBe(style)
  })
})
