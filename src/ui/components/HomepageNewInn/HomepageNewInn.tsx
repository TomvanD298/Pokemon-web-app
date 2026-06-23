import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import publicAssetPath from '@/core/utils/publicAssetPath';
import ActionLink from '@/ui/components/ActionLink/ActionLink';
import Text from '@/ui/components/Text/Text';

const NEW_IN_IMAGE_SRC = publicAssetPath(
    '/images/mock/homepage/ascended-etb.png',
);
const POCKETGAMES_URL = 'https://pocketgames.nl';

const HomepageNewInn: FC = async () => {
    const t = await getTranslations('HomepageNewInn');

    return (
        <section
            aria-labelledby="homepage-new-inn-heading"
            className="bg-background-secondary shadow-drop flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl"
        >
            <div className="relative flex min-h-0 flex-1 flex-col">
                <div className="mb-40 flex flex-col px-6 pt-8 pb-4 sm:px-8 sm:pt-10 lg:mb-48">
                    <Text
                        id="homepage-new-inn-heading"
                        variant="h2"
                        className="font-heading text-3xl leading-none font-medium uppercase sm:text-4xl"
                    >
                        {t('subheading')}
                    </Text>

                    <Text
                        variant="h2"
                        className="font-heading mt-2 text-5xl leading-none font-medium uppercase sm:text-6xl"
                    >
                        {t('productName')}
                    </Text>

                    <ActionLink
                        ariaLabel={t('ctaAriaLabel')}
                        className="mt-6 self-start"
                        href={POCKETGAMES_URL}
                        label={t('cta')}
                    />
                </div>

                <img
                    alt={t('imageAlt')}
                    src={NEW_IN_IMAGE_SRC}
                    className="absolute -right-10 -bottom-40 max-h-80 w-full object-contain object-bottom lg:-right-10 lg:max-h-96"
                />
            </div>
        </section>
    );
};

export default HomepageNewInn;
