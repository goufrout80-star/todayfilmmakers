import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Today Film Makers — Brand Partnerships & Media Kit',
  description: 'Partner with Today Film Makers to reach a focused global audience of filmmakers through promotional distribution, custom content and long-term creative campaigns.',
  metadataBase: new URL('https://todayfilmmakers.com'),
  openGraph: {
    title: 'Today Film Makers — Brand Partnerships',
    description: 'Campaign formats, audience insights and partnership options for filmmaking, camera, editing, AI and creative-technology brands.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
