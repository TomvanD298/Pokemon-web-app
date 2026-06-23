'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import CameraAuthenticityCardComparison from '@/ui/components/CameraAuthenticityCardComparison/CameraAuthenticityCardComparison';
import CameraAuthenticityWhatNow from '@/ui/components/CameraAuthenticityWhatNow/CameraAuthenticityWhatNow';
import Text from '@/ui/components/Text/Text';

type Props = {
    backImageSrc: string;
    frontImageSrc: string;
};

const CameraAuthenticityResult: FC<Props> = ({
    backImageSrc,
    frontImageSrc,
}) => {
    const t = useTranslations('CameraPreviewOverlay.authenticityResult');

    return (
        <div className="flex flex-col gap-4">
            <section className="flex justify-center gap-3">
                <div>
                    <Text
                        variant="h2"
                        className="font-heading text-6xl leading-none font-normal"
                    >
                        <span>{t('title')}</span>
                    </Text>

                    <Text variant="body" className="leading-normal font-medium">
                        {t('intro')}
                    </Text>
                </div>
                <figure className="flex flex-col items-center gap-2">
                    <div className="h-20 w-14 overflow-hidden rounded-lg shadow-md">
                        <img
                            alt=""
                            src={frontImageSrc}
                            className="size-full object-cover"
                        />
                    </div>
                    <Text variant="body" className="text-sm">
                        {t('frontLabel')}
                    </Text>
                </figure>

                <figure className="flex flex-col items-center gap-2">
                    <div className="h-20 w-14 overflow-hidden rounded-lg shadow-md">
                        <img
                            alt=""
                            src={backImageSrc}
                            className="size-full object-cover"
                        />
                    </div>
                    <Text variant="body" className="text-sm">
                        {t('backLabel')}
                    </Text>
                </figure>
            </section>

            <section className="flex flex-col gap-4">
                <Text variant="body" className="text-md leading-normal">
                    {t('details')}
                </Text>

                <CameraAuthenticityCardComparison />
            </section>

            <section className="flex flex-col gap-4 pt-4">
                <Text
                    asChild
                    variant="h2"
                    className="font-heading text-4xl leading-none font-normal text-black"
                >
                    <h3>{t('whatNow')}</h3>
                </Text>

                <CameraAuthenticityWhatNow />
            </section>
        </div>
    );
};

export default CameraAuthenticityResult;
