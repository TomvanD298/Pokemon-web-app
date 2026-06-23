import type { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import DiscountSticker from '@/ui/components/DiscountSticker/DiscountSticker';
import HomepageCardHeader from '@/ui/components/HomepageCardHeader/HomepageCardHeader';
import Text from '@/ui/components/Text/Text';
import WishlistButton from '@/ui/components/WishlistButton/WishlistButton';

const CARD_IMAGE_SRC = '/images/mock/homepage/card-snorlax.png';

const HomepageBudgetScout: FC = async () => {
    const t = await getTranslations('HomepageBudgetScout');

    return (
        <section
            aria-labelledby="homepage-budget-scout-heading"
            className="bg-primary-pink shadow-drop relative flex h-full min-h-70 w-full min-w-0 flex-col overflow-hidden rounded-2xl px-4 py-8 lg:min-h-0"
        >
            <HomepageCardHeader
                headingId="homepage-budget-scout-heading"
                title={t('title')}
                subtitle={t('subtitle')}
            />
            <Text
                variant="body"
                className="font-heading text-md font-regular py-2 leading-none text-black underline"
            >
                {t('discountPrice')}
            </Text>
            <DiscountSticker
                ariaLabel={t('discountStickerAriaLabel')}
                className="absolute top-4 right-4 z-10 lg:top-2 lg:right-2"
                label={t('discountLabel')}
            />

            <div className="flex min-h-0 flex-1 items-center justify-center lg:min-h-48">
                <img
                    alt={t('cardImageAlt')}
                    src={CARD_IMAGE_SRC}
                    className="absolute -bottom-32 mx-auto max-h-72 w-auto object-contain lg:-bottom-16 lg:max-h-52"
                />
                <WishlistButton
                    ariaLabel={t('wishlist')}
                    className="absolute top-32 right-22 z-10 size-8 px-0 lg:top-16 lg:right-4"
                />
            </div>
        </section>
    );
};

export default HomepageBudgetScout;
