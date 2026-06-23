import type * as React from 'react';
import * as rtl from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
    rtl.cleanup();
});

function render(ui: React.ReactElement, options = {}) {
    return rtl.render(ui, options);
}

export * from '@testing-library/react';
export { render };
