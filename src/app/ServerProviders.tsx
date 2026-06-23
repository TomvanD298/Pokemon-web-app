import { NextIntlClientProvider } from 'next-intl';

export default async function ServerProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
