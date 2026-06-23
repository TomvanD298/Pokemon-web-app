import type { FC } from 'react';
import type { CollectionCardShopLink } from '@/core/schemas/collectionCardDetailSchema';
import CollectionCardDetailShopLink from '@/ui/components/CollectionCardDetailShopLink/CollectionCardDetailShopLink';
import Text from '@/ui/components/Text/Text';

type Props = {
    links: CollectionCardShopLink[];
    shopLinkAriaLabel: (name: string) => string;
    title: string;
};

const CollectionCardDetailShopLinks: FC<Props> = ({
    links,
    shopLinkAriaLabel,
    title,
}) => (
    <section className="flex flex-col gap-2 border-t border-black/10 pt-4">
        <Text variant="body" className="text-lg font-bold text-black">
            {title}
        </Text>
        <div className="flex flex-col">
            {links.map(link => (
                <CollectionCardDetailShopLink
                    key={link.id}
                    ariaLabel={shopLinkAriaLabel(link.name)}
                    href={link.href}
                    name={link.name}
                />
            ))}
        </div>
    </section>
);

export default CollectionCardDetailShopLinks;
