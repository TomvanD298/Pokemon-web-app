import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
    children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => children;

export default RootLayout;
