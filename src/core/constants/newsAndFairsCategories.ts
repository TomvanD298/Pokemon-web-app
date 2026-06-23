import type { NewsAndFairsItem } from '@/core/schemas/newsAndFairsSchema';

export type NewsAndFairsCategoryFilter = 'all' | NewsAndFairsItem['category'];

export const NEWS_AND_FAIRS_CATEGORY_FILTERS: NewsAndFairsCategoryFilter[] = [
    'all',
    'news',
    'fairs',
    'education',
];
