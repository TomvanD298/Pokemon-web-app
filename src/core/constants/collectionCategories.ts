import type { CollectionCardStatus } from '@/core/schemas/collectionCardsSchema';

export type CollectionCategoryFilter = CollectionCardStatus;

export const COLLECTION_CATEGORY_FILTERS: CollectionCategoryFilter[] = [
    'collection',
    'wishlist',
];
