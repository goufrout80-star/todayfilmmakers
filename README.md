# Today Film Makers

A cinematic brand-partnership media kit for the Today Film Makers filmmaking community. Built with Next.js, TypeScript and Framer Motion, and prepared for Vercel deployment.

## Included

- Cinematic responsive media-kit homepage
- Audience metrics, demographic breakdown and platform distribution
- Campaign formats, partnership packages and monthly campaign starting point
- Brand partnership contact page with campaign brief form
- Mobile navigation and scroll animation
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

Audience figures, campaign formats and public rates are defined in `app/page.tsx`. The contact form prepares a complete campaign brief in the visitor's email client and sends it to `hello@todayfilmmakers.com`. Connect it to Resend, Supabase or a CRM when server-side lead capture is required.

## Image credits

The current visual treatment uses Unsplash photography under the Unsplash License. Replace these remote images with original Today Film Makers campaign assets when available so the media kit can show verified brand work.
