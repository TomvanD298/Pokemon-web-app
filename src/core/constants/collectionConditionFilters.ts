import type { CollectionCardCondition } from '@/core/schemas/collectionCardsSchema';

export type CollectionConditionFilter = 'all' | CollectionCardCondition;

export const COLLECTION_CONDITION_FILTERS: CollectionConditionFilter[] = [
    'all',
    'graded',
    'raw',
];
