'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import cn from '@/core/utils/cn';
import CameraAuthenticityPanel from '@/ui/components/CameraAuthenticityPanel/CameraAuthenticityPanel';
import CameraInformationPanel from '@/ui/components/CameraInformationPanel/CameraInformationPanel';
import CameraMenuNav, {
    type CameraMenuItem,
} from '@/ui/components/CameraMenuNav/CameraMenuNav';
import CameraScanningPanel from '@/ui/components/CameraScanningPanel/CameraScanningPanel';

type Props = {
    closeLabel: string;
    onClose: () => void;
};

const CameraPreviewOverlay: FC<Props> = ({ closeLabel, onClose }) => {
    const t = useTranslations('CameraPreviewOverlay');

    const [selectedMenuItem, setSelectedMenuItem] =
        useState<CameraMenuItem>('scanning');

    const menuItems = useMemo(
        () => [
            {
                id: 'scanning' as const,
                label: t('menuScan'),
                ariaLabel: t('menuScanAria'),
            },
            {
                id: 'information' as const,
                label: t('menuInformation'),
                ariaLabel: t('menuInformationAria'),
            },
            {
                id: 'authenticity' as const,
                label: t('menuAuthenticity'),
                ariaLabel: t('menuAuthenticityAria'),
            },
        ],
        [t],
    );

    return (
        <section className="absolute inset-0 z-10">
            <header className="absolute inset-x-0 top-0 z-20 mt-2 h-14 px-4">
                <div
                    className={cn(
                        'flex h-14 w-full items-center justify-center rounded-full px-3',
                        'backdrop-blur-md backdrop-saturate-50',
                        'border border-white/10',
                        'bg-black/10',
                    )}
                >
                    <CameraMenuNav
                        ariaLabel={t('menuNavigation')}
                        closeLabel={closeLabel}
                        items={menuItems}
                        selectedItem={selectedMenuItem}
                        onClose={onClose}
                        onSelect={setSelectedMenuItem}
                    />
                </div>
            </header>

            {selectedMenuItem === 'scanning' && <CameraScanningPanel />}
            {selectedMenuItem === 'information' && <CameraInformationPanel />}
            {selectedMenuItem === 'authenticity' && <CameraAuthenticityPanel />}
        </section>
    );
};

export default CameraPreviewOverlay;
