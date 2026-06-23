'use client';

import { useTranslations } from 'next-intl';
import { type FC, useMemo, useState } from 'react';
import type { CollectionCard as CollectionCardItem } from '@/core/schemas/collectionCardsSchema';
import {
    COLLECTION_CATEGORY_FILTERS,
    type CollectionCategoryFilter,
} from '@/core/constants/collectionCategories';
import {
    COLLECTION_CONDITION_FILTERS,
    type CollectionConditionFilter,
} from '@/core/constants/collectionConditionFilters';
import { Link } from '@/core/i18n/navigation';
import CollectionCardComponent from '@/ui/components/CollectionCard/CollectionCard';
import CollectionCategoryFilterComponent from '@/ui/components/CollectionCategoryFilter/CollectionCategoryFilter';
import CollectionConditionFilterComponent from '@/ui/components/CollectionConditionFilter/CollectionConditionFilter';
import CollectionStatsGrid, {
    type CollectionStat,
} from '@/ui/components/CollectionStatsGrid/CollectionStatsGrid';

const COLLECTION_STATS_VALUES = {
    totalCards: '247',
    totalValue: '€1172.42',
    sets: '6',
    graded: '2',
} as const;

type Props = {
    detailCardIds: string[];
    items: CollectionCardItem[];
};

const CollectionListConnector: FC<Props> = ({ detailCardIds, items }) => {
    const t = useTranslations('Pages.collection');
    const tFilter = useTranslations('Pages.collection.filter');
    const tConditionFilter = useTranslations(
        'Pages.collection.conditionFilter',
    );
    const [activeFilter, setActiveFilter] =
        useState<CollectionCategoryFilter>('collection');
    const [activeConditionFilter, setActiveConditionFilter] =
        useState<CollectionConditionFilter>('all');

    const filterOptions = useMemo(
        () =>
            COLLECTION_CATEGORY_FILTERS.map(filter => ({
                id: filter,
                label: tFilter(filter),
            })),
        [tFilter],
    );

    const conditionFilterOptions = useMemo(
        () =>
            COLLECTION_CONDITION_FILTERS.map(filter => ({
                id: filter,
                label: tConditionFilter(filter),
            })),
        [tConditionFilter],
    );

    const filteredItems = useMemo(() => {
        const statusFiltered = items.filter(
            item => item.status === activeFilter,
        );

        if (activeConditionFilter === 'all') {
            return statusFiltered;
        }

        return statusFiltered.filter(
            item => item.condition === activeConditionFilter,
        );
    }, [activeConditionFilter, activeFilter, items]);

    const handleCategoryFilterChange = (filter: CollectionCategoryFilter) => {
        setActiveFilter(filter);
        setActiveConditionFilter('all');
    };

    const stats = useMemo(
        (): CollectionStat[] => [
            {
                id: 'totalCards',
                label: t('stats.totalCards'),
                value: COLLECTION_STATS_VALUES.totalCards,
            },
            {
                id: 'totalValue',
                label: t('stats.totalValue'),
                value: COLLECTION_STATS_VALUES.totalValue,
            },
            {
                id: 'sets',
                label: t('stats.sets'),
                value: COLLECTION_STATS_VALUES.sets,
            },
            {
                id: 'graded',
                label: t('stats.graded'),
                value: COLLECTION_STATS_VALUES.graded,
            },
        ],
        [t],
    );

    const isCollectionView = activeFilter === 'collection';

    return (
        <div className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col justify-center gap-4">
            <CollectionCategoryFilterComponent
                activeFilter={activeFilter}
                ariaLabel={tFilter('ariaLabel')}
                options={filterOptions}
                onFilterChange={handleCategoryFilterChange}
            />
            {isCollectionView ? <CollectionStatsGrid stats={stats} /> : null}
            <CollectionConditionFilterComponent
                activeFilter={activeConditionFilter}
                advancedFiltersLabel={tConditionFilter('advanced')}
                ariaLabel={tConditionFilter('ariaLabel')}
                options={conditionFilterOptions}
                onFilterChange={setActiveConditionFilter}
            />
            <ul className="mb-24 grid w-full grid-cols-2 items-stretch gap-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map(item => {
                    const card = (
                        <CollectionCardComponent
                            currency={item.currency}
                            imageAlt={item.imageAlt}
                            imageSrc={item.imageSrc}
                            name={item.name}
                            price={item.price}
                            set={item.set}
                            status={item.status}
                            wishlistAriaLabel={t('wishlistButton')}
                            priceChangePercent={
                                item.status === 'collection'
                                    ? item.priceChangePercent
                                    : undefined
                            }
                        />
                    );

                    const hasDetailPage = detailCardIds.includes(item.id);

                    return (
                        <li key={item.id} className="flex min-h-0 w-full">
                            {hasDetailPage ? (
                                <Link
                                    href={`/collection/${item.id}`}
                                    className="block h-full w-full min-h-0 outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-2xl"
                                >
                                    {card}
                                </Link>
                            ) : (
                                card
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CollectionListConnector;
