import type { VariantProps } from '@base/libs/twVariants.lib'
import { tv } from '@base/libs/twVariants.lib'

export const useEditableStyle = tv({
  slots: {
    actions: 'flex gap-2',
    root: 'relative flex flex-col gap-2',
  },
})

export type EditableStyleProps = VariantProps<typeof useEditableStyle>
