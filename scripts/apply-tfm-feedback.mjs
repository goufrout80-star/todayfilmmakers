import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pagePath = path.join(root, 'app/page.tsx');
const layoutPath = path.join(root, 'app/layout.tsx');
const configPath = path.join(root, 'data/site-config.ts');
const cssPath = path.join(root, 'app/feedback-updates.css');
const faviconPath = path.join(root, 'app/favicon.ico');
const publicFaviconPath = path.join(root, 'public/favicon.ico');

function replaceOrThrow(source, search, replacement, label) {
  const next = typeof search === 'string' ? source.replace(search, replacement) : source.replace(search, replacement);
  if (next === source) throw new Error(`Could not apply replacement: ${label}`);
  return next;
}

fs.mkdirSync(path.dirname(configPath), { recursive: true });
fs.mkdirSync(path.dirname(publicFaviconPath), { recursive: true });

fs.writeFileSync(configPath, `export const siteConfig = {
  audience: {
    combined: '550K+',
    instagram: '320K+',
    facebook: '230K+',
  },
  contact: {
    website: 'hello@todayfilmmakers.com',
    social: 'collaborations@todayfilmmakers.com',
  },
} as const;
`);

let page = fs.readFileSync(pagePath, 'utf8');

if (!page.includes("import { siteConfig } from '../data/site-config';")) {
  page = replaceOrThrow(
    page,
    "import { MouseEvent, useEffect, useRef, useState } from 'react';",
    "import { MouseEvent, useEffect, useRef, useState } from 'react';\nimport { siteConfig } from '../data/site-config';",
    'site config import',
  );
}

page = replaceOrThrow(
  page,
  /const metrics = \[[\s\S]*?\n\];\n\nconst formats =/,
  `const metrics = [
  { value: siteConfig.audience.combined, label: 'Combined community', note: 'Filmmakers and creators across Instagram and Facebook' },
  { value: '15.5M+', label: 'Content views', note: 'Measured across the last 90 days' },
  { value: '424K+', label: 'Total engagements', note: 'Measured across the last 90 days' },
  { value: '5.2M+', label: 'Unique viewers', note: 'Measured across the last 90 days' },
];

const formats =`,
  'audience metrics config',
);

page = replaceOrThrow(
  page,
  /const formats = \[[\s\S]*?\n\];\n\nconst whyReasons =/,
  `const formats = [
  {
    icon: MonitorPlay,
    n: '01',
    title: 'Reels',
    text: 'Short-form video built for discovery, clear storytelling and strong viewer retention.',
  },
  {
    icon: Film,
    n: '02',
    title: 'Carousels',
    text: 'Swipeable visual stories that explain ideas, workflows and creative techniques step by step.',
  },
  {
    icon: Aperture,
    n: '03',
    title: 'Simple posts',
    text: 'Focused single-post content for useful ideas, announcements and fast creative inspiration.',
  },
];

const whyReasons =`,
  'simple content formats',
);

page = replaceOrThrow(
  page,
  /function CampaignProof\(\) \{[\s\S]*?\n\}\n\nfunction ProcessTimeline/,
  `function CampaignProof() {
  const proofSteps = [
    { number: '01', title: 'Find the angle', text: 'Start with the one product benefit filmmakers will understand immediately.' },
    { number: '02', title: 'Show the value', text: 'Place the product inside a clear filmmaking workflow or creative use case.' },
    { number: '03', title: 'Create the action', text: 'Finish with a direct reason to save, explore or contact the brand.' },
  ];

  return (
    <section className="resultsSection simpleResultsSection" id="results">
      <div className="pageShell simpleProof">
        <motion.div
          className="simpleProofIntro"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">03 — CAMPAIGN PROOF</span>
          <h2>A clear product story.<br /><i>Made for the feed.</i></h2>
          <p>We keep the campaign process simple: find the strongest idea, show the product clearly and guide the viewer toward one useful action.</p>
        </motion.div>

        <div className="simpleProofGrid">
          {proofSteps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline`,
  'simple campaign proof',
);

page = replaceOrThrow(
  page,
  "<div><Instagram /><strong>320K+</strong><span>Instagram followers</span></div>\n                <div><Globe2 /><strong>210K+</strong><span>Facebook followers</span></div>",
  "<div><Instagram /><strong>{siteConfig.audience.instagram}</strong><span>Instagram followers</span></div>\n                <div><Globe2 /><strong>{siteConfig.audience.facebook}</strong><span>Facebook followers</span></div>",
  'platform audience numbers',
);

page = replaceOrThrow(
  page,
  "<div className=\"geoNumber\">530K+<small>filmmakers and creators</small></div>",
  "<div className=\"geoNumber\">{siteConfig.audience.combined}<small>filmmakers and creators</small></div>",
  'global community number',
);

page = replaceOrThrow(
  page,
  `<span className="eyebrow">02 — CONTENT FORMATS</span>
            <h2>Campaigns designed to be<br /><i>seen, saved and remembered.</i></h2>
            <p>Each collaboration is adapted to the product, campaign goal and audience behavior, then shaped for the feed.</p>`,
  `<span className="eyebrow">02 — CONTENT FORMATS</span>
            <h2>Three formats.<br /><i>One clear creative standard.</i></h2>
            <p>Today Film Makers publishes Reels, carousels and simple posts. Collaboration packages and commercial details remain together in the options section below.</p>`,
  'content formats intro',
);

page = replaceOrThrow(
  page,
  `<p>{format.text}</p>
                  <div className="tagRow">{format.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <ArrowUpRight className="formatArrow" />`,
  `<p>{format.text}</p>`,
  'remove format commercial details',
);

page = replaceOrThrow(
  page,
  `<div className="footerBottom">
          <span>© 2026 TODAY FILM MAKERS</span>
          <div><a href="#audience">AUDIENCE</a><a href="#packages">OPTIONS</a><a href="/contact">CONTACT</a></div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>`,
  `<div className="footerBottom">
          <span>© 2026 TODAY FILM MAKERS</span>
          <div><a href="#audience">AUDIENCE</a><a href="#packages">OPTIONS</a><a href="/contact">CONTACT</a></div>
          <div className="footerEmails">
            <a href={\`mailto:\${siteConfig.contact.website}\`}>{siteConfig.contact.website}</a>
            <a href={\`mailto:\${siteConfig.contact.social}\`}>{siteConfig.contact.social}</a>
          </div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>`,
  'footer emails',
);

fs.writeFileSync(pagePath, page);

let layout = fs.readFileSync(layoutPath, 'utf8');
if (!layout.includes("import './feedback-updates.css';")) {
  layout = replaceOrThrow(
    layout,
    "import './globals.css';",
    "import './globals.css';\nimport './feedback-updates.css';",
    'feedback CSS import',
  );
}
fs.writeFileSync(layoutPath, layout);

fs.writeFileSync(cssPath, `/* Confirmed TFM website feedback - 4 August 2026 */

.formatCards {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  border: 0;
}

.formatCards article {
  min-height: 300px;
  padding: 28px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.68);
}

.formatCards article::before,
.formatCards .formatArrow,
.formatCards .tagRow {
  display: none;
}

.formatCards article:hover {
  background: #111;
  transform: translateY(-5px);
}

.formatCards h3 {
  margin: 78px 0 14px;
  font-size: clamp(30px, 3vw, 46px);
}

.formatCards p {
  margin: 0;
}

.simpleResultsSection {
  min-height: auto !important;
  height: auto !important;
  padding: 125px 0 !important;
  background: #0b0c10 !important;
  color: #f3f3ef !important;
  overflow: hidden !important;
}

.simpleProof {
  position: relative;
}

.simpleProofIntro {
  max-width: 880px;
  margin-bottom: 58px;
}

.simpleProofIntro .eyebrow {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 13px;
  border: 1px solid rgba(245, 201, 0, 0.3);
  border-radius: 999px;
  color: var(--yellow);
  background: rgba(245, 201, 0, 0.05);
}

.simpleProofIntro h2 {
  margin: 26px 0 22px;
  font-size: clamp(54px, 6.4vw, 94px);
  line-height: 0.92;
  letter-spacing: -0.06em;
  font-weight: 500;
}

.simpleProofIntro h2 i {
  color: var(--yellow);
  font-family: 'Italiana', serif;
  font-weight: 400;
}

.simpleProofIntro p {
  max-width: 680px;
  margin: 0;
  color: #a4a6ad;
  font-size: 14px;
  line-height: 1.75;
}

.simpleProofGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.simpleProofGrid article {
  min-height: 285px;
  padding: 28px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background 0.35s ease, color 0.35s ease, transform 0.35s ease;
}

.simpleProofGrid article:hover {
  background: var(--yellow);
  color: #111;
  transform: translateY(-4px);
}

.simpleProofGrid article > span {
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--yellow);
}

.simpleProofGrid article:hover > span {
  color: #111;
}

.simpleProofGrid h3 {
  margin: 105px 0 14px;
  font-size: clamp(26px, 2.8vw, 40px);
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 500;
}

.simpleProofGrid p {
  margin: 0;
  color: #90929a;
  font-size: 12px;
  line-height: 1.7;
}

.simpleProofGrid article:hover p {
  color: #34363a;
}

.footerBottom {
  align-items: flex-start;
}

.footerEmails {
  display: grid !important;
  gap: 7px !important;
  letter-spacing: 0 !important;
  text-transform: none;
}

.footerEmails a:first-child {
  color: var(--yellow);
}

@media (max-width: 900px) {
  .formatCards,
  .simpleProofGrid {
    grid-template-columns: 1fr;
  }

  .formatCards article,
  .simpleProofGrid article {
    min-height: 250px;
  }
}

@media (max-width: 600px) {
  .simpleResultsSection {
    padding: 88px 0 !important;
  }

  .simpleProofIntro h2 {
    font-size: 12vw;
  }

  .simpleProofGrid h3 {
    margin-top: 72px;
  }

  .footerEmails {
    order: 3;
  }
}
`);

const faviconBase64 = 'AAABAAEAdHQAAAEAIABeBQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAB0AAAAdAgGAAAAVJoWJwAABSVJREFUeJztnU9oXFUUxk9bpLYqRAUjlCyiIFjBVE0FQSl14UICBiELbcVZqNRCSEEXbUQzbkwpRlxUFBcidCVFqG5UXDgmFHHVQKm60hBKiNJGkbQJlTieY++ilM68e9+7757z5n0f/LaZe75fh86fO/cSIQiCIAiCIGYyzOxnmswJZpY5xywxbWMsubXNurVOMfvcDLXNLmaaOU36gmJyma6KnnYz9nTuYiaYM6RffCpk1nE3e8+kn3mPWSX9grWQ2WdcF5XNIPMBs0b6hVphzXUyWKBXlQwx86RfoFXmXUfmcxPzFnOF9EuzjnT0puvMZAaYOdIvqmrMue5MZZRZIf1yqsqK69BExph10i+l6qy7LlXzGvMv6ZfRK0iXh4IMRMwBjwWCfDwX4CFK5AE3Iiwc3Jh/mBFvGwXzCHOp5IE68vMX1F79sTvffuz3t558NPtvCc8/rTKrdLyziCif9DELCsPVUagg3+psz23LI18qDVZXocKnuW1lZFRxqDoLbVMJ71G3MovKQ9VZ6KJzEC1N5YHqLrTtHESJvBD6M9XCHxui9hMPd+bXr7IFfPOR32Pt9RTaPNh9TbduT9KNfDx4ewyhh1PJFH5v+ZWc8hmaxe4HkvVzuKjMbZR4oxaEduW8c5I7jZQyIdSLRhGhLQg1J7SVV6bse0n+Tcryd9kFvvEKtSdf7swLI36PNbij+98R5B9H1nqG0woVJ7l2ETZTyyTPZ+iWzenW8/ZBc89QIddXbKcSLxJC/TkV6JI2UcL3ntcCoV5cZDaHCB3SkAmhQQRtA21AqHmhjQCfdLSMRey8t/tHaMIf32cXmLK4qVez1/PSs9lz3bIt+tqOhggt5QXRyZni7/ksPkN9ePC+6GsLemF0FkLNCz0bInQBQs0LXQgRugyh5oUuhwgtZSe8j9BE3y1GpfWJitD1EKGlDA6h0YFQCIVQCIVQCIVQCLUDhEIohFoGQiEUQi0DoRAKoZaBUAiFUMtAKIRCqGUgFEIh1DIQCqEQahkIhVAItQyEQiiEWgZCIRRCLQOhEAqhloFQCIVQy0AohEKoZSAUQiHUMlUQWspP8j97N3twOf3y6w+7k1JW45ns9ficIKr9k/y/yigHh2ZEJejQDJyCYl/oQohQHDxlX2jQwVM4Gs6+0KCj4d4vo5yxp7KPBPcpJ5VMoekh9Phk9lz9d0ZfW9DhjWqXveJ4VW8aIUIfglDzQoMOQJbjry9CqFmhcnz8phChElwiYFdo8CUCkonEi4RQfyYCXf6fe0jhIh7crJSJOBnMI1TSglBzQlt5ZUoaEGpOaKOIULna8DyEmhG6RAWvm5TgQlg7QgtfCCuRa4JXUgn14e8f0gl9/UX9eR3y3rMvXN+Nc8TAQHUXeiSPuE7ZyiwaGKquQhedg6gZNTBYXYWO5lOWnc8NDFc3oSfzyvKJ/Kf8m/KAdRL6E0V8IdQpu5krikO2H8+4CdB3d0Dfbdm3Cg7crTbnJeb+/JrCMsJslDxQndlwHSeN2q6GGnAgwEPUjHsuEPgzHmSghIxRSTvta8a669JE9pDSlpUe4YLr0FQGmDnSL6dqzLnuzGaS9EuqCpM5O04e2WL4C+kXZpV5CtyGaSE3M8eYNdIv0AprrpNKp5+ZYVZJv1At5OeZ77gueiZ3MIeYc6RfcCrOuJlL/zxWO/JTi2nmNOmXHpPLzKybbVe0tiqYYWYfM8WcoKulyDNZNkVpS7qeJbe2WbfWJrPfzYAgCIIgCIJYyH+NIUyidjRC0QAAAABJRU5ErkJggg==';
const favicon = Buffer.from(faviconBase64, 'base64');
fs.writeFileSync(faviconPath, favicon);
fs.writeFileSync(publicFaviconPath, favicon);

console.log('Applied Today Film Makers feedback updates.');
