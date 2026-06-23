import type { FC } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/core/utils/cn';
import Button from '@/ui/components/Button/Button';

type Props = {
    ariaLabel: string;
    className?: string;
    isActive?: boolean;
    onClick?: () => void;
};

const WishlistButton: FC<Props> = ({
    ariaLabel,
    className,
    isActive = false,
    onClick,
}) => (
    <Button
        type="button"
        aria-label={ariaLabel}
        aria-pressed={isActive}
        className={cn(
            'bg-primary-lime flex size-10 shrink-0 items-center justify-center rounded-full px-0',
            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
            className,
        )}
        onClick={onClick}
    >
        <FontAwesomeIcon
            aria-hidden
            className="size-5 text-black"
            icon={faStar}
        />
    </Button>
);

export default WishlistButton;
