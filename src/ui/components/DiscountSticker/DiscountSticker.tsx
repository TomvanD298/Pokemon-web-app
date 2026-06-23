import type { FC } from 'react';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    ariaLabel: string;
    className?: string;
    label: string;
};

const DiscountSticker: FC<Props> = ({ ariaLabel, className, label }) => (
    <span
        aria-label={ariaLabel}
        className={cn(
            'relative inline-flex size-14 items-center justify-center rounded-full',
            'border-2 border-white [background-image:var(--tc-gradient-sticker)]',
            className,
        )}
    >
        <Text
            variant="body"
            className="font-heading relative z-10 text-2xl leading-none font-bold text-black"
        >
            {label}
        </Text>
    </span>
);

export default DiscountSticker;
