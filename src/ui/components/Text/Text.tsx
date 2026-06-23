import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import cn from '@/core/utils/cn';

const typographyVariants = cva('', {
    variants: {
        variant: {
            h1: 'font-heading text-h1 text-balance',
            h2: 'font-heading text-h2 text-balance',
            h3: 'font-heading text-h3 text-balance',
            h4: 'font-heading text-h4 text-balance',
            body: 'text-body',
        },
    },
    defaultVariants: {
        variant: undefined,
    },
});

type TextVariantProps = VariantProps<typeof typographyVariants>;

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
    TextVariantProps & {
        asChild?: boolean;
    };

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
    ({ className, asChild, variant, ...props }, ref) => {
        const variantMapping = {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            body: 'p',
        } as const;

        const mappedComp = variant ? variantMapping[variant] : 'p';
        const Comp = asChild ? Slot : mappedComp;

        return (
            <Comp
                ref={ref}
                className={cn(
                    typographyVariants({
                        variant,
                    }),
                    className,
                )}
                {...props}
            />
        );
    },
);

Text.displayName = 'Text';

export default Text;
