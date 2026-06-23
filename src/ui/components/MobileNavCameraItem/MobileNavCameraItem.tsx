'use client';

import type { FC } from 'react';
import { faCamera } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from '@/core/utils/cn';
import CameraPreviewOverlay from '@/ui/components/CameraPreviewOverlay/CameraPreviewOverlay';
import Text from '@/ui/components/Text/Text';
import useCamera from '@/ui/hooks/useCamera';

type Props = {
    ariaLabel: string;
    closeLabel: string;
    openErrorLabel: string;
};

const MobileNavCameraItem: FC<Props> = ({
    ariaLabel,
    closeLabel,
    openErrorLabel,
}) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const dialogTitleId = useId();

    const { videoRef, isOpen, errorMessage, handleOpen, handleClose } =
        useCamera(openErrorLabel);

    useEffect(() => {
        if (!isOpen) {
            return () => {};
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [handleClose, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return () => {};
        }

        closeButtonRef.current?.focus();

        return () => {};
    }, [isOpen]);

    const dialog = isOpen ? (
        <div
            aria-labelledby={dialogTitleId}
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black"
            role="dialog"
        >
            <h2 className="sr-only" id={dialogTitleId}>
                {ariaLabel}
            </h2>
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            />
            {!errorMessage && (
                <CameraPreviewOverlay
                    closeLabel={closeLabel}
                    onClose={handleClose}
                />
            )}
            {errorMessage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 px-6">
                    <Text
                        variant="body"
                        className="max-w-sm text-center text-white"
                    >
                        {errorMessage}
                    </Text>
                </div>
            )}
        </div>
    ) : null;

    return (
        <>
            <button
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                aria-label={ariaLabel}
                className={cn(
                    'relative z-10 flex touch-manipulation flex-col items-center',
                    'before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:z-0 before:-translate-x-1/2 before:-translate-y-1/2',
                    'before:rounded-mnav-fab before:size-[calc(var(--spacing-mnav-fab)+2px)]',
                    'before:[background-image:var(--tc-gradient-radial)] before:content-[""]',
                )}
                type="button"
                onClick={handleOpen}
            >
                <span
                    className={cn(
                        'bg-primary-lime size-mnav-fab rounded-mnav-fab relative z-10 flex items-center justify-center text-black shadow-md',
                    )}
                >
                    <FontAwesomeIcon
                        aria-hidden
                        className="box-border size-10! shrink-0 overflow-visible"
                        icon={faCamera}
                    />
                </span>
            </button>
            {dialog && typeof document !== 'undefined'
                ? createPortal(dialog, document.body)
                : null}
        </>
    );
};

export default MobileNavCameraItem;
