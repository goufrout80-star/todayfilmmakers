# Today Film Makers

A cinematic editorial platform for the Today Film Makers community. Built with Next.js, TypeScript and Framer Motion, and prepared for Vercel deployment.

## Included

- Cinematic responsive homepage
- Tutorial library
- Creator directory
- Gear and tools editorial page
- Brand partnership page
- Creator submission page
- Mobile navigation and scroll animation
- SEO metadata, Open Graph image, robots.txt and sitemap
- Production build verified with Next.js

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

Tutorials, creators and imagery are managed in `data/content.ts`. The inquiry and submission interfaces are currently front-end forms; connect them to Resend, Supabase or your preferred CRM before collecting production submissions.

## Image credits

Demo photography is loaded from Unsplash and is used under the Unsplash License. Replace or expand the demo imagery with original Today Film Makers assets whenever available.
