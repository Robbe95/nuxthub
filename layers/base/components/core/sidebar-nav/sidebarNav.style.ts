import { tv, type VariantProps } from '@base/libs/twVariants.lib'

export const useSidebarNavStyle = tv({
  slots: {
    containerClosed: 'sticky left-0 top-0 flex h-screen min-w-20 max-w-20 flex-col items-center justify-between gap-6 border-r border-solid border-foreground/50 bg-background px-3 py-6 text-foreground transition-all duration-100',
    containerOpen: 'sticky left-0 top-0 flex h-screen min-w-64 max-w-64 flex-col items-start justify-between gap-6 border-r border-solid border-foreground/50 bg-background px-3 py-6 text-foreground transition-all duration-100',
    groupContainer: 'flex w-full flex-1 flex-col items-center gap-y-2 pb-4',
    groupTitle: 'w-full uppercase text-neutral-400',
    header: 'self-center',
    item: 'w-full',
    itemsList: 'flex flex-1 flex-col items-center gap-y-2',
    nav: 'size-full pt-12',
    toggleButton: 'absolute -right-3 top-14 flex h-12 w-6 items-center justify-center rounded-full border border-solid border-muted bg-background text-muted-foreground',
  },
})

export type SidebarNavStyleProps = VariantProps<typeof useSidebarNavStyle>
