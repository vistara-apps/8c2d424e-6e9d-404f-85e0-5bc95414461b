import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'EchoScribe - Never miss a meeting detail',
  description: 'Record, transcribe, and get action items from your meetings',
  keywords: ['meeting', 'transcription', 'recording', 'AI', 'Base', 'MiniApp'],
  authors: [{ name: 'EchoScribe Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: 'hsl(220 70% 50%)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text-primary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
