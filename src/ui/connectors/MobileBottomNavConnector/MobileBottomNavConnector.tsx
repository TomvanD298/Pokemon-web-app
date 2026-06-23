'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/core/i18n/navigation';
import MobileBottomNav from '@/ui/components/MobileBottomNav/MobileBottomNav';

const MobileBottomNavConnector: FC = () => {
    const pathname = usePathname();
    const t = useTranslations('MobileNav');

    return (
        <MobileBottomNav
            account={{
                href: '/account',
                isActive: pathname === '/account',
                label: t('account'),
            }}
            ariaLabel={t('navigation')}
            camera={{
                ariaLabel: t('camera'),
                closeLabel: t('closeCamera'),
                openErrorLabel: t('cameraOpenError'),
            }}
            collection={{
                href: '/collection',
                isActive: pathname === '/collection',
                label: t('collection'),
            }}
            home={{
                href: '/',
                isActive: pathname === '/',
                label: t('home'),
            }}
            news={{
                href: '/news',
                isActive: pathname === '/news',
                label: t('news'),
            }}
        />
    );
};

export default MobileBottomNavConnector;
