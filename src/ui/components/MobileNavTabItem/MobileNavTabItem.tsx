import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { AppHref } from '@/core/i18n/appHref';
import { Link } from '@/core/i18n/navigation';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    href: AppHref;
    icon: IconProp;
    isActive: boolean;
    label: string;
};

const MobileNavTabItem: FC<Props> = ({ href, icon, isActive, label }) => (
    <li className="flex w-full min-w-0 flex-1 list-none px-1">
        <Link
            className={cn(
                'my-2 flex min-h-11 w-full min-w-0 flex-1 flex-col items-center pb-2 text-black',
                isActive && 'bg-primary-lime/50 rounded-2xl',
            )}
            href={href}
        >
            <span className="size-mnav-icon-box rounded-mnav-active flex items-center justify-center">
                <FontAwesomeIcon
                    aria-hidden
                    className="h-mnav-icon! w-mnav-icon! box-border shrink-0 overflow-visible"
                    icon={icon}
                />
            </span>
            <Text
                variant="body"
                className="font-manrope text-mnav-label text-center"
            >
                {label}
            </Text>
        </Link>
    </li>
);

export default MobileNavTabItem;
