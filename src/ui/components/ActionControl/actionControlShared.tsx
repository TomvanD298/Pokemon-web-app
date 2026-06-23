import type { FC } from 'react';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

export const getActionControlClassName = (className?: string) =>
    cn(
        'border-0.5 relative w-fit touch-manipulation self-center p-0.5',
        'before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:z-0 before:-translate-x-1/2 before:-translate-y-1/2',
        'before:h-[calc(100%+1px)] before:w-[calc(100%+1px)] before:rounded-full',
        'before:[background-image:var(--tc-gradient-radial)] before:content-[""]',
        'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
    );

type ActionControlLabelProps = {
    label: string;
};

export const ActionControlLabel: FC<ActionControlLabelProps> = ({ label }) => (
    <span
        className={cn(
            'bg-primary-lime relative z-10 flex h-11 w-fit items-center justify-center rounded-full px-6',
        )}
    >
        <Text
            variant="body"
            className="text-center text-sm font-bold text-black uppercase"
        >
            {label}
        </Text>
    </span>
);
