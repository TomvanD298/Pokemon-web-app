import type { Locale } from 'next-intl';
import type { FC } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/core/i18n/routing';
import {
    getCollectionCardDetail,
    getCollectionCardDetailIds,
} from '@/core/services/fetchers';
import PageBackLink from '@/ui/components/PageBackLink/PageBackLink';
import CollectionCardDetailConnector from '@/ui/connectors/CollectionCardDetailConnector/CollectionCardDetailConnector';

type PageProps = {
    params: Promise<{ cardId: string; locale: Locale }>;
};

export const generateStaticParams = async () => {
    const cardIds = await getCollectionCardDetailIds();

    return routing.locales.flatMap(locale =>
        cardIds.map(cardId => ({ locale, cardId })),
    );
};

const CollectionCardDetailPage: FC<PageProps> = async ({ params }) => {
    const { cardId, locale } = await params;
    setRequestLocale(locale);

    const [view, t] = await Promise.all([
        getCollectionCardDetail(cardId),
        getTranslations('Pages.collectionDetail'),
    ]);

    if (!view) {
        notFound();
    }

    return (
        <>
            <section className="bg-primary px-mnav-inline h-full pt-10 pb-6">
                <PageBackLink href="/collection" label={t('back')} />
                <CollectionCardDetailConnector view={view} />
            </section>
        </>
    );
};

export default CollectionCardDetailPage;
