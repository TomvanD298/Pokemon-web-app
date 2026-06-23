'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import cn from '@/core/utils/cn';
import publicAssetPath from '@/core/utils/publicAssetPath';
import ActionButton from '@/ui/components/ActionButton/ActionButton';
import CameraInformationDetail from '@/ui/components/CameraInformationDetail/CameraInformationDetail';
import CameraInformationHotspot from '@/ui/components/CameraInformationHotspot/CameraInformationHotspot';
import SlideUpPanel from '@/ui/components/SlideUpPanel/SlideUpPanel';
import Text from '@/ui/components/Text/Text';

const MOCK_CARD_PHOTO_SRC = publicAssetPath(
    '/images/mock/camera-scan/psyduck-info.jpeg',
);
const PHOTO_DELAY_MS = 1000;
const BOUNCE_ENTER_MS = 600;
const HOTSPOT_STAGGER_MS = 120;

const INFORMATION_HOTSPOTS = [
    {
        id: 'name',
        left: '32%',
        top: '12%',
        size: 100,
        ariaKey: 'hotspotName',
    },
    {
        id: 'attacks',
        left: '28%',
        top: '55%',
        size: 150,
        ariaKey: 'hotspotAttack',
    },
    {
        id: 'illustrator',
        left: '18%',
        top: '90%',
        size: 100,
        ariaKey: 'hotspotIllustrator',
    },
    {
        id: 'cardNumber',
        left: '80%',
        top: '11%',
        size: 100,
        ariaKey: 'hotspotCardNumber',
    },
] as const;

type HotspotId = (typeof INFORMATION_HOTSPOTS)[number]['id'];

const CameraInformationPanel: FC = () => {
    const t = useTranslations('CameraPreviewOverlay');
    const photoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isCardPlaced, setIsCardPlaced] = useState(false);
    const [isPhotoVisible, setIsPhotoVisible] = useState(false);
    const [selectedHotspotId, setSelectedHotspotId] =
        useState<HotspotId | null>(null);
    const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

    const handleScanCard = useCallback(() => {
        if (photoTimeoutRef.current !== null) {
            return;
        }

        setIsCardPlaced(true);

        photoTimeoutRef.current = setTimeout(() => {
            setIsPhotoVisible(true);
            photoTimeoutRef.current = null;
        }, PHOTO_DELAY_MS);
    }, []);

    const handleHotspotClick = useCallback((hotspotId: HotspotId) => {
        setSelectedHotspotId(currentSelected => {
            const isReselect = currentSelected === hotspotId;

            if (hotspotId === 'illustrator') {
                setIsDetailPanelOpen(isReselect ? previous => !previous : true);
            } else {
                setIsDetailPanelOpen(false);
            }

            return hotspotId;
        });
    }, []);

    const handleCloseDetail = useCallback(() => {
        setIsDetailPanelOpen(false);
    }, []);

    const showsSetDetail =
        isDetailPanelOpen && selectedHotspotId === 'illustrator';

    useEffect(
        () => () => {
            if (photoTimeoutRef.current !== null) {
                clearTimeout(photoTimeoutRef.current);
            }
        },
        [],
    );

    return (
        <section
            aria-labelledby="camera-information-panel"
            className="absolute inset-x-0 top-20 bottom-0 flex flex-col gap-4"
            role="tabpanel"
        >
            <h2 className="sr-only" id="camera-information-panel">
                {t('menuInformation')}
            </h2>

            <div
                className={cn(
                    'relative mx-4 h-[65vh] shrink-0 overflow-hidden rounded-2xl border-4 transition-colors duration-300',
                    isCardPlaced
                        ? 'border-primary-lime border-solid'
                        : 'border-dashed border-white/70',
                )}
            >
                {isPhotoVisible ? (
                    <div
                        className={cn(
                            'size-full opacity-0',
                            'animate-bounce-enter motion-reduce:animate-none motion-reduce:opacity-100',
                        )}
                    >
                        <img
                            alt=""
                            src={MOCK_CARD_PHOTO_SRC}
                            className="size-full scale-160 object-cover"
                        />
                    </div>
                ) : null}

                {INFORMATION_HOTSPOTS.map((hotspot, index) => (
                    <CameraInformationHotspot
                        key={hotspot.id}
                        animationDelay={`${BOUNCE_ENTER_MS + index * HOTSPOT_STAGGER_MS}ms`}
                        ariaLabel={t(hotspot.ariaKey)}
                        isSelected={selectedHotspotId === hotspot.id}
                        isVisible={isPhotoVisible}
                        left={hotspot.left}
                        size={hotspot.size}
                        top={hotspot.top}
                        onClick={() => handleHotspotClick(hotspot.id)}
                    />
                ))}
            </div>

            <SlideUpPanel
                showCloseArrow
                showOpenArrow
                closeAriaLabel={t('closeDetail')}
                isOpen={isDetailPanelOpen}
                isVisible={isPhotoVisible}
                openAriaLabel={t('openDetail')}
                onClose={handleCloseDetail}
            >
                {showsSetDetail ? (
                    <CameraInformationDetail />
                ) : (
                    <Text
                        asChild
                        variant="body"
                        className="font-heading text-center text-4xl leading-tight font-normal text-black"
                    >
                        <p>{t('informationInstruction')}</p>
                    </Text>
                )}
            </SlideUpPanel>

            {!isPhotoVisible ? (
                <ActionButton
                    ariaLabel={t('scanTheCard')}
                    className={cn(
                        'shrink-0',
                        isCardPlaced && 'pointer-events-none mx-4 opacity-50',
                    )}
                    label={t('scanTheCard')}
                    onClick={handleScanCard}
                />
            ) : null}
        </section>
    );
};

export default CameraInformationPanel;
