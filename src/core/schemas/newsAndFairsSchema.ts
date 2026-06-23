import { z } from 'zod';

const hrefSchema = z.string().min(1);

export const fairItemSchema = z.object({
    id: z.string().min(1),
    category: z.literal('fairs'),
    title: z.string().min(1),
    dateMonth: z.string().min(1),
    dateDay: z.string().min(1),
    location: z.string().min(1),
    time: z.string().min(1),
    href: hrefSchema,
});

export const newsItemSchema = z.object({
    id: z.string().min(1),
    category: z.literal('news'),
    badge: z.string().min(1),
    title: z.string().min(1),
    relativeTime: z.string().min(1),
    imageSrc: z.string().min(1),
    imageAlt: z.string().min(1),
    href: hrefSchema,
});

export const educationItemSchema = z.object({
    id: z.string().min(1),
    category: z.literal('education'),
    badge: z.string().min(1),
    title: z.string().min(1),
    relativeTime: z.string().min(1),
    href: hrefSchema,
});

export const newsAndFairsItemSchema = z.discriminatedUnion('category', [
    fairItemSchema,
    newsItemSchema,
    educationItemSchema,
]);

export const newsAndFairsDataSchema = z.object({
    items: z.array(newsAndFairsItemSchema),
});

export type FairItem = z.infer<typeof fairItemSchema>;
export type NewsItem = z.infer<typeof newsItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type NewsAndFairsItem = z.infer<typeof newsAndFairsItemSchema>;
export type NewsAndFairsData = z.infer<typeof newsAndFairsDataSchema>;
