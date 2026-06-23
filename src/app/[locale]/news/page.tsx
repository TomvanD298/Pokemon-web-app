import type { Locale } from 'next-intl';
import type { FC } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getNewsAndFairsData } from '@/core/services/fetchers';
import PageHeader from '@/ui/components/PageHeader/PageHeader';
import NewsAndFairsListConnector from '@/ui/connectors/NewsAndFairsListConnector/NewsAndFairsListConnector';

type PageProps = {
    params: Promise<{ locale: Locale }>;
};

const NewsPage: FC<PageProps> = async ({ params }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Pages.news');
    const { items } = await getNewsAndFairsData();

    return (
        <section className="bg-primary px-mnav-inline h-full py-6">
            <PageHeader title={t('title')} description={t('description')} />
            <NewsAndFairsListConnector items={items} />
        </section>
    );
};

export default NewsPage;
