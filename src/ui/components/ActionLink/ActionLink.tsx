import type { FC } from 'react';
import {
    ActionControlLabel,
    getActionControlClassName,
} from '@/ui/components/ActionControl/actionControlShared';
import Button from '@/ui/components/Button/Button';

type Props = {
    ariaLabel: string;
    className?: string;
    href: string;
    isExternal?: boolean;
    label: string;
};

const ActionLink: FC<Props> = ({
    ariaLabel,
    className,
    href,
    isExternal = true,
    label,
}) => {
    const externalProps = isExternal
        ? { rel: 'noopener noreferrer', target: '_blank' as const }
        : {};

    return (
        <Button asChild className={getActionControlClassName(className)}>
            <a href={href} aria-label={ariaLabel} {...externalProps}>
                <ActionControlLabel label={label} />
            </a>
        </Button>
    );
};

export default ActionLink;
