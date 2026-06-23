import type { FC } from 'react';
import Image from 'next/image';
import type { CollectionCard as CollectionCardData } from '@/core/schemas/collectionCardsSchema';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';
import WishlistButton from '@/ui/components/WishlistButton/WishlistButton';

type Props = Pick<
    CollectionCardData,
    'name' | 'set' | 'price' | 'currency' | 'imageSrc' | 'imageAlt' | 'status'
> & {
    priceChangePercent?: number;
    wishlistAriaLabel: string;
};

const formatPrice = (currency: string, price: number): string =>
    `${currency} ${price.toFixed(2)}`;

const formatPriceChangePercent = (percent: number): string => {
    const sign = percent > 0 ? '+' : '';

    return `${sign}${percent}%`;
};

const CollectionCard: FC<Props> = ({
    name,
    set,
    price,
    currency,
    imageSrc,
    imageAlt,
    status,
    priceChangePercent,
    wishlistAriaLabel,
}) => {
    const isWishlist = status === 'wishlist';
    const showPriceChange =
        status === 'collection' && priceChangePercent !== undefined;

    return (
        <article
            className={cn(
                'bg-background-secondary shadow-drop flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl',
            )}
        >
            <div className="relative shrink-0 p-3 pb-0">
                <Image
                    alt={imageAlt}
                    src={imageSrc}
                    width={120}
                    height={160}
                    className="w-full max-w-none object-contain"
                />
                {isWishlist && (
                    <WishlistButton
                        isActive
                        ariaLabel={wishlistAriaLabel}
                        className="absolute top-5 right-5 z-10"
                    />
                )}
            </div>

            <div className="flex shrink-0 flex-col p-4 pt-3">
                <Text
                    variant="body"
                    className="text-md line-clamp-1 font-bold text-black"
                >
                    {name}
                </Text>
                <Text
                    variant="body"
                    className="d line-clamp-2 text-sm leading-snug text-black"
                >
                    {set}
                </Text>
                {showPriceChange ? (
                    <div className="mt-1 flex min-h-7 items-baseline gap-1">
                        <Text
                            variant="body"
                            className="min-w-0 truncate text-lg font-bold text-black"
                        >
                            {formatPrice(currency, price)}
                        </Text>
                        <Text
                            variant="body"
                            className={cn(
                                'shrink-0 text-sm font-semibold whitespace-nowrap',
                                priceChangePercent >= 0
                                    ? 'text-green'
                                    : 'text-red',
                            )}
                        >
                            {formatPriceChangePercent(priceChangePercent)}
                        </Text>
                    </div>
                ) : (
                    <Text
                        variant="body"
                        className="mt-1 truncate text-lg font-bold text-black"
                    >
                        {formatPrice(currency, price)}
                    </Text>
                )}
            </div>
        </article>
    );
};

export default CollectionCard;
