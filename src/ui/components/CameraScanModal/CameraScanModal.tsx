'use client';

import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import cn from '@/core/utils/cn';
import ActionButton from '@/ui/components/ActionButton/ActionButton';
import WishlistButton from '@/ui/components/WishlistButton/WishlistButton';
import CloseModalButton from '@/ui/components/CloseModalButton/CloseModalButton';
import Text from '@/ui/components/Text/Text';

const MOCK_CARD_IMAGE_SRC = '/images/mock/camera-scan/card-psyduck.png';
const MOCK_SET_FLAG_SRC = '/images/mock/camera-scan/set-flag.png';

type ScannedCard = {
    cardNumber: string;
    dexNumber: string;
    imageSrc: string;
    name: string;
    price: string;
    rarity: string;
    setFlagSrc: string;
    setName: string;
};

type Props = {
    card?: ScannedCard;
    isOpen: boolean;
    onAddToCollection?: () => void;
    onClose: () => void;
    onScanNext?: () => void;
};

//Mockdata
const DEFAULT_CARD: ScannedCard = {
    name: 'Psyduck',
    cardNumber: '039/217',
    setName: 'Ascended Heroes (ASC)',
    setFlagSrc: MOCK_SET_FLAG_SRC,
    rarity: 'Common',
    price: '€ 0.02',
    dexNumber: '0054',
    imageSrc: MOCK_CARD_IMAGE_SRC,
};

const CameraScanModal: FC<Props> = ({
    card = DEFAULT_CARD,
    isOpen,
    onAddToCollection,
    onClose,
    onScanNext,
}) => {
    const t = useTranslations('CardScanModal');

    const handleScanNext = () => {
        if (onScanNext) {
            onScanNext();
            return;
        }

        onClose();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            className={cn(
                'absolute inset-0 z-30 flex flex-col',
                'transition-opacity duration-300',
                isOpen
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0',
            )}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/55"
                onClick={onClose}
            />

            <CloseModalButton
                ariaLabel={t('close')}
                className="absolute top-6 left-7 z-40 size-6"
                onClick={onClose}
            />

            <div className="relative z-20 mt-16 mb-6 flex flex-col items-center justify-center px-4">
                <div className="relative">
                    <img
                        alt={card.name}
                        src={card.imageSrc}
                        className="h-auto max-h-[min(428px,45vh)] w-[min(308px,85vw)] object-contain"
                    />
                    <WishlistButton
                        ariaLabel={t('wishlist')}
                        className="absolute -top-3 right-3"
                    />
                </div>
            </div>

            <div
                className={cn(
                    'bg-background-primary relative z-30 h-full w-full rounded-t-lg px-8 pt-4 pb-8',
                    'transition-transform duration-300 ease-out',
                    isOpen ? 'translate-y-0' : 'translate-y-full',
                )}
            >
                <div className="mb-1 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                            <Text
                                asChild
                                variant="h2"
                                className="font-heading text-6xl leading-none font-normal text-black"
                            >
                                <h2>{card.name}</h2>
                            </Text>
                            <Text variant="body" className="text-md text-black">
                                {card.cardNumber}
                            </Text>
                        </div>
                    </div>
                    <div className="shrink-0 text-right">
                        <Text
                            variant="body"
                            className="text-md font-semibold text-black"
                        >
                            {t('averagePrice')}
                        </Text>
                        <Text
                            variant="body"
                            className="text-2xl font-bold text-black"
                        >
                            {card.price}
                        </Text>
                    </div>
                </div>

                <div className="mb-1 flex items-center gap-2">
                    <img
                        alt=""
                        src={card.setFlagSrc}
                        className="h-3 w-5 shrink-0 object-cover"
                    />
                    <Text variant="body" className="text-lg text-black">
                        {card.setName}
                    </Text>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            aria-hidden
                            className="size-2 shrink-0 rounded-full bg-black"
                        />
                        <Text variant="body" className="text-lg text-black">
                            {card.rarity}
                        </Text>
                    </div>
                    <div className="text-right">
                        <Text
                            variant="body"
                            className="text-md font-semibold text-black"
                        >
                            {t('dexNumber')}
                        </Text>
                        <Text variant="body" className="text-md text-black">
                            {card.dexNumber}
                        </Text>
                    </div>
                </div>

                <div className="p flex flex-col gap-4">
                    <button
                        type="button"
                        className={cn(
                            'flex h-10 w-full items-center justify-center rounded-lg bg-black',
                            'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
                        )}
                        onClick={onAddToCollection ?? onClose}
                    >
                        <Text
                            variant="body"
                            className="text-center text-2xl font-medium text-white"
                        >
                            {t('addToCollection')}
                        </Text>
                    </button>

                    <ActionButton
                        ariaLabel={t('scanNextCard')}
                        label={t('scanNextCard')}
                        onClick={handleScanNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default CameraScanModal;
