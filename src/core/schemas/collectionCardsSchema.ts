import { z } from 'zod';

export const collectionCardStatusSchema = z.enum(['collection', 'wishlist']);

export const collectionCardConditionSchema = z.enum(['raw', 'graded']);

const collectionCardBaseSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    set: z.string().min(1),
    price: z.number().nonnegative(),
    currency: z.string().min(1),
    imageSrc: z.string().min(1),
    imageAlt: z.string().min(1),
    condition: collectionCardConditionSchema,
});

export const collectionOwnedCardSchema = collectionCardBaseSchema.extend({
    status: z.literal('collection'),
    priceChangePercent: z.number(),
});

export const collectionWishlistCardSchema = collectionCardBaseSchema.extend({
    status: z.literal('wishlist'),
});

export const collectionCardSchema = z.discriminatedUnion('status', [
    collectionOwnedCardSchema,
    collectionWishlistCardSchema,
]);

export const collectionCardsDataSchema = z.object({
    items: z.array(collectionCardSchema),
});

export type CollectionCardStatus = z.infer<typeof collectionCardStatusSchema>;
export type CollectionCardCondition = z.infer<
    typeof collectionCardConditionSchema
>;
export type CollectionOwnedCard = z.infer<typeof collectionOwnedCardSchema>;
export type CollectionWishlistCard = z.infer<
    typeof collectionWishlistCardSchema
>;
export type CollectionCard = z.infer<typeof collectionCardSchema>;
export type CollectionCardsData = z.infer<typeof collectionCardsDataSchema>;
