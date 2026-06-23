import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import publicAssetPath from '@/core/utils/publicAssetPath';
import HomepageCardHeader from '@/ui/components/HomepageCardHeader/HomepageCardHeader';
import Text from '@/ui/components/Text/Text';

const TRENDING_IMAGE_SRC = publicAssetPath(
    '/images/mock/homepage/chaos-etb.png',
);

const HomepageTrending: FC = async () => {
    const t = await getTranslations('HomepageTrending');

    return (
        <section
            aria-labelledby="homepage-trending-heading"
            className="bg-background-secondary shadow-drop flex h-full w-full min-w-0 flex-col rounded-2xl px-2 py-4"
        >
            <HomepageCardHeader
                headingId="homepage-trending-heading"
                title={t('title')}
                subtitle={t('subtitle')}
            />

            <Text
                variant="h3"
                className="font-manrope mt-1 text-xl leading-tight"
            >
                {t('productName')}
            </Text>

            <img
                alt={t('imageAlt')}
                src={TRENDING_IMAGE_SRC}
                className="mx-auto mt-1 w-full object-contain"
            />
        </section>
    );
};

export default HomepageTrending;
