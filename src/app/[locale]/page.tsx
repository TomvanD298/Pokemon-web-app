import type { Locale } from 'next-intl';
import type { FC } from 'react';
import { setRequestLocale } from 'next-intl/server';
import HomepageBudgetScout from '@/ui/components/HomepageBudgetScout/HomepageBudgetScout';
import HomepageCarousel from '@/ui/components/HomepageCarousel/HomepageCarousel';
import HomepageCollection from '@/ui/components/HomepageCollection/HomepageCollection';
import HomepageGridItem from '@/ui/components/HomepageGridItem/HomepageGridItem';
import HomepageNewInn from '@/ui/components/HomepageNewInn/HomepageNewInn';
import HomepageTrending from '@/ui/components/HomepageTrending/HomepageTrending';

type PageProps = {
    params: Promise<{ locale: Locale }>;
};

const HomePage: FC<PageProps> = async ({ params }) => {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <section className="mx-auto mt-10 mb-24 grid w-full max-w-screen-xl grid-cols-2 gap-2 px-2 py-2 lg:mb-6 lg:grid-cols-3 lg:gap-4">
            <HomepageGridItem columnSpan={2} columnSpanLg={3} enterIndex={0}>
                <HomepageCollection />
            </HomepageGridItem>
            <HomepageGridItem columnSpan={1} columnSpanLg={1} enterIndex={1}>
                <HomepageCarousel />
            </HomepageGridItem>
            <HomepageGridItem columnSpan={1} columnSpanLg={1} enterIndex={2}>
                <HomepageTrending />
            </HomepageGridItem>
            <HomepageGridItem columnSpan={2} columnSpanLg={1} enterIndex={3}>
                <HomepageNewInn />
            </HomepageGridItem>
            <HomepageGridItem columnSpan={2} columnSpanLg={1} enterIndex={4}>
                <HomepageBudgetScout />
            </HomepageGridItem>
        </section>
    );
};

export default HomePage;
