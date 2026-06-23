import type { FC } from 'react';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    ariaLabel: string;
    href: string;
    name: string;
};

const CollectionCardDetailShopLink: FC<Props> = ({ ariaLabel, href, name }) => (
    <a
        href={href}
        aria-label={ariaLabel}
        rel="noopener noreferrer"
        target="_blank"
        className={cn(
            'flex items-center justify-between gap-3 py-2',
            'outline-accent rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
    >
        <Text variant="body" className="text-md font-bold text-black lowercase">
            {name}
        </Text>
        <FontAwesomeIcon
            aria-hidden
            className="size-4 shrink-0 text-black"
            icon={faArrowUpRightFromSquare}
        />
    </a>
);

export default CollectionCardDetailShopLink;
