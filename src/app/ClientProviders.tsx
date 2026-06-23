'use client';

import type { DehydratedState } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { getQueryClient } from '@/core/utils/queryClient';

type ClientProvidersProps = PropsWithChildren<{
    dehydratedState?: DehydratedState;
}>;

export default function ClientProviders({
    children,
    dehydratedState,
}: ClientProvidersProps) {
    return (
        <QueryClientProvider client={getQueryClient()}>
            <HydrationBoundary state={dehydratedState}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="light"
                    enableSystem={false}
                    forcedTheme="light"
                >
                    {children}
                </ThemeProvider>
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
