'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Aperture,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Film,
  Globe2,
  Instagram,
  Menu,
  MonitorPlay,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';

const metrics = [
  { value: '530K+', label: 'Combined community', note: 'Filmmakers and creators across Instagram and Facebook' },
  { value: '15.5M+', label: 'Content views', note: 'Measured across the last 90 days' },
  { value: '424K+', label: 'Total engagements', note: 'Measured across the last 90 days' },
  { value: '5.2M+', label: 'Unique viewers', note: 'Measured across the last 90 days' },
];

const formats = [
  {
    icon: MonitorPlay,
    n: '01',
    title: 'Promotional video share',
    text: 'Your approved campaign video distributed to our filmmaking audience with clear positioning and a direct CTA.',
    tags: ['Instagram Reel', 'Facebook', 'Pinned comment'],
  },
  {
    icon: Film,
    n: '02',
    title: 'Custom content creation',
    text: 'A dedicated short-form concept created around your product, feature, workflow or filmmaker use case.',
    tags: ['Concept', 'Production', 'Cross-platform'],
  },
  {
    icon: Sparkles,
    n: '03',
    title: 'Product integration',
    text: 'Your tool is introduced naturally inside useful filmmaking content instead of appearing as a disconnected ad.',
    tags: ['Native mention', 'Workflow demo', 'Brand CTA'],
  },
  {
    icon: Target,
    n: '04',
    title: 'Long-term sponsorship',
    text: 'A consistent campaign system with recurring content, priority placement and stronger brand association over time.',
    tags: ['Recurring posts', 'Link placement', 'Custom plan'],
  },
];

const whyReasons = [
  {
    title: 'Focused audience',
    word: 'FOCUS',
    text: 'Your product lands inside a filmmaking community already interested in cameras, editing, AI and creative technology.',
  },
  {
    title: 'Native storytelling',
    word: 'STORY',
    text: 'We translate product features into a useful creative angle, so the campaign feels like content instead of an interruption.',
  },
  {
    title: 'Built for action',
    word: 'ACTION',
    text: 'Every story is shaped around the campaign goal, with a clear message, relevant distribution and a direct next step.',
  },
  {
    title: 'Clear reporting',
    word: 'SIGNAL',
    text: 'After publishing, we share campaign performance so the brand can understand the attention and response it earned.',
  },
];

const packages = [
  {
    label: 'FASTEST LAUNCH',
    number: '01',
    title: 'Promotional Video Share',
    price: '$350',
    text: 'For brands with a ready-made asset that already fits the filmmaking feed.',
    features: [
      'Distribution across agreed TFM channels',
      'Native caption adapted for our community',
      'Brand mention and campaign CTA',
      'Pinned comment when agreed',
      'Campaign performance summary',
    ],
    cta: 'Book a promotional share',
  },
  {
    label: 'MOST POPULAR',
    number: '02',
    title: 'Custom Content Creation',
    price: '$750',
    text: 'For brands that need an original story built around the product.',
    features: [
      'Creative strategy and concept development',
      'Script development and original production',
      'Product demonstration or workflow use case',
      'Brand approval before publishing',
      'Cross-platform distribution and reporting',
    ],
    cta: 'Start a custom campaign',
    featured: true,
  },
];

const processSteps = [
  { n: '01', label: 'Brief', title: 'Give us the objective.', text: 'Share the product, audience, goal, timeline and the deliverables you have in mind.' },
  { n: '02', label: 'Direction', title: 'We find the creative angle.', text: 'We shape the strongest format and filmmaker use case around the campaign goal.' },
  { n: '03', label: 'Production', title: 'The story takes form.', text: 'The campaign asset is prepared, reviewed and refined before anything is published.' },
  { n: '04', label: 'Release', title: 'We publish and report.', text: 'The campaign goes live across the agreed channels, followed by clear performance reporting.' },
];

const navigationItems = [
  { number: '01', label: 'Audience', href: '#audience', section: 'audience' },
  { number: '02', label: 'Formats', href: '#formats', section: 'formats' },
  { number: '03', label: 'Proof', href: '#results', section: 'results' },
  { number: '04', label: 'Options', href: '#packages', section: 'packages' },
];

const craftTopics = [
  { title: 'Cameras', note: 'Frame the world' },
  { title: 'Editing', note: 'Shape the story' },
  { title: 'AI tools', note: 'Build new workflows' },
  { title: 'Lighting', note: 'Control the mood' },
  { title: 'Audio', note: 'Capture the moment' },
  { title: 'Creative tech', note: 'Move the craft forward' },
];

const reveal = {
  hidden: { opacity: 0, y: 54 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function MagneticLink({
  children,
  href,
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 190, damping: 17 });
  const sy = useSpring(y, { stiffness: 190, damping: 17 });

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  };

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

function CampaignProof() {
  const proofRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);
  const { scrollYProgress } = useScroll({
    target: proofRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const frameWidth = useTransform(
    scrollYProgress,
    [0.08, 0.7],
    compact ? ['86vw', '70vw'] : ['82vw', '28vw'],
  );
  const frameRatio = useTransform(scrollYProgress, [0.08, 0.7], [16 / 9, 9 / 16]);
  const railX = useTransform(scrollYProgress, [0, 1], compact ? ['5%', '-48%'] : ['18%', '-28%']);
  const beforeOpacity = useTransform(scrollYProgress, [0, 0.42, 0.48], [1, 1, 0]);
  const beforeY = useTransform(scrollYProgress, [0, 0.46], ['0%', '-12%']);
  const afterOpacity = useTransform(scrollYProgress, [0.46, 0.56, 1], [0, 1, 1]);
  const afterY = useTransform(scrollYProgress, [0.46, 0.62], ['16%', '0%']);
  const cutScale = useTransform(scrollYProgress, [0.42, 0.49, 0.56], [0, 1, 0]);
  const accentScale = useTransform(scrollYProgress, [0.45, 0.76], [0.15, 1]);
  const wideOpacity = useTransform(scrollYProgress, [0.12, 0.43], [1, 0]);
  const verticalOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);
  const firstNoteOpacity = useTransform(scrollYProgress, [0.08, 0.42], [1, 0]);
  const secondNoteOpacity = useTransform(scrollYProgress, [0.48, 0.7], [0, 1]);

  return (
    <section className="resultsSection" id="results" ref={proofRef}>
      <div className="proofSticky">
        <div className="proofTopline">
          <span>03 — CAMPAIGN PROOF</span>
          <span>ONE IDEA, CUT WITH INTENTION</span>
        </div>

        <motion.div className="proofWordRail" style={{ x: railX }} aria-hidden="true">
          <span>HOOK</span>
          <i />
          <span>STORY</span>
          <i />
          <span>ACTION</span>
          <i />
          <span>HOOK</span>
        </motion.div>

        <motion.div className="proofCinemaFrame" style={{ width: frameWidth, aspectRatio: frameRatio }}>
          <motion.div className="proofFrameAccent" style={{ scaleY: accentScale }} />
          <motion.div className="proofCut" style={{ scaleX: cutScale }} />

          <motion.div className="proofFrameMessage proofFrameBefore" style={{ opacity: beforeOpacity, y: beforeY }}>
            <span>THE RAW MATERIAL</span>
            <strong>
              A PRODUCT
              <br />
              WITH FEATURES.
            </strong>
          </motion.div>

          <motion.div className="proofFrameMessage proofFrameAfter" style={{ opacity: afterOpacity, y: afterY }}>
            <span>THE TFM CUT</span>
            <strong>
              A STORY
              <br />
              <em>WORTH WATCHING.</em>
            </strong>
          </motion.div>

          <div className="proofFrameMeta">
            <motion.span style={{ opacity: wideOpacity }}>WIDE IDEA / 16:9</motion.span>
            <motion.span style={{ opacity: verticalOpacity }}>VERTICAL IMPACT / 9:16</motion.span>
          </div>
        </motion.div>

        <div className="proofBottomline">
          <div>
            <motion.p style={{ opacity: firstNoteOpacity }}>We find the reason to care.</motion.p>
            <motion.p style={{ opacity: secondNoteOpacity }}>We cut it for attention.</motion.p>
          </div>
          <span>SCROLL TO MAKE THE CUT ↓</span>
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: processRef, offset: ['start 70%', 'end 55%'] });
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 95,
    damping: 24,
  });

  return (
    <section className="processSection" ref={processRef}>
      <div className="pageShell processShell">
        <div className="processHeading">
          <span className="eyebrow">05 — HOW IT WORKS</span>
          <h2>
            From first brief
            <br />
            to <i>final frame.</i>
          </h2>
          <p>One connected production path, with a clear decision at every stage.</p>
        </div>

        <div className="processTimeline">
          <div className="processLine">
            <motion.i style={{ scaleY: progress }} />
          </div>
          {processSteps.map((step, index) => (
            <motion.article
              key={step.n}
              className={index % 2 ? 'right' : 'left'}
              initial={{ opacity: 0, x: index % 2 ? 54 : -54 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="processDot"><span>{step.n}</span></div>
              <div className="processCard">
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeWhy, setActiveWhy] = useState(0);
  const [navCompact, setNavCompact] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateNav = () => setNavCompact(window.scrollY > 48);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    return () => window.removeEventListener('scroll', updateNav);
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.section))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: '-32% 0px -58%', threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(680px circle at ${mouseX}% ${mouseY}%, rgba(245,201,0,.12), transparent 62%)`;
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(heroProgress, [0, 0.9], [1, 0.08]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 100]);

  return (
    <main
      onMouseMove={(event) => {
        mouseX.set((event.clientX / window.innerWidth) * 100);
        mouseY.set((event.clientY / window.innerHeight) * 100);
      }}
    >
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="loader"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image src="/logo.svg" width={220} height={92} alt="Today Film Makers" />
            <div className="loaderLine">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p>SETTING THE FRAME</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grain" />
      <motion.div className="ambientGlow" style={{ background: glow }} />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

      <header className={`nav${navCompact ? ' navCompact' : ''}${open ? ' navOpen' : ''}`}>
        <a className="brand" href="#top" aria-label="Today Film Makers home">
          <Image src="/logo.svg" width={86} height={38} alt="Today Film Makers" priority />
          <span className="brandSignal">
            <i />
            <span>GLOBAL FILMMAKING<br />COMMUNITY</span>
          </span>
        </a>
        <nav className="desktopNav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              className={activeSection === item.section ? 'navLink active' : 'navLink'}
              href={item.href}
            >
              <span className="navNumber">{item.number}</span>
              <span className="navLabel">
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </span>
            </a>
          ))}
        </nav>
        <MagneticLink className="navCta" href="/contact">
          <span>Start a campaign</span>
          <i><ArrowUpRight size={15} /></i>
        </MagneticLink>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <i>{open ? <X size={18} /> : <Menu size={18} />}</i>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileNav"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobileNavTop">
              <span>PRIMARY NAVIGATION</span>
              <span>TFM / BRAND DESK</span>
            </div>
            <div className="mobileNavLinks">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 46 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.07, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpen(false)}
                >
                  <span>{item.number}</span>
                  <strong>{item.label}</strong>
                  <ArrowUpRight />
                </motion.a>
              ))}
            </div>
            <motion.div
              className="mobileNavFooter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <span><i /> OPEN TO CREATIVE PARTNERSHIPS</span>
              <a href="/contact">Start a campaign <ArrowRight size={16} /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section className="dealHero" id="top" ref={heroRef} style={{ opacity: heroOpacity }}>
        <div className="heroAtmosphere" aria-hidden="true">
          <motion.i animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.35, 0.68, 0.35] }} transition={{ duration: 7, repeat: Infinity }} />
          <b />
        </div>
        <div className="heroGridLine" />
        <motion.div className="dealHeroCopy" style={{ y: heroTextY }}>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
          >
            THE FILMMAKING COMMUNITY FOR CREATIVE BRANDS
          </motion.span>
          <h1 aria-label="Where brands meet filmmakers">
            <span className="heroLine">
              <motion.b
                initial={{ y: '110%' }}
                animate={loaded ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                WHERE BRANDS
              </motion.b>
            </span>
            <span className="heroLine">
              <motion.b
                initial={{ y: '110%' }}
                animate={loaded ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                MEET <em>FILMMAKERS.</em>
              </motion.b>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.48 }}
          >
            We turn creative products into stories filmmakers want to watch, save and explore.
          </motion.p>
          <motion.div
            className="heroActions"
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.56 }}
          >
            <MagneticLink href="/contact" className="primaryAction">Start a brand partnership <ArrowRight size={16} /></MagneticLink>
            <a href="#audience" className="secondaryAction">Explore our audience <ArrowDownRight size={16} /></a>
          </motion.div>
        </motion.div>
        <div className="heroFoot">
          <span>FILMMAKING</span><i /><span>CAMERA</span><i /><span>EDITING</span><i /><span>AI</span><i /><span>CREATIVE TECHNOLOGY</span>
        </div>
      </motion.section>

      <section className="brandTicker" aria-label="Filmmaking topics covered by Today Film Makers">
        <div className="tickerMeta">
          <span>THE CRAFT, IN MOTION</span>
          <span>TOOLS / TECH / CULTURE</span>
        </div>
        <div className="tickerViewport">
          <div className="tickerTrack">
            {[0, 1].map((copy) => (
              <div className="tickerGroup" key={copy} aria-hidden={copy === 1}>
                {craftTopics.map((topic) => (
                  <div className="tickerItem" key={`${copy}-${topic.title}`}>
                    <b>{topic.title}</b>
                    <em>{topic.note}</em>
                    <i>+</i>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="audienceSection" id="audience">
        <div className="pageShell">
          <motion.div className="sectionIntro" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
            <span className="eyebrow">01 — THE AUDIENCE</span>
            <h2>Over half a million filmmakers.<br />Millions of <i>verified views.</i></h2>
            <p>
              Our audience follows Today Film Makers to discover filmmaking techniques, tools, workflows and creative
              inspiration. That creates a natural environment for product education and brand discovery.
            </p>
          </motion.div>

          <div className="metricGrid">
            {metrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <span>0{index + 1}</span>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.note}</p>
              </motion.article>
            ))}
          </div>

          <div className="analyticsGrid">
            <article className="analyticsPanel agePanel">
              <div className="panelHeader"><span>Age breakdown</span><small>Audience insight</small></div>
              {[['18–24', '27%'], ['25–34', '52%'], ['35–44', '14%'], ['Other', '7%']].map(([age, value]) => (
                <div className="barRow" key={age}>
                  <span>{age}</span><div><i style={{ width: value }} /></div><b>{value}</b>
                </div>
              ))}
            </article>
            <article className="analyticsPanel">
              <div className="panelHeader"><span>Platform distribution</span><small>Community size</small></div>
              <div className="platformSplit">
                <div><Instagram /><strong>320K+</strong><span>Instagram followers</span></div>
                <div><Globe2 /><strong>210K+</strong><span>Facebook followers</span></div>
              </div>
            </article>
            <article className="analyticsPanel interestPanel">
              <div className="panelHeader"><span>Audience interests</span><small>High-intent creative categories</small></div>
              <div className="interestTags">
                {['Filmmaking', 'Cinematography', 'Video editing', 'Camera gear', 'Lighting', 'AI tools', 'Audio', 'VFX', 'Creative technology'].map((interest) => <span key={interest}>{interest}</span>)}
              </div>
            </article>
            <article className="analyticsPanel geoPanel">
              <div className="panelHeader"><span>Global audience</span><small>Key creative markets</small></div>
              <div className="geoNumber">530K+<small>filmmakers and creators</small></div>
              <p>Our community reaches creative audiences across the United States, Philippines, United Kingdom and France.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="formatsSection" id="formats">
        <div className="pageShell">
          <div className="sectionIntro compact">
            <span className="eyebrow">02 — CONTENT FORMATS</span>
            <h2>Campaigns designed to be<br /><i>seen, saved and remembered.</i></h2>
            <p>Each collaboration is adapted to the product, campaign goal and audience behavior, then shaped for the feed.</p>
          </div>
          <div className="formatCards">
            {formats.map((format) => {
              const Icon = format.icon;
              return (
                <motion.article key={format.n} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
                  <div><span>{format.n}</span><Icon /></div>
                  <h3>{format.title}</h3>
                  <p>{format.text}</p>
                  <div className="tagRow">{format.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <ArrowUpRight className="formatArrow" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CampaignProof />

      <section className="whySection">
        <div className="pageShell">
          <div className="whyExperience">
            <div className="whySticky">
              <span className="eyebrow">WHY PARTNER WITH TFM</span>
              <h2>The right audience is only the beginning.</h2>
              <div className="whySignal" aria-hidden="true">
                <motion.div
                  className="signalOrbit"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                >
                  <i /><i /><i />
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.strong
                    key={whyReasons[activeWhy].word}
                    initial={{ opacity: 0, scale: 0.72, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
                  >
                    {whyReasons[activeWhy].word}
                  </motion.strong>
                </AnimatePresence>
              </div>
            </div>

            <div className="whyRows">
              {whyReasons.map((reason, index) => (
                <motion.article
                  key={reason.title}
                  className={activeWhy === index ? 'active' : ''}
                  onMouseEnter={() => setActiveWhy(index)}
                  onFocus={() => setActiveWhy(index)}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                >
                  <span>0{index + 1}</span>
                  <div><h3>{reason.title}</h3><p>{reason.text}</p></div>
                  <ArrowUpRight />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="packagesSection" id="packages">
        <div className="pageShell">
          <div className="optionsHeading">
            <span className="eyebrow">04 — COLLABORATION OPTIONS</span>
            <h2>Two ways in.<br /><i>One standard of craft.</i></h2>
            <p>Choose the starting point. We shape the final scope around the campaign.</p>
          </div>

          <div className="packageGrid">
            {packages.map((pack) => (
              <motion.article
                className={pack.featured ? 'packageCard featured' : 'packageCard'}
                key={pack.title}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="packageVisual" aria-hidden="true">
                  <motion.i
                    animate={{ rotate: pack.featured ? 360 : -360 }}
                    transition={{ duration: pack.featured ? 18 : 24, repeat: Infinity, ease: 'linear' }}
                  />
                  <strong>{pack.number}</strong>
                  <span>{pack.featured ? 'CREATE' : 'SHARE'}</span>
                </div>
                <div className="packageTop">
                  <span className="packageLabel">{pack.label}</span>
                  <div className="price"><small>Starting at</small><strong>{pack.price}</strong></div>
                </div>
                <h3>{pack.title}</h3>
                <p>{pack.text}</p>
                <ul>
                  {pack.features.map((item) => <li key={item}><Check />{item}</li>)}
                </ul>
                <a href="/contact"><span>{pack.cta}</span><ArrowRight /></a>
              </motion.article>
            ))}
          </div>

          <div className="customPackage">
            <div className="customIndex"><span>03</span><Aperture /></div>
            <div>
              <span>CUSTOM PARTNERSHIP</span>
              <h3>Build a longer campaign arc.</h3>
              <p>Monthly campaigns start at $2,500 for recurring content, sponsorship placement and multi-platform distribution.</p>
            </div>
            <a href="/contact">Request a campaign quote <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <ProcessTimeline />

      <section className="finalDealCta">
        <div className="ctaAtmosphere" aria-hidden="true">
          <motion.i animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
          <motion.b animate={{ scale: [0.8, 1.08, 0.8], opacity: [0.35, 0.75, 0.35] }} transition={{ duration: 5.5, repeat: Infinity }} />
        </div>
        <div className="ctaMarquee"><span>READY WHEN YOU ARE · READY WHEN YOU ARE · READY WHEN YOU ARE · READY WHEN YOU ARE ·</span></div>
        <div className="finalCtaContent">
          <span className="eyebrow">START A BRAND PARTNERSHIP</span>
          <h2>THE NEXT FRAME<br /><i>IS YOURS.</i></h2>
          <p>Tell us what you are launching. We will find the campaign angle built for filmmakers.</p>
          <MagneticLink href="/contact" className="ctaLaunch">
            <span>Start the conversation</span><ArrowUpRight />
          </MagneticLink>
        </div>
      </section>

      <footer>
        <div className="footerTop">
          <Image src="/logo.svg" alt="Today Film Makers" width={128} height={58} />
          <div><span>BRAND PARTNERSHIPS</span><h2>MAKE THE NEXT<br />FRAME COUNT.</h2></div>
        </div>
        <div className="footerBottom">
          <span>© 2026 TODAY FILM MAKERS</span>
          <div><a href="#audience">AUDIENCE</a><a href="#packages">OPTIONS</a><a href="/contact">CONTACT</a></div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
