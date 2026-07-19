'use client';

import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Clapperboard,
  Menu,
  MousePointer2,
  Play,
  Quote,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { MouseEvent, useRef, useState } from 'react';

const films = [
  { title: 'Lighting Faces Like Cinema', tag: 'LIGHTING', duration: '08:12', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=90' },
  { title: 'The Anatomy of a Match Cut', tag: 'EDITING', duration: '06:45', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90' },
  { title: 'One Lens. Infinite Stories.', tag: 'CINEMATOGRAPHY', duration: '11:20', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90' },
  { title: 'Building Atmosphere with Sound', tag: 'SOUND', duration: '05:38', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1800&q=90' },
];

const creators = [
  { name: 'Natalie Lynn', role: 'Director / Visual Artist', city: 'Los Angeles', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Miles Carter', role: 'Cinematographer', city: 'London', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Amara Okafor', role: 'Filmmaker / Editor', city: 'Berlin', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=90' },
];

const formats = [
  { icon: Clapperboard, title: 'Dedicated Stories', text: 'Concept-led videos built around the way filmmakers actually discover and learn tools.' },
  { icon: Zap, title: 'Integrated Features', text: 'Natural product integration inside educational content, breakdowns and creator workflows.' },
  { icon: Target, title: 'Launch Campaigns', text: 'Multi-platform campaigns engineered for attention, retention and qualified creative audiences.' },
];

const reveal = {
  hidden: { opacity: 0, y: 58 },
  show: { opacity: 1, y: 0, transition: { duration: .95, ease: [0.16, 1, 0.3, 1] } },
};

function MagneticLink({ children, href, className = '' }: { children: React.ReactNode; href: string; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16 });
  const sy = useSpring(y, { stiffness: 180, damping: 16 });

  function move(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * .22);
    y.set((e.clientY - r.top - r.height / 2) * .22);
  }

  return <motion.a href={href} className={className} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.a>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const partnerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(650px circle at ${mouseX}% ${mouseY}%, rgba(217,255,67,.18), transparent 60%)`;
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const { scrollYProgress: partnerProgress } = useScroll({ target: partnerRef, offset: ['start end', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.13]);
  const heroOpacity = useTransform(heroProgress, [0, .8], [1, .18]);
  const partnerImageY = useTransform(partnerProgress, [0, 1], ['-8%', '8%']);

  return <main onMouseMove={(e) => { mouseX.set((e.clientX / innerWidth) * 100); mouseY.set((e.clientY / innerHeight) * 100); }}>
    <div className="grain" />
    <motion.div className="ambientGlow" style={{ background: glow }} />
    <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

    <header className="nav">
      <a href="#top" className="brand"><Image src="/logo.svg" alt="Today Film Makers" width={82} height={38} /></a>
      <nav>{['Stories', 'Techniques', 'Creators', 'Impact'].map(x => <a key={x} href={'#' + x.toLowerCase()}>{x}</a>)}</nav>
      <MagneticLink className="navCta" href="#partner">Partner with us <ArrowUpRight size={15} /></MagneticLink>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
    </header>

    {open && <motion.div className="mobileNav" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}>
      {['Stories', 'Techniques', 'Creators', 'Impact', 'Partner'].map((x, i) => <motion.a initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1 + i * .055 }} key={x} href={'#' + x.toLowerCase()} onClick={() => setOpen(false)}><span>0{i + 1}</span>{x}<ArrowUpRight /></motion.a>)}
    </motion.div>}

    <motion.section id="top" className="hero" ref={heroRef} style={{ opacity: heroOpacity }}>
      <motion.div className="heroMedia" style={{ y: heroY, scale: heroScale }}><Image fill priority src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2400&q=92" alt="Cinema audience" /><div className="shade" /></motion.div>
      <div className="heroFrame"><span>REC</span><span>24 FPS</span><span>4K / RAW</span><span>00:17:26</span></div>
      <div className="heroTop"><span>GLOBAL FILMMAKING COMMUNITY</span><span>EST. 2017</span></div>
      <motion.div className="heroCopy" initial="hidden" animate="show" variants={reveal}>
        <p>Techniques, stories and tools for the next generation of filmmakers.</p>
        <h1><span>CREATE</span><br /><em>TODAY.</em></h1>
        <div className="heroBottom"><MagneticLink href="#stories" className="circleBtn"><Play fill="currentColor" size={22} /></MagneticLink><h2>INSPIRE TOMORROW.</h2></div>
      </motion.div>
      <a className="scroll" href="#manifesto">SCROLL TO EXPLORE <ArrowDownRight size={16} /></a>
    </motion.section>

    <section id="manifesto" className="manifesto">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }} variants={reveal}>
        <span className="eyebrow">01 — OUR PURPOSE</span>
        <p>Every unforgettable frame begins with a decision. We reveal those decisions, champion the people making them, and turn inspiration into <em>craft.</em></p>
      </motion.div>
      <div className="manifestoStats"><div><strong>370K+</strong><span>FILMMAKERS</span></div><div><strong>180M+</strong><span>ANNUAL VIEWS</span></div><div><strong>190+</strong><span>COUNTRIES</span></div></div>
    </section>

    <section id="stories" className="stories">
      <div className="sectionHead"><div><span className="eyebrow">02 — FEATURED STORIES</span><h2>LEARN THE<br /><i>LANGUAGE</i> OF FILM.</h2></div><a href="#techniques">VIEW ALL STORIES <ArrowUpRight /></a></div>
      <div className="filmGrid">{films.map((f, i) => <motion.article key={f.title} className="filmCard" initial="hidden" whileInView="show" viewport={{ once: true, amount: .12 }} variants={reveal}>
        <div className="filmImg"><Image fill src={f.img} alt={f.title} /><div className="filmOverlay"><span className="play"><Play fill="currentColor" /></span></div><span className="number">0{i + 1}</span><span className="duration">{f.duration}</span></div>
        <div className="filmMeta"><div><span>{f.tag}</span><h3>{f.title}</h3></div><ArrowUpRight /></div>
      </motion.article>)}</div>
    </section>

    <section id="techniques" className="ticker"><div>CAMERA MOVEMENT <Sparkles /> LIGHTING <Sparkles /> EDITING <Sparkles /> DIRECTING <Sparkles /> SOUND DESIGN <Sparkles /> VFX <Sparkles /> CAMERA MOVEMENT <Sparkles /> LIGHTING <Sparkles /></div></section>

    <section className="feature">
      <div className="featureMedia"><Image fill src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=92" alt="Cinema camera" /><div className="focusCorners"/><span>MASTERCLASS 001</span><button aria-label="Play masterclass"><Play fill="currentColor" /></button></div>
      <motion.div className="featureCopy" initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} variants={reveal}><span className="eyebrow">THE CRAFT, DECONSTRUCTED</span><h2>DON&apos;T JUST<br />WATCH THE SHOT.<br /><i>FEEL WHY IT WORKS.</i></h2><p>Frame-by-frame breakdowns reveal how light, movement, composition and sound turn an image into an emotion.</p><a className="textLink" href="#creators">EXPLORE TECHNIQUES <ArrowUpRight /></a></motion.div>
    </section>

    <section className="quoteSection">
      <Quote size={34}/><motion.blockquote initial={{ opacity: .18 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }}>“Cinema is not only what we see. It is what remains in us after the screen goes dark.”</motion.blockquote><span>TODAY FILM MAKERS — MANIFESTO</span>
    </section>

    <section id="creators" className="creators">
      <div className="sectionHead light"><div><span className="eyebrow">03 — THE COMMUNITY</span><h2>MEET THE<br /><i>MAKERS.</i></h2></div><p>Original voices. Singular visions.<br />The people moving cinema forward.</p></div>
      <div className="creatorGrid">{creators.map((c, i) => <motion.article className="creator" key={c.name} whileHover="hover"><div className="creatorImg"><Image fill src={c.img} alt={c.name} /><motion.span variants={{ hover: { scale: 1.15 } }}>0{i + 1}</motion.span><div className="creatorHover"><MousePointer2/><span>VIEW PROFILE</span></div></div><div className="creatorInfo"><div><h3>{c.name}</h3><p>{c.role}</p></div><span>{c.city}</span></div></motion.article>)}</div>
    </section>

    <section id="impact" className="impact">
      <div className="impactTop"><span className="eyebrow">04 — DESIGNED FOR ATTENTION</span><h2>NOT MORE NOISE.<br /><i>MORE MEANING.</i></h2></div>
      <div className="impactRail">
        <div><span>01</span><h3>EDUCATION FIRST</h3><p>Your product enters through useful, watchable ideas—not interruption.</p></div>
        <div><span>02</span><h3>CREATOR NATIVE</h3><p>Every concept is shaped for the visual language filmmakers already trust.</p></div>
        <div><span>03</span><h3>MULTI-PLATFORM</h3><p>One creative system adapted across Instagram, Facebook, TikTok and more.</p></div>
        <div><span>04</span><h3>BUILT TO LAST</h3><p>Evergreen content that continues earning attention after launch day.</p></div>
      </div>
    </section>

    <section id="partner" className="partner" ref={partnerRef}>
      <div className="partnerVisual"><motion.div className="partnerImage" style={{ y: partnerImageY }}><Image fill src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=2000&q=92" alt="Film set" /></motion.div><div className="partnerBadge"><span>REACH</span><strong>370K+</strong><small>CREATIVE PROFESSIONALS</small></div></div>
      <div className="partnerCopy"><span className="eyebrow">05 — PARTNER WITH TODAY FILM MAKERS</span><h2>PUT YOUR BRAND<br />INSIDE THE<br /><i>CONVERSATION.</i></h2><p className="partnerLead">We build creator-led campaigns around education, inspiration and genuine product relevance—so your brand earns attention instead of renting it.</p>
        <div className="partnerChecks"><span><Check/> Custom campaign concept</span><span><Check/> Multi-platform distribution</span><span><Check/> Performance reporting</span><span><Check/> Full production support</span></div>
        <MagneticLink href="mailto:hello@todayfilmmakers.com" className="circleText">START A CAMPAIGN <ArrowUpRight /></MagneticLink>
      </div>
    </section>

    <section className="formats">
      <div className="formatsHead"><span className="eyebrow">PARTNERSHIP FORMATS</span><h2>BUILT AROUND<br /><i>YOUR OBJECTIVE.</i></h2></div>
      <div className="formatGrid">{formats.map((f, i) => <motion.article key={f.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}><div><span>0{i + 1}</span><f.icon/></div><h3>{f.title}</h3><p>{f.text}</p><ArrowRight/></motion.article>)}</div>
    </section>

    <section className="campaignProof">
      <div className="proofVisual"><Image fill src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90" alt="Campaign still"/><span>SELECTED CAMPAIGN / 2026</span></div>
      <div className="proofCopy"><span className="eyebrow">FROM PRODUCT TO STORY</span><h2>THE TOOL BECAME<br />THE <i>TECHNIQUE.</i></h2><p>A product-led tutorial designed to demonstrate real creative value while preserving the voice and trust of the community.</p><div className="proofStats"><div><strong>3.8M</strong><span>TOTAL VIEWS</span></div><div><strong>8.4%</strong><span>ENGAGEMENT</span></div><div><strong>4</strong><span>PLATFORMS</span></div></div><a href="mailto:hello@todayfilmmakers.com">REQUEST THE MEDIA KIT <ArrowUpRight/></a></div>
    </section>

    <section className="finalCta"><span>HAVE A STORY WORTH FILMING?</span><h2>LET&apos;S MAKE<br /><i>PEOPLE FEEL IT.</i></h2><MagneticLink href="mailto:hello@todayfilmmakers.com" className="finalButton">START A CONVERSATION <ArrowUpRight/></MagneticLink></section>

    <footer><div className="footerTop"><Image src="/logo.svg" alt="TFM" width={120} height={50} /><h2>TODAY FILM<br />MAKERS</h2><p>Create Today.<br />Inspire Tomorrow.</p></div><div className="footerBottom"><span>© 2026 TODAY FILM MAKERS</span><div><a href="#">INSTAGRAM</a><a href="#">YOUTUBE</a><a href="#">TIKTOK</a></div><a href="#top">BACK TO TOP ↑</a></div></footer>
  </main>;
}
