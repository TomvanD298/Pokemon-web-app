import Image from 'next/image';
import type { FC } from 'react';
import Text from '@/ui/components/Text/Text';

type Props = {
    cardName: string;
    cardNumber: string;
    dexNumberLabel: string;
    rarity: string;
    setFlagAlt: string;
    setFlagSrc: string;
    setName: string;
    setCode: string;
};

const CollectionCardDetailInfo: FC<Props> = ({
    cardName,
    cardNumber,
    dexNumberLabel,
    rarity,
    setCode,
    setFlagAlt,
    setFlagSrc,
    setName,
}) => {
    const setLine = `${setName} (${setCode})`;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between gap-3">
                <Text
                    variant="body"
                    className="text-2xl leading-tight font-bold text-black"
                >
                    {cardName}
                </Text>
                <Text
                    variant="body"
                    className="shrink-0 text-right text-sm font-medium text-black"
                >
                    {dexNumberLabel}
                </Text>
            </div>

            <div className="flex items-center gap-1.5">
                <Text variant="body" className="text-md font-light text-black">
                    {setLine}
                </Text>
                <Image
                    alt={setFlagAlt}
                    src={setFlagSrc}
                    width={20}
                    height={12}
                    className="h-3 w-5 shrink-0 object-cover"
                />
            </div>

            <div className="flex items-center gap-2">
                <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-full bg-black"
                />
                <Text variant="body" className="text-md font-medium text-black">
                    {rarity} {cardNumber}
                </Text>
            </div>
        </div>
    );
};

export default CollectionCardDetailInfo;
