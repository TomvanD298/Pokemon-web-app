import type { EnvSchemaInput } from '@/core/schemas/envSchema';

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface ProcessEnv extends EnvSchemaInput {}
    }
}
export {};
