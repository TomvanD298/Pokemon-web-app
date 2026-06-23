'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import Text from '@/ui/components/Text/Text';

const CameraInformationDetail: FC = () => {
    const t = useTranslations('CameraPreviewOverlay.setDetail');

    return (
        <div className="flex flex-col gap-4">
            <Text
                asChild
                variant="body"
                className="font-heading text-4xl leading-none font-normal text-black"
            >
                <h3>{t('title')}</h3>
            </Text>

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-8 min-w-16 items-center justify-center rounded bg-black px-2">
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0.5 rounded border border-white"
                        />
                        <Text
                            variant="body"
                            className="relative z-10 text-lg font-bold text-white"
                        >
                            {t('setCode')}
                        </Text>
                        <Text
                            variant="body"
                            className="rounded bg-black px-0.5 pt-1 text-xs font-extrabold text-white"
                        >
                            {t('setLang')}
                        </Text>
                    </div>
                    <Text
                        variant="body"
                        className="text-lg font-bold text-black"
                    >
                        {t('cardNumber')}
                    </Text>
                </div>
                <Text
                    variant="body"
                    className="shrink-0 text-right text-lg font-bold text-black"
                >
                    {t('setName')}
                </Text>
            </div>

            <Text
                variant="body"
                className="text-md leading-normal font-medium text-black"
            >
                {t('intro')}
            </Text>

            <div className="text-md space-y-3 leading-normal text-black">
                <p>
                    <Text
                        asChild
                        variant="body"
                        className="text-md font-extrabold text-black"
                    >
                        <span>{t('setCodeLabel')}</span>
                    </Text>{' '}
                    {t('setCodeBody')}
                </p>
                <p>
                    <Text
                        asChild
                        variant="body"
                        className="text-md font-extrabold text-black"
                    >
                        <span>{t('numberLabel')}</span>
                    </Text>{' '}
                    {t('numberBody')}
                </p>
            </div>
        </div>
    );
};

export default CameraInformationDetail;
