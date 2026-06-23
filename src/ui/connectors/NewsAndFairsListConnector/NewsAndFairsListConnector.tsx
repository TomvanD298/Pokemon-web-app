'use client';

import { useTranslations } from 'next-intl';
import { type FC, useMemo, useState } from 'react';
import type { NewsAndFairsItem } from '@/core/schemas/newsAndFairsSchema';
import {
    NEWS_AND_FAIRS_CATEGORY_FILTERS,
    type NewsAndFairsCategoryFilter as NewsAndFairsCategoryFilterId,
} from '@/core/constants/newsAndFairsCategories';
import NewsAndFairsCategoryFilter from '@/ui/components/NewsAndFairsCategoryFilter/NewsAndFairsCategoryFilter';
import NewsAndFairsItemComponent from '@/ui/components/NewsAndFairsItem/NewsAndFairsItem';
import StaggeredEnterItem from '@/ui/components/StaggeredEnterItem/StaggeredEnterItem';

type Props = {
    items: NewsAndFairsItem[];
};

const NewsAndFairsListConnector: FC<Props> = ({ items }) => {
    const t = useTranslations('Pages.news.filter');
    const [activeFilter, setActiveFilter] =
        useState<NewsAndFairsCategoryFilterId>('all');

    const filterOptions = useMemo(
        () =>
            NEWS_AND_FAIRS_CATEGORY_FILTERS.map(filter => ({
                id: filter,
                label: t(filter),
            })),
        [t],
    );

    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') {
            return items;
        }

        return items.filter(item => item.category === activeFilter);
    }, [activeFilter, items]);

    return (
        <div className="mx-auto mt-6 flex w-full max-w-screen-xl flex-col gap-4">
            <NewsAndFairsCategoryFilter
                activeFilter={activeFilter}
                ariaLabel={t('ariaLabel')}
                options={filterOptions}
                onFilterChange={setActiveFilter}
            />
            <ul
                key={activeFilter}
                className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3"
            >
                {filteredItems.map((item, index) => (
                    <li
                        key={item.id}
                        className="min-w-0 last:mb-24 lg:last:mb-0"
                    >
                        <StaggeredEnterItem enterIndex={index}>
                            <NewsAndFairsItemComponent item={item} />
                        </StaggeredEnterItem>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsAndFairsListConnector;
