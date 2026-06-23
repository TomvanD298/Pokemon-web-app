import type { FC } from 'react';
import type { CollectionCardPriceHistoryPoint } from '@/core/schemas/collectionCardDetailSchema';

type Props = {
    currency: string;
    points: CollectionCardPriceHistoryPoint[];
    pointLabels: string[];
};

const CHART_WIDTH = 280;
const CHART_HEIGHT = 240;
const PADDING_LEFT = 4;
const PADDING_RIGHT = 8;
const PLOT_TOP = 24;
const PLOT_BOTTOM = 200;
const BASELINE_Y = 230;

const LINE_COLOR = 'var(--tc-secondary-purple)';
const FILL_COLOR =
    'color-mix(in srgb, var(--tc-secondary-purple) 28%, transparent)';

const CollectionCardDetailPriceChart: FC<Props> = ({
    currency,
    points,
    pointLabels,
}) => {
    const prices = points.map(point => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const plotWidth = CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT;

    const coordinates = points.map((point, index) => {
        const x =
            PADDING_LEFT + (index / Math.max(points.length - 1, 1)) * plotWidth;
        const normalized = (point.price - minPrice) / priceRange;
        const y = PLOT_BOTTOM - normalized * (PLOT_BOTTOM - PLOT_TOP);

        return { x, y };
    });

    const linePath = coordinates
        .map((coordinate, index) =>
            index === 0
                ? `M ${coordinate.x} ${coordinate.y}`
                : `L ${coordinate.x} ${coordinate.y}`,
        )
        .join(' ');

    const areaPath = `${linePath} L ${coordinates.at(-1)?.x ?? PADDING_LEFT} ${PLOT_BOTTOM} L ${coordinates[0]?.x ?? PADDING_LEFT} ${PLOT_BOTTOM} Z`;

    const formatAxisPrice = (price: number): string =>
        `${currency} ${price.toFixed(2)}`;

    return (
        <div className="flex w-full min-w-0 flex-col">
            <svg
                aria-hidden
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                className="h-auto w-full"
                preserveAspectRatio="xMidYMid meet"
            >
                <rect
                    fill="var(--tc-background-light-primary)"
                    height={BASELINE_Y}
                    rx="8"
                    width={CHART_WIDTH}
                    x="0"
                    y="0"
                />

                <text
                    fill="currentColor"
                    fontSize="16"
                    fontWeight="500"
                    x={PADDING_LEFT}
                    y={16}
                >
                    {formatAxisPrice(maxPrice)}
                </text>

                <line
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    strokeOpacity="0.35"
                    x1={PADDING_LEFT}
                    x2={CHART_WIDTH - PADDING_RIGHT}
                    y1={PLOT_TOP}
                    y2={PLOT_TOP}
                />

                <path d={areaPath} fill={FILL_COLOR} />
                <path
                    d={linePath}
                    fill="none"
                    stroke={LINE_COLOR}
                    strokeLinejoin="round"
                    strokeWidth="2"
                />

                <line
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    strokeOpacity="0.35"
                    x1={PADDING_LEFT}
                    x2={CHART_WIDTH - PADDING_RIGHT}
                    y1={PLOT_BOTTOM}
                    y2={PLOT_BOTTOM}
                />

                <text
                    fill="currentColor"
                    fontSize="16"
                    fontWeight="500"
                    x={PADDING_LEFT}
                    y={PLOT_BOTTOM + 16}
                >
                    {formatAxisPrice(minPrice)}
                </text>

                <line
                    stroke="currentColor"
                    x1={PADDING_LEFT}
                    x2={CHART_WIDTH - PADDING_RIGHT}
                    y1={BASELINE_Y}
                    y2={BASELINE_Y}
                />
            </svg>

            <div className="flex w-full justify-between px-1 text-xs font-medium text-black">
                {pointLabels.map(label => (
                    <span key={label}>{label}</span>
                ))}
            </div>
        </div>
    );
};

export default CollectionCardDetailPriceChart;
