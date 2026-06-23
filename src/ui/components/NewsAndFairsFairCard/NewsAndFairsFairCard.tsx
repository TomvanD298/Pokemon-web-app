import type { FC } from 'react';
import {
    faArrowRight,
    faCalendarDays,
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FairItem } from '@/core/schemas/newsAndFairsSchema';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = Pick<
    FairItem,
    'href' | 'title' | 'dateMonth' | 'dateDay' | 'location' | 'time'
>;

const NewsAndFairsFairCard: FC<Props> = ({
    href,
    title,
    dateMonth,
    dateDay,
    location,
    time,
}) => (
    <a
        href={href}
        className={cn(
            'bg-background-secondary shadow-drop flex h-full w-full items-start gap-4',
            'rounded-2xl p-4',
            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
    >
        <div
            aria-hidden
            className={cn(
                'flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl',
                'bg-purple-gradient text-white',
            )}
        >
            <Text
                variant="body"
                className="font-manrope text-xs font-bold uppercase"
            >
                {dateMonth}
            </Text>
            <Text
                variant="h2"
                className="font-manrope text-3xl leading-none font-bold"
            >
                {dateDay}
            </Text>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Text variant="body" className="font-bold text-black">
                {title}
            </Text>
            <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon
                    aria-hidden
                    className="size-3.5 shrink-0 text-black"
                    icon={faCalendarDays}
                />
                <Text variant="body" className="text-sm font-extralight">
                    {location}
                </Text>
            </span>
            <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon
                    aria-hidden
                    className="size-3.5 shrink-0 text-black"
                    icon={faClock}
                />
                <Text variant="body" className="text-sm font-extralight">
                    {time}
                </Text>
            </span>
        </div>

        <FontAwesomeIcon
            aria-hidden
            className="size-5 shrink-0 self-center text-black"
            icon={faArrowRight}
        />
    </a>
);

export default NewsAndFairsFairCard;
