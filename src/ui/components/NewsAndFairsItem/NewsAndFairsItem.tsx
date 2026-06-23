import type { FC } from 'react';
import type { NewsAndFairsItem } from '@/core/schemas/newsAndFairsSchema';
import NewsAndFairsEducationCard from '@/ui/components/NewsAndFairsEducationCard/NewsAndFairsEducationCard';
import NewsAndFairsFairCard from '@/ui/components/NewsAndFairsFairCard/NewsAndFairsFairCard';
import NewsAndFairsNewsCard from '@/ui/components/NewsAndFairsNewsCard/NewsAndFairsNewsCard';

type Props = {
    item: NewsAndFairsItem;
};

const NewsAndFairsItem: FC<Props> = ({ item }) => {
    switch (item.category) {
        case 'fairs':
            return <NewsAndFairsFairCard {...item} />;
        case 'news':
            return <NewsAndFairsNewsCard {...item} />;
        case 'education':
            return <NewsAndFairsEducationCard {...item} />;
        default: {
            const exhaustiveCheck: never = item;
            return exhaustiveCheck;
        }
    }
};

export default NewsAndFairsItem;
