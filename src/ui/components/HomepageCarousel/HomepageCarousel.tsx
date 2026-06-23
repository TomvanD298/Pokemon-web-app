'use client';

import type { FC } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from '@/core/utils/cn';
import publicAssetPath from '@/core/utils/publicAssetPath';
import Button from '@/ui/components/Button/Button';
import HomepageCardHeader from '@/ui/components/HomepageCardHeader/HomepageCardHeader';
import WishlistButton from '@/ui/components/WishlistButton/WishlistButton';

const MOCK_IMAGE_BASE = publicAssetPath('/images/mock/homepage');

export type HomepageCarouselCard = {
    id: string;
    imageSrc: string;
    name: string;
};

const AUTOPLAY_DELAY_MS = 5000;

const DEFAULT_CARDS: HomepageCarouselCard[] = [
    {
        id: '1',
        name: 'Card 1',
        imageSrc: `${MOCK_IMAGE_BASE}/card-1.png`,
    },
    {
        id: '2',
        name: 'Card 2',
        imageSrc: `${MOCK_IMAGE_BASE}/card-2.png`,
    },
    {
        id: '3',
        name: 'Card 3',
        imageSrc: `${MOCK_IMAGE_BASE}/card-3.png`,
    },
    {
        id: '4',
        name: 'Card 4',
        imageSrc: `${MOCK_IMAGE_BASE}/card-4.png`,
    },
];

type Props = {
    cards?: HomepageCarouselCard[];
};

const HomepageCarousel: FC<Props> = ({ cards = DEFAULT_CARDS }) => {
    const t = useTranslations('HomepageCarousel');
    const canLoop = cards.length > 1;

    const autoplayPlugin = useMemo(
        () =>
            Autoplay({
                delay: AUTOPLAY_DELAY_MS,
                stopOnInteraction: true,
            }),
        [],
    );

    const carouselPlugins = useMemo(
        () => (canLoop ? [autoplayPlugin] : []),
        [autoplayPlugin, canLoop],
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: 'center',
            containScroll: false,
            dragFree: false,
            loop: canLoop,
            slidesToScroll: 1,
            watchResize: true,
        },
        carouselPlugins,
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelect = useCallback(() => {
        if (!emblaApi) {
            return;
        }

        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) {
            return undefined;
        }

        emblaApi.on('select', handleSelect);
        emblaApi.on('reInit', handleSelect);

        return () => {
            emblaApi.off('select', handleSelect);
            emblaApi.off('reInit', handleSelect);
        };
    }, [emblaApi, handleSelect]);

    useEffect(() => {
        emblaApi?.reInit({
            align: 'center',
            containScroll: false,
            loop: canLoop,
            slidesToScroll: 1,
            watchResize: true,
        });
    }, [canLoop, cards.length, emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            autoplayPlugin.stop();
            emblaApi?.scrollTo(index);
        },
        [autoplayPlugin, emblaApi],
    );

    if (cards.length === 0) {
        return null;
    }

    return (
        <section
            aria-labelledby="homepage-carousel-heading"
            className="bg-primary-pink shadow-drop flex h-full w-full min-w-0 flex-col rounded-2xl px-2 py-4 lg:px-3 lg:py-5"
        >
            <HomepageCardHeader
                headingId="homepage-carousel-heading"
                title={t('title')}
                subtitle={t('subtitle')}
            />

            <div
                ref={emblaRef}
                aria-label={t('carouselLabel')}
                className="homepage-carousel-viewport @container min-h-0 flex-1 overflow-hidden pt-2 pb-2 lg:min-h-80"
                role="region"
            >
                <div className="homepage-carousel-track flex touch-pan-y items-center">
                    {cards.map((card, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <div
                                key={card.id}
                                aria-hidden={!isActive}
                                className="homepage-carousel-slide flex min-w-0 items-center justify-center"
                            >
                                <div
                                    className={cn(
                                        'relative mx-auto w-full max-w-40 lg:max-w-full',
                                        'origin-center transition-all duration-300 ease-out motion-reduce:transition-none',
                                        isActive
                                            ? 'scale-100 opacity-100'
                                            : 'scale-[0.82] opacity-60',
                                    )}
                                >
                                    <Button
                                        fullWidth
                                        type="button"
                                        variant="ghost"
                                        aria-label={t('selectCard', {
                                            name: card.name,
                                        })}
                                        aria-current={
                                            isActive ? 'true' : undefined
                                        }
                                        className={cn(
                                            'block rounded-none px-0 py-0',
                                            'hover:no-underline active:scale-100',
                                        )}
                                        onClick={() => scrollTo(index)}
                                    >
                                        <img
                                            alt=""
                                            src={card.imageSrc}
                                            className="mx-auto h-auto w-full max-w-40 object-contain shadow-sm lg:max-h-72 lg:max-w-full"
                                        />
                                    </Button>
                                    <WishlistButton
                                        ariaLabel={t('wishlist')}
                                        className={cn(
                                            'absolute top-1 right-1 z-10 size-8 px-0 lg:top-2 lg:right-2 lg:size-10',
                                            '[&_svg]:size-4 lg:[&_svg]:size-5',
                                            isActive
                                                ? 'bg-primary-lime'
                                                : 'bg-white',
                                        )}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {canLoop ? (
                <div
                    aria-label={t('paginationLabel')}
                    className="flex justify-center gap-2"
                    role="tablist"
                >
                    {cards.map((card, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <Button
                                key={card.id}
                                type="button"
                                variant="ghost"
                                aria-label={t('goToSlide', {
                                    number: index + 1,
                                })}
                                aria-selected={isActive}
                                className={cn(
                                    'size-2 min-h-0 min-w-0 shrink-0 rounded-full p-0',
                                    'transition-colors hover:no-underline active:scale-100',
                                    isActive ? 'bg-black' : 'bg-black/25',
                                )}
                                role="tab"
                                onClick={() => scrollTo(index)}
                            />
                        );
                    })}
                </div>
            ) : null}
        </section>
    );
};

export default HomepageCarousel;
