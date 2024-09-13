/* eslint-disable tailwindcss/no-custom-classname */
import type { VariantProps } from '@base/libs/twVariants.lib'
import { tv } from '@base/libs/twVariants.lib'

export const useAccordionStyle = tv({
  slots: {
    title: 'flex flex-col items-start',
    content: 'data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden bg-background text-foreground',
    contentDiv: 'px-3 py-2 text-subtext',
    icon: 'text-primary transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180',
    item: 'overflow-hidden first:mt-0 first:rounded-t-popover last:rounded-b-popover',
    root: 'rounded-popover shadow-popover-shadow',
    trigger: 'group flex flex-1 cursor-pointer items-center justify-between gap-10 border-t border-solid border-primary/10 bg-background px-3 py-2 text-foreground outline-none hover:bg-muted-background',
  },
})

export type AccordionStyleProps = VariantProps<typeof useAccordionStyle>
