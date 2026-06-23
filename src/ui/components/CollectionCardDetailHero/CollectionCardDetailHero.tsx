import type { FC } from 'react';
import Image from 'next/image';
import type { CollectionCardPriceHistoryPoint } from '@/core/schemas/collectionCardDetailSchema';
import cn from '@/core/utils/cn';
import CollectionCardDetailPriceChart from '@/ui/components/CollectionCardDetailPriceChart/CollectionCardDetailPriceChart';
import Text from '@/ui/components/Text/Text';

type Props = {
    averagePriceLabel: string;
    currency: string;
    imageAlt: string;
    imageSrc: string;
    averagePrice: number;
    priceChangePercent: number;
    priceHistory: CollectionCardPriceHistoryPoint[];
    priceHistoryLabels: string[];
};

const formatPrice = (currency: string, price: number): string =>
    `${currency} ${price.toFixed(2)}`;

const formatPriceChangePercent = (percent: number): string => {
    const sign = percent > 0 ? '+' : '';

    return `${sign}${percent.toFixed(2)}%`;
};

const CollectionCardDetailHero: FC<Props> = ({
    averagePrice,
    averagePriceLabel,
    currency,
    imageAlt,
    imageSrc,
    priceChangePercent,
    priceHistory,
    priceHistoryLabels,
}) => (
    <div className="grid grid-cols-2 gap-3">
        <Image
            alt={imageAlt}
            src={imageSrc}
            width={120}
            height={160}
            className="w-full max-w-none object-contain"
        />

        <div className="flex min-w-0 flex-col items-end gap-2">
            <div>
                <Text
                    variant="body"
                    className="text-end text-sm font-medium text-black"
                >
                    {averagePriceLabel}
                </Text>
                <div className="flex flex-row items-end gap-2">
                    <Text
                        variant="body"
                        className={cn(
                            'text-sm font-semibold',
                            priceChangePercent >= 0 ? 'text-green' : 'text-red',
                        )}
                    >
                        {formatPriceChangePercent(priceChangePercent)}
                    </Text>
                    <Text
                        variant="body"
                        className="text-2xl leading-tight font-bold text-black"
                    >
                        {formatPrice(currency, averagePrice)}
                    </Text>
                </div>
            </div>

            <CollectionCardDetailPriceChart
                currency={currency}
                points={priceHistory}
                pointLabels={priceHistoryLabels}
            />
        </div>
    </div>
);

export default CollectionCardDetailHero;
