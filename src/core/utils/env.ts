import { z } from 'zod';
import { envSchema, type EnvSchemaOutput } from '@/core/schemas/envSchema';

export type Env = EnvSchemaOutput;

// Cached validation result, this avoids re-validation on subsequent calls
let validatedEnv: Env | null;

export const validateEnv = (): Env => {
    if (validatedEnv) return validatedEnv;

    try {
        validatedEnv = envSchema.parse(process.env);
        return validatedEnv;
    } catch (error) {
        if (error instanceof z.ZodError) {
            const missingVars = error.errors.map(
                err => `${err.path.join('.')}: ${err.message}`,
            );
            throw new Error(
                `Environment variables validation failed.\n\n${missingVars.join('\n')}\n\nPlease check your .env file.`,
            );
        }
        throw error;
    }
};

// Force re-validation (useful for tests)
export const resetEnvValidation = (): void => {
    validatedEnv = null;
};

// Validate immediately when this module is imported
// This ensures validation happens at startup, not on every request
export const env = validateEnv();

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';

export default env;
