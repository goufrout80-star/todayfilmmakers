# Today Film Makers

A cinematic brand-partnership media kit for the Today Film Makers community. Built with Next.js, TypeScript and Framer Motion, and prepared for Vercel deployment.

## Included

- Text-only Apple-inspired hero with controlled cinematic motion
- Fixed opening-credits navigation with active-section feedback and a full-screen mobile menu
- Seamless editorial filmmaking craft rail
- Audience metrics, demographic breakdown and platform distribution
- Four-format campaign presentation
- Scroll-driven Campaign Proof sequence that transforms a wide idea into vertical impact
- Interactive Why Partner experience
- Cinematic partnership options with verified public rates
- Scroll-driven campaign process timeline
- Redesigned homepage and contact CTAs
- Brand partnership contact page with campaign brief form
- Interactive Quick Answers accordion
- Mobile navigation, responsive motion and reduced-motion support
- Responsive layout prepared for Vercel deployment

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Keep the detected framework as **Next.js**.
3. Use `npm run build` as the build command.
4. Deploy.
5. Connect the production domain and update `metadataBase`, `sitemap.ts`, and `robots.ts` if the final domain is different from `todayfilmmakers.com`.

## Content and forms

Audience figures, campaign formats and public rates are defined in `app/page.tsx`. The public figures are 530K+ combined community, 15.5M+ 90-day content views, 424K+ 90-day engagements and 5.2M+ 90-day unique viewers.

The contact form prepares a complete campaign brief in the visitor's email client and sends it to `hello@todayfilmmakers.com`. Connect it to Resend, Supabase or a CRM when server-side lead capture is required.

## Visual assets

The homepage hero and Campaign Proof experience use typography, CSS graphics and Framer Motion only. They do not depend on stock photography or video.
