'use client';

import type { CSSProperties, FC } from 'react';
import cn from '@/core/utils/cn';

type Props = {
    ariaLabel: string;
    fillDelayMs?: number;
    value: number;
};

const DEFAULT_FILL_DELAY_MS = 500;

const HomepageCollectionProgressBar: FC<Props> = ({
    ariaLabel,
    fillDelayMs = DEFAULT_FILL_DELAY_MS,
    value,
}) => {
    const progressStyle = {
        '--progress-delay': `${fillDelayMs}ms`,
        '--progress-target': `${value}%`,
    } as CSSProperties;

    return (
        <div
            aria-label={ariaLabel}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={value}
            className="bg-secondary-purple h-2 overflow-hidden rounded-full"
            role="progressbar"
        >
            <div
                className={cn(
                    'bg-primary-lime h-full rounded-full',
                    'animate-progress-fill motion-reduce:animate-none',
                    'motion-reduce:w-(--progress-target)',
                )}
                style={progressStyle}
            />
        </div>
    );
};

export default HomepageCollectionProgressBar;
