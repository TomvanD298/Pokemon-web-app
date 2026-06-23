import type { FC } from 'react';
import CameraMenuButton from '@/ui/components/CameraMenuButton/CameraMenuButton';
import CameraMenuSeparator from '@/ui/components/CameraMenuSeparator/CameraMenuSeparator';

export const CAMERA_MENU_ITEMS = [
    'scanning',
    'information',
    'authenticity',
] as const;

export type CameraMenuItem = (typeof CAMERA_MENU_ITEMS)[number];

type MenuItem = {
    ariaLabel: string;
    id: CameraMenuItem;
    label: string;
};

type Props = {
    ariaLabel: string;
    closeLabel: string;
    items: MenuItem[];
    onClose: () => void;
    onSelect: (item: CameraMenuItem) => void;
    selectedItem: CameraMenuItem;
};

const CameraMenuNav: FC<Props> = ({
    ariaLabel,
    closeLabel,
    items,
    onClose,
    onSelect,
    selectedItem,
}) => (
    <nav
        aria-label={ariaLabel}
        className="flex w-full flex-row items-center justify-between"
    >
        <button
            type="button"
            aria-label={closeLabel}
            className="size-10 text-white"
            onClick={onClose}
        >
            <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    d="M15 18L9 12L15 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>

        <div className="flex flex-row items-center justify-end">
            {items.map((item, index) => (
                <span key={item.id} className="flex items-center">
                    {index > 0 ? <CameraMenuSeparator /> : null}
                    <CameraMenuButton
                        ariaLabel={item.ariaLabel}
                        isSelected={selectedItem === item.id}
                        label={item.label}
                        onClick={() => onSelect(item.id)}
                    />
                </span>
            ))}
        </div>
    </nav>
);

export default CameraMenuNav;
