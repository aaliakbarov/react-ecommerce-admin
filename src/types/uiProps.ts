import type { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as SelectPrimitive from '@radix-ui/react-select';

// BUTTONS
export type ButtonProps = ComponentProps<'button'> & {
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
};

// DIALOGS
export type DialogTitleProps = ComponentProps<'h2'>;
export type DialogHeaderProps = ComponentProps<'div'>;
export type DialogOverlayProps = ComponentProps<'div'>;
export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>;
export type DialogFooterProps = ComponentProps<'div'>;

// MINORS
export type LabelProps = ComponentProps<'label'>;
export type InputProps = ComponentProps<'input'>;
export type BadgeProps = ComponentProps<'span'> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    asChild?: boolean;
};

// CARDS
export type CardProps = ComponentProps<'div'>;
export type CardHeaderProps = ComponentProps<'div'>;
export type CardTitleProps = ComponentProps<'div'>;

// SELECTS
export type SelectContentProps = ComponentProps<
    typeof SelectPrimitive.Content
> & {
    position?: 'popper' | 'item-aligned';
};
export type SelectScrollUpButtonProps = ComponentProps<
    typeof SelectPrimitive.ScrollUpButton
>;
export type SelectScrollDownButtonProps = ComponentProps<
    typeof SelectPrimitive.ScrollDownButton
>;
export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item> & {
    value: string;
};
