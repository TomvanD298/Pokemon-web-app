'use client';

import type { CSSProperties, FC, ReactNode } from 'react';
import cn from '@/core/utils/cn';

type ColumnSpan = 1 | 2 | 3;

type Props = {
    columnSpan?: 1 | 2;
    columnSpanLg?: ColumnSpan;
    enterIndex?: number;
    children: ReactNode;
};

const COLUMN_SPAN_CLASS: Record<ColumnSpan, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
};

const COLUMN_SPAN_LG_CLASS: Record<ColumnSpan, string> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
};

const ENTER_STAGGER_MS = 100;

const HomepageGridItem: FC<Props> = ({
    columnSpan = 1,
    columnSpanLg,
    enterIndex = 0,
    children,
}) => (
    <div
        className={cn(
            COLUMN_SPAN_CLASS[columnSpan],
            columnSpanLg !== undefined && COLUMN_SPAN_LG_CLASS[columnSpanLg],
            'h-full min-w-0',
            'opacity-0',
            'animate-fade-up-enter motion-reduce:animate-none motion-reduce:opacity-100',
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

export default HomepageGridItem;
