import type { FC } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/core/utils/cn';
import Text from '@/ui/components/Text/Text';

type Props = {
    avatarAriaLabel: string;
    badges: string[];
    displayName: string;
    email: string;
};

const AccountProfileCard: FC<Props> = ({
    avatarAriaLabel,
    badges,
    displayName,
    email,
}) => (
    <section
        className={cn(
            'bg-primary-purple shadow-drop flex w-full flex-col gap-4 rounded-2xl p-4 text-white',
        )}
    >
        <div className="flex items-center gap-4">
            <div
                aria-label={avatarAriaLabel}
                className={cn(
                    'bg-secondary-purple flex size-20 shrink-0 items-center justify-center rounded-full',
                )}
                role="img"
            >
                <FontAwesomeIcon
                    aria-hidden
                    className="size-16 scale-250 text-white"
                    icon={faUser}
                />
            </div>

            <div>
                <Text
                    variant="h2"
                    className="font-manrope w-full text-3xl font-bold text-white"
                >
                    {displayName}
                </Text>

                <Text
                    variant="body"
                    className="mb-2 truncate text-sm text-white/90"
                >
                    {email}
                </Text>
                <div className="flex flex-wrap gap-2">
                    {badges.map(badge => (
                        <span
                            key={badge}
                            className={cn(
                                'inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs',
                            )}
                        >
                            <Text
                                variant="body"
                                className="text-xs font-bold text-white"
                            >
                                {badge}
                            </Text>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default AccountProfileCard;
