import { defineRouting } from 'next-intl/routing';
import { LOCALES } from '@/core/constants/locales';

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: LOCALES[0],
    localePrefix: 'always',
    localeDetection: false,
});

export default routing;
