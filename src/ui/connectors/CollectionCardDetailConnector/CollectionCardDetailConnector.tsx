'use client';

import { useTranslations } from 'next-intl';
import { type FC, useMemo } from 'react';
import type { CollectionCardDetailView } from '@/core/services/fetchers';
import CollectionCardDetailHero from '@/ui/components/CollectionCardDetailHero/CollectionCardDetailHero';
import CollectionCardDetailInfo from '@/ui/components/CollectionCardDetailInfo/CollectionCardDetailInfo';
import CollectionCardDetailOtherLanguages from '@/ui/components/CollectionCardDetailOtherLanguages/CollectionCardDetailOtherLanguages';
import CollectionCardDetailQuantities from '@/ui/components/CollectionCardDetailQuantities/CollectionCardDetailQuantities';
import CollectionCardDetailShopLinks from '@/ui/components/CollectionCardDetailShopLinks/CollectionCardDetailShopLinks';

const ENGLISH_SET_FLAG_SRC = '/images/mock/camera-scan/set-flag.png';

const LANGUAGE_FLAGS: Record<'japanese', string> = {
    japanese: '🇯🇵',
};

type Props = {
    view: CollectionCardDetailView;
};

const CollectionCardDetailConnector: FC<Props> = ({ view }) => {
    const t = useTranslations('Pages.collectionDetail');
    const { card, detail } = view;

    const priceHistoryLabels = useMemo(
        () =>
            (['march', 'april', 'may'] as const).map(month =>
                t(`priceHistory.${month}`),
            ),
        [t],
    );

    const otherLanguageCards = useMemo(
        () =>
            detail.otherLanguages.map(language => ({
                flag: LANGUAGE_FLAGS[language.languageLabelKey],
                formattedPrice: `${language.currency}${language.price.toFixed(2)}`,
                id: language.id,
                imageAlt: language.imageAlt,
                imageSrc: language.imageSrc,
                languageLabel: t(`languages.${language.languageLabelKey}`),
            })),
        [detail.otherLanguages, t],
    );

    return (
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 pb-24">
            <CollectionCardDetailHero
                averagePrice={detail.averagePrice}
                averagePriceLabel={t('averagePrice')}
                currency={card.currency}
                imageAlt={card.imageAlt}
                imageSrc={card.imageSrc}
                priceChangePercent={detail.priceChangePercent}
                priceHistory={detail.priceHistory}
                priceHistoryLabels={priceHistoryLabels}
            />

            <CollectionCardDetailInfo
                cardName={card.name}
                cardNumber={detail.cardNumber}
                dexNumberLabel={t('dexNumber', { number: detail.dexNumber })}
                rarity={detail.rarity}
                setCode={detail.setCode}
                setFlagAlt={t('englishFlagAlt')}
                setFlagSrc={ENGLISH_SET_FLAG_SRC}
                setName={card.set}
            />

            <CollectionCardDetailQuantities
                gradedLabel={t('quantities.graded')}
                quantitiesTitle={t('quantities.title')}
                rawLabel={t('quantities.raw')}
                totalLabel={t('quantities.total', { count: 1 })}
            />

            <CollectionCardDetailShopLinks
                links={detail.shopLinks}
                title={t('shop.title')}
                shopLinkAriaLabel={name => t('shop.linkAriaLabel', { name })}
            />

            {otherLanguageCards.length > 0 ? (
                <CollectionCardDetailOtherLanguages
                    cards={otherLanguageCards}
                    title={t('otherLanguages.title')}
                />
            ) : null}
        </div>
    );
};

export default CollectionCardDetailConnector;
