import collectionCardDetailsJson from '@/core/data/collection-card-details.json';
import collectionCardsJson from '@/core/data/collection-cards.json';
import newsAndFairsJson from '@/core/data/news-and-fairs.json';
import {
    type CollectionCardDetail,
    type CollectionCardDetailsData,
    collectionCardDetailsDataSchema,
} from '@/core/schemas/collectionCardDetailSchema';
import {
    type CollectionCard,
    type CollectionCardsData,
    collectionCardsDataSchema,
} from '@/core/schemas/collectionCardsSchema';
import {
    type NewsAndFairsData,
    type NewsItem,
    newsAndFairsDataSchema,
} from '@/core/schemas/newsAndFairsSchema';
import publicAssetPath from '@/core/utils/publicAssetPath';

export type CollectionCardDetailView = {
    card: CollectionCard;
    detail: CollectionCardDetail;
};

export const getCollectionCardsData = async (): Promise<CollectionCardsData> =>
    collectionCardsDataSchema.parse({
        ...collectionCardsJson,
        items: collectionCardsJson.items.map(item => ({
            ...item,
            imageSrc: publicAssetPath(item.imageSrc),
        })),
    });

export const getCollectionCardDetailsData =
    async (): Promise<CollectionCardDetailsData> =>
        collectionCardDetailsDataSchema.parse({
            ...collectionCardDetailsJson,
            items: collectionCardDetailsJson.items.map(item => ({
                ...item,
                otherLanguages: item.otherLanguages.map(language => ({
                    ...language,
                    imageSrc: publicAssetPath(language.imageSrc),
                })),
            })),
        });

export const getCollectionCardDetail = async (
    cardId: string,
): Promise<CollectionCardDetailView | null> => {
    const [{ items: cards }, { items: details }] = await Promise.all([
        getCollectionCardsData(),
        getCollectionCardDetailsData(),
    ]);

    const card = cards.find(item => item.id === cardId);

    if (!card) {
        return null;
    }

    const detail = details.find(item => item.cardId === cardId);

    if (!detail) {
        return null;
    }

    return { card, detail };
};

export const getCollectionCardDetailIds = async (): Promise<string[]> => {
    const { items } = await getCollectionCardDetailsData();

    return items.map(item => item.cardId);
};

export const getNewsAndFairsData = async (): Promise<NewsAndFairsData> =>
    newsAndFairsDataSchema.parse({
        ...newsAndFairsJson,
        items: newsAndFairsJson.items.map(item => {
            if (item.category !== 'news') {
                return item;
            }

            const newsItem = item as NewsItem;

            return {
                ...newsItem,
                imageSrc: publicAssetPath(newsItem.imageSrc),
            };
        }),
    });
