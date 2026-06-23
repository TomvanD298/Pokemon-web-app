'use client';

import type { CSSProperties, FC } from 'react';
import cn from '@/core/utils/cn';

type Props = {
    animationDelay?: string;
    ariaLabel: string;
    className?: string;
    isSelected?: boolean;
    isVisible?: boolean;
    left: string;
    onClick?: () => void;
    size: number;
    top: string;
};

const CameraInformationHotspot: FC<Props> = ({
    animationDelay = '0ms',
    ariaLabel,
    className,
    isSelected = false,
    isVisible = false,
    left,
    onClick,
    size,
    top,
}) => {
    const positionStyle: CSSProperties = {
        left,
        top,
        transform: 'translate(-50%, -50%)',
    };

    const bounceStyle: CSSProperties = {
        animationDelay,
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            aria-hidden
            className={cn('pointer-events-none absolute', className)}
            style={positionStyle}
        >
            <div
                className={cn(
                    'opacity-0',
                    'animate-bounce-enter motion-reduce:animate-none motion-reduce:opacity-100',
                )}
                style={bounceStyle}
            >
                <button
                    type="button"
                    aria-label={ariaLabel}
                    aria-pressed={isSelected}
                    className={cn(
                        'pointer-events-auto touch-manipulation rounded-full',
                        'border-4 border-dashed',
                        isSelected ? 'border-primary-lime' : 'border-white',
                        'animate-spin motion-reduce:animate-none',
                        'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
                    )}
                    style={{
                        width: size,
                        height: size,
                        animationDuration: '30s',
                        animationTimingFunction: 'linear',
                    }}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default CameraInformationHotspot;
