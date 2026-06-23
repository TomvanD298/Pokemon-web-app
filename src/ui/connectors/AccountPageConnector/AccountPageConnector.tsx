'use client';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faBell,
    faCircleQuestion,
    faCreditCard,
    faShieldHalved,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { type FC, useMemo } from 'react';
import AccountLogoutButton from '@/ui/components/AccountLogoutButton/AccountLogoutButton';
import AccountMenuItem from '@/ui/components/AccountMenuItem/AccountMenuItem';
import AccountProfileCard from '@/ui/components/AccountProfileCard/AccountProfileCard';
import CollectionStatsGrid, {
    type CollectionStat,
} from '@/ui/components/CollectionStatsGrid/CollectionStatsGrid';
import StaggeredEnterItem from '@/ui/components/StaggeredEnterItem/StaggeredEnterItem';

const ACCOUNT_PROFILE = {
    displayName: 'Trainer 151',
    email: 'trainer151@voorbeeld.nl',
    cardCount: '247',
    memberSince: 'September 2025',
} as const;

const ACCOUNT_STATS_VALUES = {
    totalScans: '314',
    totalValue: '€1172.42',
} as const;

type AccountMenuItemConfig = {
    href: string;
    icon: IconProp;
    subtitleKey:
        | 'editProfile'
        | 'notifications'
        | 'privacy'
        | 'payments'
        | 'help';
};

const ACCOUNT_MENU_ITEMS: AccountMenuItemConfig[] = [
    {
        href: '#',
        icon: faUser,
        subtitleKey: 'editProfile',
    },
    {
        href: '#',
        icon: faBell,
        subtitleKey: 'notifications',
    },
    {
        href: '#',
        icon: faShieldHalved,
        subtitleKey: 'privacy',
    },
    {
        href: '#',
        icon: faCreditCard,
        subtitleKey: 'payments',
    },
    {
        href: '#',
        icon: faCircleQuestion,
        subtitleKey: 'help',
    },
];

const AccountPageConnector: FC = () => {
    const t = useTranslations('Pages.account');

    const badges = useMemo(
        () => [
            t('profile.cardCount', { count: ACCOUNT_PROFILE.cardCount }),
            t('profile.memberSince', { date: ACCOUNT_PROFILE.memberSince }),
        ],
        [t],
    );

    const stats = useMemo(
        (): CollectionStat[] => [
            {
                id: 'totalScans',
                label: t('stats.totalScans'),
                value: ACCOUNT_STATS_VALUES.totalScans,
            },
            {
                id: 'totalValue',
                label: t('stats.totalValue'),
                value: ACCOUNT_STATS_VALUES.totalValue,
            },
        ],
        [t],
    );

    const menuEnterOffset = 2;

    return (
        <div className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col gap-4 pb-24">
            <StaggeredEnterItem enterIndex={0}>
                <AccountProfileCard
                    avatarAriaLabel={t('profile.avatarAriaLabel')}
                    badges={badges}
                    displayName={ACCOUNT_PROFILE.displayName}
                    email={ACCOUNT_PROFILE.email}
                />
            </StaggeredEnterItem>

            <StaggeredEnterItem enterIndex={1}>
                <CollectionStatsGrid stats={stats} />
            </StaggeredEnterItem>

            <nav
                aria-label={t('menu.ariaLabel')}
                className="flex flex-col gap-2"
            >
                {ACCOUNT_MENU_ITEMS.map((item, index) => (
                    <StaggeredEnterItem
                        key={item.subtitleKey}
                        enterIndex={menuEnterOffset + index}
                    >
                        <AccountMenuItem
                            href={item.href}
                            icon={item.icon}
                            subtitle={t(`menu.${item.subtitleKey}.subtitle`)}
                            title={t(`menu.${item.subtitleKey}.title`)}
                        />
                    </StaggeredEnterItem>
                ))}
            </nav>

            <StaggeredEnterItem
                enterIndex={menuEnterOffset + ACCOUNT_MENU_ITEMS.length}
            >
                <AccountLogoutButton label={t('logout')} />
            </StaggeredEnterItem>
        </div>
    );
};

export default AccountPageConnector;
