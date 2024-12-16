import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AppProvider } from '@/data/context/AppContext';
import NextAuthSessionProvider from '@/providers/sessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DrTeeth',
    description: 'Development by Midilabs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="/dentalpix.ico" />
            </head>
            <body className={inter.className}>
                <NextAuthSessionProvider>
                    <AppProvider>{children}</AppProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
