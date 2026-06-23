import type { FC } from 'react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';
import Button from '../Button/Button';

type Props = {
    label: string;
    onClick?: () => void;
};

const AccountLogoutButton: FC<Props> = ({ label, onClick }) => (
    <Button
        fullWidth
        size="sm"
        variant="outline"
        className="border-red rounded-2xl"
        onClick={onClick}
    >
        <FontAwesomeIcon
            aria-hidden
            className="text-red size-4"
            icon={faRightFromBracket}
        />
        <Text variant="body" className="text-red font-bold">
            {label}
        </Text>
    </Button>
);

export default AccountLogoutButton;
