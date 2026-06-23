import type { FC } from 'react';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    label: string;
    value: string;
};

const CollectionStatCard: FC<Props> = ({ label, value }) => (
    <article
        className={cn(
            'bg-background-secondary shadow-drop flex flex-col rounded-2xl p-2',
        )}
    >
        <Text variant="body" className="text-sm font-bold text-black">
            {label}
        </Text>
        <Text variant="body" className="text-3xl font-bold text-black">
            {value}
        </Text>
    </article>
);

export default CollectionStatCard;
