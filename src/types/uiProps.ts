// import type { ComponentProps, ReactNode } from 'react';
// import * as DialogPrimitive from '@radix-ui/react-dialog';
// import * as SelectPrimitive from '@radix-ui/react-select';
// import * as TooltipPrimitive from '@radix-ui/react-tooltip';
// import * as SheetPrimitive from '@radix-ui/react-dialog';
// import * as SeparatorPrimitive from '@radix-ui/react-separator';
// import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// // BUTTONS
// export type ButtonProps = ComponentProps<'button'> & {
//     variant?:
//         | 'default'
//         | 'destructive'
//         | 'outline'
//         | 'secondary'
//         | 'ghost'
//         | 'link';
//     size?: 'default' | 'sm' | 'lg' | 'icon';
//     asChild?: boolean;
// };

// // DIALOGS
// export type DialogTitleProps = ComponentProps<'h2'>;
// export type DialogHeaderProps = ComponentProps<'div'>;
// export type DialogOverlayProps = ComponentProps<'div'>;
// export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>;
// export type DialogFooterProps = ComponentProps<'div'>;

// // MINORS
// export type LabelProps = ComponentProps<'label'>;
// export type InputProps = ComponentProps<'input'>;
// export type BadgeProps = ComponentProps<'span'> & {
//     variant?: 'default' | 'secondary' | 'destructive' | 'outline';
//     asChild?: boolean;
// };

// // CARDS
// export type CardProps = ComponentProps<'div'>;
// export type CardHeaderProps = ComponentProps<'div'>;
// export type CardTitleProps = ComponentProps<'div'>;
// export type CardContentProps = ComponentProps<'div'>;

// // SELECTS
// export type SelectContentProps = ComponentProps<
//     typeof SelectPrimitive.Content
// > & {
//     position?: 'popper' | 'item-aligned';
// };
// export type SelectScrollUpButtonProps = ComponentProps<
//     typeof SelectPrimitive.ScrollUpButton
// >;
// export type SelectScrollDownButtonProps = ComponentProps<
//     typeof SelectPrimitive.ScrollDownButton
// >;
// export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item> & {
//     value: string;
// };

// // TOOLTIPS
// export type TooltipProviderProps = ComponentProps<
//     typeof TooltipPrimitive.Provider
// >;
// export type TooltipContentProps = ComponentProps<
//     typeof TooltipPrimitive.Content
// >;

// // SHEETS
// export type SheetOverlayProps = ComponentProps<typeof SheetPrimitive.Overlay>;
// export type SheetTitleProps = ComponentProps<typeof SheetPrimitive.Title>;
// export type SheetDescriptionProps = ComponentProps<
//     typeof SheetPrimitive.Description
// >;

// // SIDEBAR

// export type SidebarMenuButtonProps = ComponentProps<'button'> & {
//     asChild?: boolean;
//     tooltip?: string | { children: ReactNode };
//     isActive?: boolean;
//     variant?: 'default' | 'outline';
//     size?: 'default' | 'sm' | 'lg';
// };

// // SEPARATOR

// export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

// // DROPDOWN MENU

// export type DropdownMenuRadioItemProps = ComponentProps<
//     typeof DropdownMenuPrimitive.RadioItem
// >;

import type { LucideIcon } from 'lucide-react';

export type navAppItemsType = {
    title: string;
    url: string;
    icon: LucideIcon;
};

export type StatCardProps = {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
};
