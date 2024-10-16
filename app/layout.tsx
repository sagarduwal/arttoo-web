import type { Metadata } from 'next';
import './globals.css';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Arttoo',
  description: 'Art Is The Visual Proof Of History For Humanity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='16x16' />
        <link rel='icon' href='/favicon-32x32.png' sizes='32x32' />
        <link rel='icon' href='/favicon-96x96.png' sizes='96x96' />
        <link rel='apple-touch-icon' href='/apple-icon-180x180.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='theme-color' content='#FFFFFF' />
      </Head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
