import type { FC } from 'react';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NewsItem } from '@/core/schemas/newsAndFairsSchema';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = Pick<
    NewsItem,
    'href' | 'badge' | 'title' | 'relativeTime' | 'imageSrc' | 'imageAlt'
>;

const NewsAndFairsNewsCard: FC<Props> = ({
    href,
    badge,
    title,
    relativeTime,
    imageSrc,
    imageAlt,
}) => (
    <a
        href={href}
        className={cn(
            'bg-background-secondary shadow-drop relative flex h-full min-h-28 w-full items-center',
            'overflow-hidden rounded-2xl p-4',
            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
    >
        <div className="relative flex min-w-0 flex-1 flex-col gap-2 pr-24">
            <span
                className={cn(
                    'bg-primary-lime inline-flex w-fit rounded-full px-3 py-1',
                )}
            >
                <Text variant="body" className="text-xs font-bold text-black">
                    {badge}
                </Text>
            </span>

            <Text variant="body" className="font-bold text-black">
                {title}
            </Text>

            <span className="gap- z-10 inline-flex items-center">
                <FontAwesomeIcon
                    aria-hidden
                    className="size-3.5 shrink-0 text-black"
                    icon={faClock}
                />
                <Text variant="body" className="text-sm font-extralight">
                    {relativeTime}
                </Text>
            </span>
        </div>

        <img
            alt={imageAlt}
            src={imageSrc}
            className="pointer-events-none absolute -right-15 -bottom-10 z-0 max-h-40 w-50 object-contain"
        />

        <FontAwesomeIcon
            aria-hidden
            className="absolute top-1/2 right-4 z-10 size-5 -translate-y-1/2 text-black"
            icon={faArrowRight}
        />
    </a>
);

export default NewsAndFairsNewsCard;
