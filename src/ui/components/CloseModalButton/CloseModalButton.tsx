import type { FC } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/core/utils/cn';

type Props = {
    ariaLabel: string;
    className?: string;
    onClick: () => void;
};

const CloseModalButton: FC<Props> = ({ ariaLabel, className, onClick }) => (
    <button
        type="button"
        aria-label={ariaLabel}
        className={cn(
            'flex items-center justify-center text-white',
            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
            className,
        )}
        onClick={onClick}
    >
        <FontAwesomeIcon aria-hidden className="size-6" icon={faXmark} />
    </button>
);

export default CloseModalButton;
