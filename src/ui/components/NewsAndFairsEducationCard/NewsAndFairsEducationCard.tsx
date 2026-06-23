import type { FC } from 'react';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { EducationItem } from '@/core/schemas/newsAndFairsSchema';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = Pick<EducationItem, 'href' | 'badge' | 'title' | 'relativeTime'>;

const NewsAndFairsEducationCard: FC<Props> = ({
    href,
    badge,
    title,
    relativeTime,
}) => (
    <a
        href={href}
        className={cn(
            'bg-background-secondary shadow-drop flex h-full w-full items-center gap-4',
            'rounded-2xl p-4',
            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
    >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span
                className={cn(
                    'bg-primary-pink inline-flex w-fit rounded-full px-3 py-1',
                )}
            >
                <Text variant="body" className="text-xs font-bold text-black">
                    {badge}
                </Text>
            </span>

            <Text variant="body" className="font-bold text-black">
                {title}
            </Text>

            <span className="inline-flex items-center gap-2">
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

        <FontAwesomeIcon
            aria-hidden
            className="size-5 shrink-0 text-black"
            icon={faArrowRight}
        />
    </a>
);

export default NewsAndFairsEducationCard;
