import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Task Manager',
    description: 'A beautiful task management application',
    manifest: '/manifest.json',
    icons: {
        apple: '/icons/icon-192x192.png',
    },
    themeColor: '#ffffff',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Task Manager" />
            <meta name="mobile-web-app-capable" content="yes" />
        </head>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}