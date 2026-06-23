import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const UTILS_COVERAGE_THRESHOLD = 60;
const isUtilsCoverage = process.env.VITEST_UTILS_COVERAGE === 'true';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest-setup.ts'],
        exclude: [...configDefaults.exclude, '.vscode'],
        coverage: {
            provider: 'v8',
            reporter: isUtilsCoverage
                ? ['text', 'cobertura', 'json-summary']
                : ['text', 'html', 'cobertura'],
            include: isUtilsCoverage
                ? ['src/core/utils/**/*.{ts,tsx}']
                : ['src/**/*.{ts,tsx}'],
            exclude: [
                '**/*.{test,spec}.{ts,tsx}',
                '**/*.d.ts',
                ...(configDefaults.coverage.exclude ?? []),
            ],
            thresholds: isUtilsCoverage
                ? {
                      lines: UTILS_COVERAGE_THRESHOLD,
                      statements: UTILS_COVERAGE_THRESHOLD,
                      branches: UTILS_COVERAGE_THRESHOLD,
                      functions: UTILS_COVERAGE_THRESHOLD,
                  }
                : undefined,
        },
    },
});
