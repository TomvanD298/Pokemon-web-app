import type { FC } from 'react';
import {
    faFolderOpen,
    faHouse,
    faNewspaper,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import type { AppHref } from '@/core/i18n/appHref';
import MobileNavCameraItem from '@/ui/components/MobileNavCameraItem/MobileNavCameraItem';
import MobileNavTabItem from '@/ui/components/MobileNavTabItem/MobileNavTabItem';

type NavItemState = {
    href: AppHref;
    isActive: boolean;
    label: string;
};

type Props = {
    ariaLabel: string;
    home: NavItemState;
    news: NavItemState;
    camera: {
        ariaLabel: string;
        closeLabel: string;
        openErrorLabel: string;
    };
    collection: NavItemState;
    account: NavItemState;
};

const MobileBottomNav: FC<Props> = ({
    ariaLabel,
    home,
    news,
    camera,
    collection,
    account,
}) => (
    <nav
        aria-label={ariaLabel}
        className="shadow-mnav rounded-t-mnav-bar bg-background-secondary fixed inset-x-0 bottom-0 z-10 mx-auto max-w-full md:hidden"
    >
        <ul className="relative mx-auto flex w-full max-w-11/12 list-none items-end justify-between p-0">
            <MobileNavTabItem {...home} icon={faHouse} />
            <MobileNavTabItem {...news} icon={faNewspaper} />
            <li className="w-mnav-fab relative mb-4 flex shrink-0 list-none flex-col items-center">
                <div className="absolute bottom-full flex justify-center">
                    <MobileNavCameraItem {...camera} />
                </div>
                <div aria-hidden className="h-3 w-full" />
            </li>
            <MobileNavTabItem {...collection} icon={faFolderOpen} />
            <MobileNavTabItem {...account} icon={faUser} />
        </ul>
    </nav>
);

export default MobileBottomNav;
