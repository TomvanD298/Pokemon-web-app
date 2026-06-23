import type { FC } from 'react';
import CollectionStatCard from '@/ui/components/CollectionStatCard/CollectionStatCard';

export type CollectionStat = {
    id: string;
    label: string;
    value: string;
};

type Props = {
    stats: CollectionStat[];
};

const CollectionStatsGrid: FC<Props> = ({ stats }) => (
    <div className="grid w-full grid-cols-2 gap-2">
        {stats.map(stat => (
            <CollectionStatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
            />
        ))}
    </div>
);

export default CollectionStatsGrid;
