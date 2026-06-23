import type { Metadata, Viewport } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/core/i18n/routing';
import SearchBar from '@/ui/components/SearchBar/SearchBar';
import MobileBottomNavConnector from '@/ui/connectors/MobileBottomNavConnector/MobileBottomNavConnector';
import { fkScreamerFont, manropeFont } from '@/ui/styles/fonts';
import ClientProviders from '@/app/ClientProviders';
import ServerProviders from '@/app/ServerProviders';

import '@/styles/global.css';

export const generateStaticParams = () =>
    routing.locales.map(locale => ({ locale }));

type LocaleLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
};

export const generateMetadata = async ({
    params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> => {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: {
            template: `%s | ${t('title')}`,
            default: t('title'),
        },
        description: t('description'),
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
    };
};

export const generateViewport = (): Viewport => ({
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'dark light',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#dddddd' },
        { media: '(prefers-color-scheme: dark)', color: '#222222' },
    ],
});

const LocaleLayout = async ({
    children,
    params,
}: Readonly<LocaleLayoutProps>) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const t = await getTranslations('SearchBar');

    return (
        <html
            suppressHydrationWarning
            data-theme="light"
            lang={locale}
            className={`${manropeFont.variable} ${fkScreamerFont.variable}`}
        >
            <body className="bg-background-primary">
                <ServerProviders>
                    <ClientProviders>
                        <div className="bg-background-primary flex min-h-dvh flex-col">
                            <SearchBar clearAriaLabel={t('clearSearch')} />
                            <main className="flex-1 pt-10">{children}</main>
                            <MobileBottomNavConnector />
                        </div>
                    </ClientProviders>
                </ServerProviders>
            </body>
        </html>
    );
};

export default LocaleLayout;
