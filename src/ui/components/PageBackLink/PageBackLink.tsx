import type { FC } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { AppHref } from '@/core/i18n/appHref';
import { Link } from '@/core/i18n/navigation';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    href: AppHref;
    label: string;
};

const PageBackLink: FC<Props> = ({ href, label }) => (
    <nav
        aria-label={label}
        className={cn('mx-2 mb-2 flex h-10 w-full items-center')}
    >
        <Link
            href={href}
            className={cn(
                'inline-flex items-center gap-2 text-black',
                'outline-accent r',
            )}
        >
            <FontAwesomeIcon
                aria-hidden
                className="size-4"
                icon={faArrowLeft}
            />
            <Text variant="body" className="text-md font-bold">
                {label}
            </Text>
        </Link>
    </nav>
);

export default PageBackLink;
