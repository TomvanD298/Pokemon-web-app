import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import cn from '@/core/utils/cn';

const buttonVariants = cva(
    [
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium whitespace-nowrap',
        'transition-colors active:scale-95 motion-safe:transition',
        'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        'cursor-pointer disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    ],
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                outline:
                    'text-primary hover:bg-accent hover:text-accent-foreground border-2 hover:border-transparent',
                secondary:
                    'text-secondary-foreground bg-blue-300 hover:bg-blue-500',
                ghost: 'text-primary bg-transparent hover:underline',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'text-base',
                sm: 'text-xs',
                lg: 'text-lg',
                icon: 'size-10 p-3',
            },
            fullWidth: {
                true: 'w-full',
                false: 'w-auto',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            fullWidth: false,
        },
    },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            fullWidth = false,
            asChild = false,
            type = 'button',
            size,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                ref={ref}
                className={cn(
                    buttonVariants({ variant, size, fullWidth, className }),
                )}
                type={type}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export default Button;
