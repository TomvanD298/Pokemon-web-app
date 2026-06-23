import type { formats } from '@/core/i18n/request';
import type { routing } from '@/core/i18n/routing';
import type en from '../../translations/en.json';

declare module 'next-intl' {
    interface AppConfig {
        Formats: typeof formats;
        Locale: (typeof routing.locales)[number];
        Messages: typeof en;
    }
}
