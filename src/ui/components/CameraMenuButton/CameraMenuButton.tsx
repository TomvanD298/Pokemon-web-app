import type { FC } from 'react';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    ariaLabel: string;
    isSelected?: boolean;
    label: string;
    onClick?: () => void;
};

const CameraMenuButton: FC<Props> = ({
    ariaLabel,
    isSelected = false,
    label,
    onClick,
}) => (
    <button
        type="button"
        role="tab"
        aria-label={ariaLabel}
        aria-selected={isSelected}
        className={cn(
            'h-6 px-1 pb-0.5',
            isSelected && 'border-b-2 border-white',
        )}
        onClick={onClick}
    >
        <Text variant="body" className="text-center text-white">
            {label}
        </Text>
    </button>
);

export default CameraMenuButton;
