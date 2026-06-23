import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...classNames: ClassValue[]): string {
    return twMerge(clsx(classNames));
}
