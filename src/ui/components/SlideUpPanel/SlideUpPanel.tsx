'use client';

import type { FC, ReactNode } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { lock, unlock } from 'tua-body-scroll-lock';
import cn from '@/core/utils/cn';

type Props = {
    children?: ReactNode;
    className?: string;
    closeAriaLabel?: string;
    collapsedHeight?: string;
    collapsedTop?: string;
    contentClassName?: string;
    isOpen: boolean;
    isVisible?: boolean;
    layout?: 'fixed' | 'inline';
    onClose?: () => void;
    onOpen?: () => void;
    openAriaLabel?: string;
    openTop?: string;
    panelHeight?: string;
    showCloseArrow?: boolean;
    showOpenArrow?: boolean;
};

const SlideUpPanel: FC<Props> = ({
    children,
    className,
    closeAriaLabel,
    collapsedHeight = 'h-20',
    collapsedTop = 'top-[80dvh]',
    contentClassName,
    isOpen,
    isVisible = true,
    layout = 'fixed',
    onClose,
    onOpen,
    openAriaLabel,
    openTop = 'top-[20dvh]',
    panelHeight,
    showCloseArrow = false,
    showOpenArrow = false,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInlineLayout = layout === 'inline';
    const hasArrowControl =
        (showOpenArrow && !isOpen && onOpen) ||
        (showCloseArrow && isOpen && onClose);

    useEffect(() => {
        const scrollElement = scrollRef.current;

        if (!scrollElement || !isVisible) {
            return undefined;
        }

        lock(scrollElement);

        return () => {
            unlock(scrollElement);
        };
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={cn(
                'bg-background-primary flex min-h-0 flex-col overflow-hidden rounded-t-2xl px-4 py-6',
                'duration-300 ease-out motion-reduce:transition-none',
                isInlineLayout
                    ? cn(
                          'min-h-0 shrink-0 transition-[max-height] duration-300',
                          isOpen ? 'flex-1' : collapsedHeight,
                      )
                    : cn(
                          'fixed inset-x-0 bottom-0 z-30 transition-[top]',
                          panelHeight,
                          isOpen ? openTop : collapsedTop,
                      ),
                className,
            )}
        >
            {hasArrowControl ? (
                <div className="flex shrink-0 justify-center">
                    {!isOpen && showOpenArrow && onOpen ? (
                        <button
                            type="button"
                            aria-label={openAriaLabel}
                            className={cn(
                                'flex size-10 items-center justify-center text-black',
                                'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
                            )}
                            onClick={onOpen}
                        >
                            <FontAwesomeIcon
                                aria-hidden
                                className="size-6"
                                icon={faChevronUp}
                            />
                        </button>
                    ) : null}

                    {isOpen && showCloseArrow && onClose ? (
                        <button
                            type="button"
                            aria-label={closeAriaLabel}
                            className={cn(
                                'flex size-10 items-center justify-center text-black',
                                'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
                            )}
                            onClick={onClose}
                        >
                            <FontAwesomeIcon
                                aria-hidden
                                className="size-6"
                                icon={faChevronDown}
                            />
                        </button>
                    ) : null}
                </div>
            ) : null}

            <div
                ref={scrollRef}
                className={cn(
                    'overflow-y-auto-touch flex min-h-0 flex-1 basis-0 flex-col overflow-x-hidden overscroll-y-contain',
                    contentClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default SlideUpPanel;
