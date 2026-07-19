import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Sidebar } from '@/components/commons/Sidebar';
import { Providers } from '@/app/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MOODITOR',
  description: 'MOODITOR - AI Content Creation Tool',
  icons: {
    icon: '/assets/icons/mooditor-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-screen overflow-hidden">
        <Providers>
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
