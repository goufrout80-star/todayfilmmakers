import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Today Film Makers — Create Today. Inspire Tomorrow.',
  description: 'Filmmaking techniques, creative breakdowns, tools and stories from a global community of filmmakers.',
  metadataBase: new URL('https://todayfilmmakers.com'),
  openGraph: {
    title: 'Today Film Makers',
    description: 'The global platform for filmmakers who want to create better films.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
