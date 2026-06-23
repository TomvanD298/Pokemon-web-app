import type { Locale } from 'next-intl';
import type { FC } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHeader from '@/ui/components/PageHeader/PageHeader';

type PageProps = {
    params: Promise<{ locale: Locale }>;
};

const CameraPage: FC<PageProps> = async ({ params }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Pages.camera');

    return (
        <section className="px-mnav-inline py-6">
            <PageHeader title={t('title')} description={t('description')} />
        </section>
    );
};

export default CameraPage;
