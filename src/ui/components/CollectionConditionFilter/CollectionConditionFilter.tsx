import type { FC } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CollectionConditionFilter } from '@/core/constants/collectionConditionFilters';
import cn from '@/core/utils/cn';
import Button from '@/ui/components/Button/Button';
import Text from '@/ui/components/Text/Text';

type FilterOption = {
    id: CollectionConditionFilter;
    label: string;
};

type Props = {
    activeFilter: CollectionConditionFilter;
    advancedFiltersLabel: string;
    ariaLabel: string;
    onAdvancedFiltersClick?: () => void;
    onFilterChange: (filter: CollectionConditionFilter) => void;
    options: FilterOption[];
};

const CollectionConditionFilter: FC<Props> = ({
    activeFilter,
    advancedFiltersLabel,
    ariaLabel,
    onAdvancedFiltersClick,
    onFilterChange,
    options,
}) => (
    <div
        aria-label={ariaLabel}
        className="flex w-full flex-wrap justify-center gap-2"
        role="toolbar"
    >
        {options.map(option => {
            const isActive = option.id === activeFilter;

            return (
                <Button
                    key={option.id}
                    type="button"
                    variant="ghost"
                    className={cn(
                        'rounded-full px-4 py-2 text-sm font-bold text-black',
                        'hover:no-underline active:scale-100',
                        isActive ? 'bg-primary-lime' : 'bg-background-primary',
                    )}
                    onClick={() => onFilterChange(option.id)}
                >
                    <Text variant="body" className="text-sm font-bold">
                        {option.label}
                    </Text>
                </Button>
            );
        })}
        <Button
            type="button"
            variant="ghost"
            className={cn(
                'bg-background-primary rounded-full px-4 py-2 text-sm font-bold text-black',
                'hover:no-underline active:scale-100',
            )}
            onClick={onAdvancedFiltersClick}
        >
            <FontAwesomeIcon aria-hidden icon={faFilter} />
            <Text variant="body" className="text-sm font-bold">
                {advancedFiltersLabel}
            </Text>
        </Button>
    </div>
);

export default CollectionConditionFilter;
