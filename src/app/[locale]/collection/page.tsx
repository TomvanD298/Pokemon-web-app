import type { Locale } from 'next-intl';
import type { FC } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
    getCollectionCardDetailIds,
    getCollectionCardsData,
} from '@/core/services/fetchers';
import PageHeader from '@/ui/components/PageHeader/PageHeader';
import CollectionListConnector from '@/ui/connectors/CollectionListConnector/CollectionListConnector';

type PageProps = {
    params: Promise<{ locale: Locale }>;
};

const CollectionPage: FC<PageProps> = async ({ params }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Pages.collection');
    const [{ items }, detailCardIds] = await Promise.all([
        getCollectionCardsData(),
        getCollectionCardDetailIds(),
    ]);

    return (
        <section className="bg-primary px-mnav-inline h-full py-6">
            <PageHeader title={t('title')} description={t('description')} />
            <CollectionListConnector
                detailCardIds={detailCardIds}
                items={items}
            />
        </section>
    );
};

export default CollectionPage;
