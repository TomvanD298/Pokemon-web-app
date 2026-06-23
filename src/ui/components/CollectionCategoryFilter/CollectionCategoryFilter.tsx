import type { FC } from 'react';
import type { CollectionCategoryFilter } from '@/core/constants/collectionCategories';
import cn from '@/core/utils/cn';
import Button from '@/ui/components/Button/Button';
import Text from '@/ui/components/Text/Text';

type FilterOption = {
    id: CollectionCategoryFilter;
    label: string;
};

type Props = {
    activeFilter: CollectionCategoryFilter;
    ariaLabel: string;
    onFilterChange: (filter: CollectionCategoryFilter) => void;
    options: FilterOption[];
};

const CollectionCategoryFilter: FC<Props> = ({
    activeFilter,
    ariaLabel,
    onFilterChange,
    options,
}) => (
    <nav aria-label={ariaLabel} className="w-full border-b border-black/10">
        <div className="flex w-full justify-between gap-2" role="tablist">
            {options.map(option => {
                const isActive = option.id === activeFilter;

                return (
                    <Button
                        key={option.id}
                        fullWidth
                        type="button"
                        variant="ghost"
                        role="tab"
                        aria-selected={isActive}
                        className={cn(
                            'min-w-0 flex-1 rounded-none px-0 py-0 pb-3 text-black',
                            'hover:no-underline active:scale-100',
                            isActive && '-mb-px border-b-2 border-black',
                        )}
                        onClick={() => onFilterChange(option.id)}
                    >
                        <Text
                            variant="body"
                            className="text-center text-sm font-medium"
                        >
                            {option.label}
                        </Text>
                    </Button>
                );
            })}
        </div>
    </nav>
);

export default CollectionCategoryFilter;
