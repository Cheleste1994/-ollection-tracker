import type { Metadata } from 'next';
import { Marck_Script } from 'next/font/google';
import { SITE_NAME } from '@/constants/seo.constants';
import Providers from './providers';
import { Toaster } from 'sonner';
import './globals.scss';
import Dashboard from '@/components/Dashboard/Dashboard';

const marc = Marck_Script({
  subsets: ['cyrillic', 'latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-marc',
  style: ['normal'],
  preload: true,
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'Collection items',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={marc.variable}>
        <Providers>
            <Dashboard />
            {children}
        </Providers>
        <Toaster position="bottom-right" richColors duration={2000} />
      </body>
    </html>
  );
}
