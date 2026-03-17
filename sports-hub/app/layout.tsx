import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { PreferencesProvider } from '@/providers/PreferencesProvider';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Sports Hub — Your Weekend Sports Dashboard',
  description: 'Plan what sports to watch this weekend. Live scores, fixtures, and times in your timezone.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}>
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
