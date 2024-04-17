import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vision AI',
  description:
    'An ai vision app to see the world through the vision of ai for those who find difficult in seeing around. Also for blind people.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} bg-gray-950 text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
