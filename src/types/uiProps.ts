import type { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

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

export type DialogTitleProps = ComponentProps<'h2'>;
export type DialogHeaderProps = ComponentProps<'div'>;
export type DialogOverlayProps = ComponentProps<'div'>;
export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content>;
export type DialogFooterProps = ComponentProps<'div'>;

export type LabelProps = ComponentProps<'label'>;
export type InputProps = ComponentProps<'input'>;

export type CardProps = ComponentProps<'div'>;
export type CardHeaderProps = ComponentProps<'div'>;
export type CardTitleProps = ComponentProps<'div'>;

export type BadgeProps = ComponentProps<'span'> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    asChild?: boolean;
};
