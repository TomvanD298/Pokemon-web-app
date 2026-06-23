import type { FC } from 'react';
import CollectionCardDetailLanguageCard from '@/ui/components/CollectionCardDetailLanguageCard/CollectionCardDetailLanguageCard';
import Text from '@/ui/components/Text/Text';

type LanguageCardView = {
    flag: string;
    formattedPrice: string;
    id: string;
    imageAlt: string;
    imageSrc: string;
    languageLabel: string;
};

type Props = {
    cards: LanguageCardView[];
    title: string;
};

const CollectionCardDetailOtherLanguages: FC<Props> = ({ cards, title }) => (
    <section className="flex flex-col gap-3 border-t border-black/10 pt-4">
        <Text variant="body" className="text-md font-bold text-black">
            {title}
        </Text>
        <div className="flex flex-wrap gap-4">
            {cards.map(card => (
                <CollectionCardDetailLanguageCard key={card.id} {...card} />
            ))}
        </div>
    </section>
);

export default CollectionCardDetailOtherLanguages;
