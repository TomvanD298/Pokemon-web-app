import type { FC } from 'react';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    title: string;
    description: string;
    descriptionClassName?: string;
};

const PageHeader: FC<Props> = ({
    title,
    description,
    descriptionClassName,
}) => (
    <header className="px-mnav-inline mx-auto max-w-screen-xl">
        <Text variant="h1" className="font-medium">
            {title}
        </Text>
        <Text variant="body" className={cn(descriptionClassName, 'text-sm')}>
            {description}
        </Text>
    </header>
);

export default PageHeader;
