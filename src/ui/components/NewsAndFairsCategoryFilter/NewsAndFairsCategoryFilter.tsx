import type { FC } from 'react';
import type { NewsAndFairsCategoryFilter } from '@/core/constants/newsAndFairsCategories';
import cn from '@/core/utils/cn';
import Button from '@/ui/components/Button/Button';
import Text from '@/ui/components/Text/Text';

type FilterOption = {
    id: NewsAndFairsCategoryFilter;
    label: string;
};

type Props = {
    activeFilter: NewsAndFairsCategoryFilter;
    ariaLabel: string;
    onFilterChange: (filter: NewsAndFairsCategoryFilter) => void;
    options: FilterOption[];
};

const NewsAndFairsCategoryFilter: FC<Props> = ({
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

export default NewsAndFairsCategoryFilter;
