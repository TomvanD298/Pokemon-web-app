import { z } from 'zod';

export const collectionCardPriceHistoryPointSchema = z.object({
    price: z.number().nonnegative(),
});

export const collectionCardShopLinkSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    href: z.string().url(),
});

export const collectionCardOtherLanguageSchema = z.object({
    id: z.string().min(1),
    languageLabelKey: z.enum(['japanese']),
    price: z.number().nonnegative(),
    currency: z.string().min(1),
    imageSrc: z.string().min(1),
    imageAlt: z.string().min(1),
});

export const collectionCardDetailSchema = z.object({
    cardId: z.string().min(1),
    averagePrice: z.number().nonnegative(),
    priceChangePercent: z.number(),
    priceHistory: z.array(collectionCardPriceHistoryPointSchema).min(2),
    setCode: z.string().min(1),
    rarity: z.string().min(1),
    cardNumber: z.string().min(1),
    dexNumber: z.string().min(1),
    quantities: z.object({
        raw: z.number().int().nonnegative(),
        graded: z.number().int().nonnegative(),
    }),
    shopLinks: z.array(collectionCardShopLinkSchema),
    otherLanguages: z.array(collectionCardOtherLanguageSchema),
});

export const collectionCardDetailsDataSchema = z.object({
    items: z.array(collectionCardDetailSchema),
});

export type CollectionCardPriceHistoryPoint = z.infer<
    typeof collectionCardPriceHistoryPointSchema
>;
export type CollectionCardShopLink = z.infer<
    typeof collectionCardShopLinkSchema
>;
export type CollectionCardOtherLanguage = z.infer<
    typeof collectionCardOtherLanguageSchema
>;
export type CollectionCardDetail = z.infer<typeof collectionCardDetailSchema>;
export type CollectionCardDetailsData = z.infer<
    typeof collectionCardDetailsDataSchema
>;
