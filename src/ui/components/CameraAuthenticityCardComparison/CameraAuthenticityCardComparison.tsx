'use client';

import type { FC } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import publicAssetPath from '@/core/utils/publicAssetPath';
import Text from '@/ui/components/Text/Text';

const CARD_HP_IMAGE_SRC = publicAssetPath(
    '/images/mock/camera-scan/card-hp.jpg',
);

const CameraAuthenticityCardComparison: FC = () => {
    const t = useTranslations('CameraPreviewOverlay.authenticityResult');

    return (
        <div className="bg-primary-pink flex items-center justify-between rounded-2xl p-4">
            <figure className="flex max-w-1/3 flex-col items-center gap-2">
                <div className="w-full overflow-hidden rounded-lg">
                    <img
                        alt=""
                        src={CARD_HP_IMAGE_SRC}
                        className="h-auto w-full object-cover"
                    />
                </div>
                <Text
                    variant="body"
                    className="text-center text-sm leading-tight text-black"
                >
                    {t('scannedCardCaption')}
                </Text>
            </figure>

            <FontAwesomeIcon
                aria-hidden
                className="size-6 shrink-0 text-black"
                icon={faArrowRight}
            />

            <figure className="flex max-w-1/3 flex-col items-center gap-2">
                <Text
                    variant="h2"
                    className="font-heading text-5xl leading-none font-normal text-black"
                >
                    <span>{t('hpLabel')}</span>
                    <span>{t('hpValue')}</span>
                </Text>

                <Text
                    variant="body"
                    className="text-center text-sm leading-tight text-black"
                >
                    {t('officialFontCaption')}
                </Text>
            </figure>
        </div>
    );
};

export default CameraAuthenticityCardComparison;
