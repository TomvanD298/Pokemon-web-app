import type { FC } from 'react';
import Image from 'next/image';
import Text from '@/ui/components/Text/Text';

type Props = {
    flag: string;
    formattedPrice: string;
    imageAlt: string;
    imageSrc: string;
    languageLabel: string;
};

const CollectionCardDetailLanguageCard: FC<Props> = ({
    flag,
    formattedPrice,
    imageAlt,
    imageSrc,
    languageLabel,
}) => (
    <article className="flex max-w-28 flex-col gap-2">
        <Image
            alt={imageAlt}
            src={imageSrc}
            width={100}
            height={100}
            className="w-full max-w-none"
        />

        <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
                <span aria-hidden className="text-base leading-none">
                    {flag}
                </span>
                <Text variant="body" className="text-sm font-bold text-black">
                    {languageLabel}
                </Text>
            </div>
            <Text variant="body" className="text-sm font-bold text-black">
                {formattedPrice}
            </Text>
        </div>
    </article>
);

export default CollectionCardDetailLanguageCard;
