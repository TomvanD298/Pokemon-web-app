'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import cn from '@/core/utils/cn';
import ActionButton from '@/ui/components/ActionButton/ActionButton';
import CameraAuthenticityResult from '@/ui/components/CameraAuthenticityResult/CameraAuthenticityResult';
import SlideUpPanel from '@/ui/components/SlideUpPanel/SlideUpPanel';
import Text from '@/ui/components/Text/Text';

const MOCK_FRONT_PHOTO_SRC = '/images/mock/camera-scan/psyduck-info.jpeg';
const MOCK_BACK_PHOTO_SRC = '/images/mock/camera-scan/back-card.jpeg';
const SCAN_DELAY_MS = 1000;

type AuthenticityStep = 'front' | 'back' | 'result';

const CameraAuthenticityPanel: FC = () => {
    const t = useTranslations('CameraPreviewOverlay');
    const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [step, setStep] = useState<AuthenticityStep>('front');
    const [isScanningFront, setIsScanningFront] = useState(false);
    const [isScanningBack, setIsScanningBack] = useState(false);
    const [isFrontThumbnailVisible, setIsFrontThumbnailVisible] =
        useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const isScanning = isScanningFront || isScanningBack;
    const showsFullFrontPhoto = isScanningFront;
    const showsFullBackPhoto = isScanningBack;
    const showsFrontThumbnail =
        step === 'back' && isFrontThumbnailVisible && !isScanningBack;

    const handleContinue = useCallback(() => {
        if (scanTimeoutRef.current !== null) {
            return;
        }

        if (step === 'front' && !isScanningFront) {
            setIsScanningFront(true);

            scanTimeoutRef.current = setTimeout(() => {
                setIsScanningFront(false);
                setIsFrontThumbnailVisible(true);
                setStep('back');
                scanTimeoutRef.current = null;
            }, SCAN_DELAY_MS);

            return;
        }

        if (step === 'back' && !isScanningBack) {
            setIsScanningBack(true);

            scanTimeoutRef.current = setTimeout(() => {
                setIsScanningBack(false);
                setIsFrontThumbnailVisible(false);
                setStep('result');
                setIsPanelOpen(true);
                scanTimeoutRef.current = null;
            }, SCAN_DELAY_MS);
        }
    }, [isScanningBack, isScanningFront, step]);

    const handleClosePanel = useCallback(() => {
        setIsPanelOpen(false);
    }, []);

    const handleOpenPanel = useCallback(() => {
        setIsPanelOpen(true);
    }, []);

    const instructionKey =
        step === 'front' ? 'authenticityScanFront' : 'authenticityScanBack';

    const showsInstruction = step === 'front' || step === 'back';

    useEffect(
        () => () => {
            if (scanTimeoutRef.current !== null) {
                clearTimeout(scanTimeoutRef.current);
            }
        },
        [],
    );

    return (
        <>
            <section
                aria-labelledby="camera-authenticity-panel"
                className="absolute inset-x-0 top-20 bottom-0 flex flex-col gap-4"
                role="tabpanel"
            >
                <h2 className="sr-only" id="camera-authenticity-panel">
                    {t('menuAuthenticity')}
                </h2>

                <div
                    className={cn(
                        'relative mx-4 h-[60vh] shrink-0 overflow-hidden rounded-2xl border-4 transition-colors duration-300',
                        isScanning
                            ? 'border-primary-lime border-solid'
                            : 'border-dashed border-white/70',
                    )}
                >
                    {showsFullFrontPhoto ? (
                        <div
                            className={cn(
                                'size-full opacity-0',
                                'animate-bounce-enter motion-reduce:animate-none motion-reduce:opacity-100',
                            )}
                        >
                            <img
                                alt=""
                                src={MOCK_FRONT_PHOTO_SRC}
                                className="size-full scale-160 object-cover"
                            />
                        </div>
                    ) : null}

                    {showsFullBackPhoto ? (
                        <div
                            className={cn(
                                'size-full opacity-0',
                                'animate-bounce-enter motion-reduce:animate-none motion-reduce:opacity-100',
                            )}
                        >
                            <img
                                alt=""
                                src={MOCK_BACK_PHOTO_SRC}
                                className="size-full scale-160 object-cover"
                            />
                        </div>
                    ) : null}

                    {showsFrontThumbnail ? (
                        <div
                            className={cn(
                                'border-primary-lime absolute bottom-3 left-3 z-10 h-32 w-24 overflow-hidden rounded-lg border-2 shadow-md',
                                'animate-bounce-enter opacity-0 motion-reduce:animate-none motion-reduce:opacity-100',
                            )}
                        >
                            <img
                                alt=""
                                src={MOCK_FRONT_PHOTO_SRC}
                                className="size-full object-cover"
                            />
                        </div>
                    ) : null}
                </div>

                {step !== 'result' ? (
                    <ActionButton
                        ariaLabel={t('authenticityContinue')}
                        className={cn(
                            'shrink-0',
                            isScanning && 'pointer-events-none opacity-50',
                        )}
                        label={t('authenticityContinue')}
                        onClick={handleContinue}
                    />
                ) : null}
            </section>

            <SlideUpPanel
                showCloseArrow
                showOpenArrow
                closeAriaLabel={t('closePanel')}
                isOpen={isPanelOpen}
                openAriaLabel={t('openPanel')}
                onClose={handleClosePanel}
                onOpen={handleOpenPanel}
            >
                {step === 'result' ? (
                    <CameraAuthenticityResult
                        backImageSrc={MOCK_BACK_PHOTO_SRC}
                        frontImageSrc={MOCK_FRONT_PHOTO_SRC}
                    />
                ) : showsInstruction ? (
                    <Text
                        asChild
                        variant="body"
                        className="font-heading text-center text-4xl leading-tight font-normal text-black"
                    >
                        <p>{t(instructionKey)}</p>
                    </Text>
                ) : null}
            </SlideUpPanel>
        </>
    );
};

export default CameraAuthenticityPanel;
