'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import cn from '@/core/utils/cn';
import Button from '@/ui/components/Button/Button';
import CameraScanModal from '@/ui/components/CameraScanModal/CameraScanModal';
import SlideUpPanel from '@/ui/components/SlideUpPanel/SlideUpPanel';
import Text from '@/ui/components/Text/Text';

const SCAN_MODAL_DELAY_MS = 1000;

const CameraScanningPanel: FC = () => {
    const t = useTranslations('CameraPreviewOverlay');
    const scanModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [isCardPlaced, setIsCardPlaced] = useState(false);
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [isScanPanelOpen, setIsScanPanelOpen] = useState(false);

    const handlePlaceBetweenLines = useCallback(() => {
        if (scanModalTimeoutRef.current !== null) {
            return;
        }

        setIsCardPlaced(true);

        scanModalTimeoutRef.current = setTimeout(() => {
            setIsScanModalOpen(true);
            scanModalTimeoutRef.current = null;
        }, SCAN_MODAL_DELAY_MS);
    }, []);

    const handleCloseScanModal = useCallback(() => {
        setIsScanModalOpen(false);
        setIsCardPlaced(false);
    }, []);

    const handleClosePanel = useCallback(() => {
        setIsScanPanelOpen(false);
    }, []);

    const handleOpenPanel = useCallback(() => {
        setIsScanPanelOpen(true);
    }, []);

    useEffect(
        () => () => {
            if (scanModalTimeoutRef.current !== null) {
                clearTimeout(scanModalTimeoutRef.current);
            }
        },
        [],
    );

    return (
        <>
            <section
                aria-labelledby="camera-scanning-panel"
                className="absolute inset-x-0 top-20 bottom-0 flex flex-col gap-2"
                role="tabpanel"
            >
                <h2 className="sr-only" id="camera-scanning-panel">
                    {t('menuScan')}
                </h2>

                <div
                    className={cn(
                        'relative mx-4 h-[60vh] shrink-0 overflow-hidden rounded-2xl border-4 transition-colors duration-300',
                        isCardPlaced
                            ? 'border-primary-lime border-solid'
                            : 'border-dashed border-white/70',
                    )}
                />

                <Button
                    type="button"
                    className="mx-4 h-16 shrink-0 rounded-2xl bg-white/70"
                    disabled={isCardPlaced}
                    onClick={handlePlaceBetweenLines}
                >
                    <Text variant="body" className="text-center text-black">
                        {t('placeBetweenLines')}
                    </Text>
                </Button>
            </section>

            <SlideUpPanel
                showCloseArrow
                showOpenArrow
                closeAriaLabel={t('closePanel')}
                isOpen={isScanPanelOpen}
                openAriaLabel={t('openPanel')}
                onClose={handleClosePanel}
                onOpen={handleOpenPanel}
            >
                <Text
                    asChild
                    variant="body"
                    className="font-heading text-center text-4xl leading-tight font-normal text-black"
                >
                    <p>{t('recentScans')}</p>
                </Text>
            </SlideUpPanel>

            <CameraScanModal
                isOpen={isScanModalOpen}
                onClose={handleCloseScanModal}
            />
        </>
    );
};

export default CameraScanningPanel;
