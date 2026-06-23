import type { FC } from 'react';
import Text from '@/ui/components/Text/Text';

type Props = {
    gradedLabel: string;
    quantitiesTitle: string;
    rawLabel: string;
    totalLabel: string;
};

const RAW_QUANTITY = 1;
const GRADED_QUANTITY = 0;

const CollectionCardDetailQuantities: FC<Props> = ({
    gradedLabel,
    quantitiesTitle,
    rawLabel,
    totalLabel,
}) => (
    <section className="flex flex-col gap-4 border-t border-black/10 pt-4">
        <div className="flex items-center justify-between gap-3">
            <Text variant="body" className="text-lg font-bold text-black">
                {quantitiesTitle}
            </Text>
            <Text variant="body" className="text-sm font-light text-black">
                {totalLabel}
            </Text>
        </div>

        <div className="flex flex-col gap-3">
            <div className="flex w-full items-center">
                <Text
                    variant="body"
                    className="text-md w-16 font-light text-black"
                >
                    {rawLabel}
                </Text>
                <div className="mx-auto flex w-24 justify-between gap-2">
                    <span className="text-lg font-bold text-black">-</span>
                    <Text
                        variant="body"
                        className="text-lg font-bold text-black"
                    >
                        {RAW_QUANTITY}
                    </Text>
                    <span className="text-lg font-light text-black">+</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Text
                    variant="body"
                    className="text-md w-16 font-light text-black"
                >
                    {gradedLabel}
                </Text>
                <div className="mx-auto flex w-24 justify-between gap-2">
                    <span className="text-lg font-bold text-black">-</span>
                    <Text
                        variant="body"
                        className="text-lg font-bold text-black"
                    >
                        {GRADED_QUANTITY}
                    </Text>
                    <span className="text-lg font-light text-black">+</span>
                </div>
            </div>
        </div>
    </section>
);

export default CollectionCardDetailQuantities;
