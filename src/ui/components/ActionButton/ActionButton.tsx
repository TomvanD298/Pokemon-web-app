'use client';

import type { FC } from 'react';
import {
    ActionControlLabel,
    getActionControlClassName,
} from '@/ui/components/ActionControl/actionControlShared';
import Button from '@/ui/components/Button/Button';

type Props = {
    ariaLabel: string;
    className?: string;
    label: string;
    onClick?: () => void;
};

const ActionButton: FC<Props> = ({ ariaLabel, className, label, onClick }) => (
    <Button
        type="button"
        aria-label={ariaLabel}
        className={getActionControlClassName(className)}
        onClick={onClick}
    >
        <ActionControlLabel label={label} />
    </Button>
);

export default ActionButton;
