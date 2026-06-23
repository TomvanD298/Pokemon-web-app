import type { FC } from 'react';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    headingId: string;
    title: string;
    subtitle: string;
    className?: string;
};

const HomepageCardHeader: FC<Props> = ({
    headingId,
    title,
    subtitle,
    className,
}) => (
    <div className={cn('flex flex-col gap-1', className)}>
        <Text
            id={headingId}
            variant="h2"
            className="font-heading text-3xl leading-none font-medium text-black lg:text-4xl"
        >
            {title}
        </Text>
        <Text variant="body" className="font-manrope text-xs text-black">
            {subtitle}
        </Text>
    </div>
);

export default HomepageCardHeader;
