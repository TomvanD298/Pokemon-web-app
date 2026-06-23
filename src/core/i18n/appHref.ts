import type { ComponentProps } from 'react';
import type { Link } from '@/core/i18n/navigation';

export type AppHref = ComponentProps<typeof Link>['href'];
