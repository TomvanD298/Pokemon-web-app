'use client';

import type { ChangeEvent, FC } from 'react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import cn from '@/core/utils/cn';

const PLACEHOLDER_KEYS = [
    'pokemonName',
    'cardCondition',
    'firePokemon',
    'artist',
    'sleepingPokemon',
    'setNameOrYear',
] as const;

const PLACEHOLDER_CYCLE_MS = 3500;

type Props = {
    clearAriaLabel: string;
};

const SearchBar: FC<Props> = ({ clearAriaLabel: _ }) => {
    const t = useTranslations('SearchBar');
    const [searchValue, setSearchValue] = useState<string>('');
    const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);

    const placeholders = useMemo(
        () => PLACEHOLDER_KEYS.map(key => t(`placeholders.${key}`)),
        [t],
    );

    const isSearchEmpty = searchValue.length === 0;
    const activePlaceholder =
        placeholders[placeholderIndex] ?? placeholders[0] ?? '';

    useEffect(() => {
        if (!isSearchEmpty) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setPlaceholderIndex(
                current => (current + 1) % PLACEHOLDER_KEYS.length,
            );
        }, PLACEHOLDER_CYCLE_MS);

        return () => window.clearInterval(intervalId);
    }, [isSearchEmpty]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <header className="px-mnav-inline fixed inset-x-0 top-0 z-20 mx-auto mt-2 h-14 max-w-screen-xl">
            <div
                className={cn(
                    'relative isolate flex h-14 w-full max-w-full overflow-hidden rounded-2xl',
                    'backdrop-blur-md backdrop-saturate-50',
                    'border border-black/10',
                    'bg-pg-background-white/10',
                )}
            >
                <div className="relative z-1 flex size-full h-full items-center gap-2 pr-2 pl-6">
                    <div className="relative min-h-0 min-w-0 flex-1">
                        <input
                            type="search"
                            name="search"
                            placeholder=""
                            value={searchValue}
                            aria-label={t('searchLabel')}
                            className={cn(
                                'search-input text-body relative z-1 min-h-0 w-full border-0 bg-transparent py-2 pr-4 text-black',
                                'focus:outline-none focus-visible:outline-none',
                            )}
                            autoComplete="off"
                            enterKeyHint="search"
                            onChange={handleSearchChange}
                        />
                        {isSearchEmpty && activePlaceholder ? (
                            <span
                                key={placeholderIndex}
                                aria-hidden
                                className={cn(
                                    'text-body pointer-events-none absolute inset-y-0 right-4 left-0 z-0 flex items-center truncate text-black/40',
                                    'animate-fade-up-enter motion-reduce:animate-none motion-reduce:opacity-100',
                                )}
                            >
                                {activePlaceholder}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SearchBar;
