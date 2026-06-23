import { z } from 'zod';

export const envSchema = z
    .object({
        NODE_ENV: z
            .enum(['development', 'production', 'test'])
            .default('development'),
        NEXT_TELEMETRY_DISABLED: z.literal('1').default('1'),

        // Examples: for demo purposes only
        // EXAMPLE_PORT: z.coerce.number<string>().int().positive().default(3000),
        // EXAMPLE_DEBUG: z.coerce.boolean<string>().default(false),
        // EXAMPLE_ARRAY: z.string().transform(val => val.split(',')),
    })
    .readonly();

export type EnvSchemaInput = z.input<typeof envSchema>;

export type EnvSchemaOutput = z.output<typeof envSchema>;
