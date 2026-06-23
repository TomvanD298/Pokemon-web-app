import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { FC } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    href: string;
    icon: IconProp;
    subtitle: string;
    title: string;
};

const AccountMenuItem: FC<Props> = ({ href, icon, subtitle, title }) => (
    <a
        href={href}
        className={cn(
            'bg-background-secondary shadow-drop flex w-full items-center gap-4',
            'rounded-2xl p-4',
            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
    >
        <span
            aria-hidden
            className={cn(
                'bg-background-primary flex size-12 shrink-0 items-center justify-center rounded-xl',
            )}
        >
            <FontAwesomeIcon
                aria-hidden
                className="size-5 text-black"
                icon={icon}
            />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Text variant="body" className="font-bold text-black">
                {title}
            </Text>
            <Text variant="body" className="text-sm font-extralight text-black">
                {subtitle}
            </Text>
        </div>

        <FontAwesomeIcon
            aria-hidden
            className="size-5 shrink-0 text-black"
            icon={faArrowRight}
        />
    </a>
);

export default AccountMenuItem;
