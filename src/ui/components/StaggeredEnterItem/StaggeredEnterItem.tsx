'use client';

import type { CSSProperties, FC, ReactNode } from 'react';
import cn from '@/core/utils/cn';

type Props = {
    enterIndex?: number;
    children: ReactNode;
};

const ENTER_STAGGER_MS = 75;

const StaggeredEnterItem: FC<Props> = ({ enterIndex = 0, children }) => (
    <div
        className={cn(
            'h-full opacity-0',
            'animate-fade-left-enter motion-reduce:animate-none motion-reduce:opacity-100',
        )}
        style={
            {
                '--enter-delay': `${enterIndex * ENTER_STAGGER_MS}ms`,
            } as CSSProperties
        }
    >
        {children}
    </div>
);

export default StaggeredEnterItem;
