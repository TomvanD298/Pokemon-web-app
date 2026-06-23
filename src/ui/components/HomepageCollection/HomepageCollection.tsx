import type { FC } from 'react';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/core/i18n/navigation';
import cn from '@/core/utils/cn';
import HomepageCollectionProgressBar from '@/ui/components/HomepageCollectionProgressBar/HomepageCollectionProgressBar';
import Text from '@/ui/components/Text/Text';

const COLLECTION_VALUE = '€ 1172.42';
const GROWTH_PERCENT = 2.3;
const COMPLETION_PERCENT = 78;

const HomepageCollection: FC = async () => {
    const t = await getTranslations('HomepageCollection');

    return (
        <section
            aria-labelledby="homepage-collection-heading"
            className="bg-purple-gradient shadow-drop flex h-full w-full min-w-0 flex-col gap-2 rounded-2xl p-6 text-white"
        >
            <Text
                id="homepage-collection-heading"
                variant="h2"
                className="font-heading text-5xl font-normal"
            >
                {t('title')}
            </Text>

            <div className="flex flex-wrap items-end gap-3">
                <Text
                    variant="h1"
                    className="font-manrope text-5xl leading-none font-bold"
                >
                    {COLLECTION_VALUE}
                </Text>
                <span
                    className={cn(
                        'inline-flex items-center gap-1.5 rounded-full',
                        'bg-white/15 px-3 py-1',
                    )}
                >
                    <FontAwesomeIcon
                        aria-hidden
                        className="size-3.5"
                        icon={faArrowTrendUp}
                    />
                    <Text variant="body" className="text-sm font-bold">
                        {t('growth', { percent: GROWTH_PERCENT })}
                    </Text>
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4">
                    <Text variant="body" className="text-sm font-extralight">
                        {t('collectionComplete')}
                    </Text>
                    <Text variant="body" className="text-sm font-extralight">
                        {t('completionPercent', {
                            percent: COMPLETION_PERCENT,
                        })}
                    </Text>
                </div>
                <HomepageCollectionProgressBar
                    ariaLabel={t('collectionComplete')}
                    value={COMPLETION_PERCENT}
                />
            </div>

            <Link
                className={cn(
                    'inline-flex w-fit items-center justify-center rounded-full',
                    'mt-2 bg-black px-6 py-3',
                    'outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
                )}
                href="/collection"
            >
                <Text
                    variant="body"
                    className="text-sm font-bold tracking-wide uppercase"
                >
                    {t('viewCollection')}
                </Text>
            </Link>
        </section>
    );
};

export default HomepageCollection;
