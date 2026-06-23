import type { Locale } from 'next-intl';
import type { FC } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHeader from '@/ui/components/PageHeader/PageHeader';
import AccountPageConnector from '@/ui/connectors/AccountPageConnector/AccountPageConnector';

type PageProps = {
    params: Promise<{ locale: Locale }>;
};

const AccountPage: FC<PageProps> = async ({ params }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Pages.account');

    return (
        <section className="bg-primary px-mnav-inline h-full py-6">
            <PageHeader title={t('title')} description={t('description')} />
            <AccountPageConnector />
        </section>
    );
};

export default AccountPage;
