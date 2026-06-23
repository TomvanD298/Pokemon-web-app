import { Manrope } from 'next/font/google';
import localFont from 'next/font/local';

export const FONT_AWESOME = 'https://fontawesome.com/license/free';

export const manropeFont = Manrope({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-manrope-family',
});

export const fkScreamerFont = localFont({
    src: './FKScreamer.woff2',
    weight: '100 900',
    style: 'normal',
    display: 'swap',
    variable: '--font-fk-screamer',
    fallback: ['system-ui', 'sans-serif'],
    adjustFontFallback: 'Arial',
    preload: true,
});
