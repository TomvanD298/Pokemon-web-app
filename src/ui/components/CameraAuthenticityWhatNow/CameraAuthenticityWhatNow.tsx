'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import Text from '@/ui/components/Text/Text';

const WHAT_NOW_ITEM_KEYS = [
    'whatNowOnline',
    'whatNowFair',
    'whatNowTrade',
    'whatNowTip',
] as const;

const CameraAuthenticityWhatNow: FC = () => {
    const t = useTranslations('CameraPreviewOverlay.authenticityResult');

    return (
        <ul className="list-disc space-y-4 pl-5 text-md leading-normal text-black">
            {WHAT_NOW_ITEM_KEYS.map(itemKey => (
                <li key={itemKey}>
                    <Text
                        asChild
                        variant="body"
                        className="text-md font-extrabold text-black"
                    >
                        <span>{t(`${itemKey}Label`)}</span>
                    </Text>{' '}
                    {t(`${itemKey}Body`)}
                </li>
            ))}
        </ul>
    );
};

export default CameraAuthenticityWhatNow;
