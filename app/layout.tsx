import type { Metadata } from 'next';
import './globals.css';

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
