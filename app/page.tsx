'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Camera, Menu, Play, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const films = [
  { title: 'Lighting Faces Like Cinema', tag: 'LIGHTING', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85' },
  { title: 'The Anatomy of a Match Cut', tag: 'EDITING', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85' },
  { title: 'One Lens. Infinite Stories.', tag: 'CINEMATOGRAPHY', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85' },
  { title: 'Building Atmosphere with Sound', tag: 'SOUND', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85' }
];

const creators = [
  { name: 'Natalie Lynn', role: 'Director / Visual Artist', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85' },
  { name: 'Miles Carter', role: 'Cinematographer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85' },
  { name: 'Amara Okafor', role: 'Filmmaker / Editor', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85' }
];

const reveal = { hidden: { opacity: 0, y: 42 }, show: { opacity: 1, y: 0, transition: { duration: .8, ease: [.22, 1, .36, 1] } } };

export default function Home() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, .32], [0, 140]);

  return <main>
    <div className="grain" />
    <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

    <header className="nav">
      <a href="#top" className="brand"><Image src="/logo.svg" alt="Today Film Makers" width={78} height={34} /></a>
      <nav>{['Stories', 'Techniques', 'Creators', 'Gear'].map(x => <a key={x} href={'#' + x.toLowerCase()}>{x}</a>)}</nav>
      <a className="navCta" href="#partner">Partner with us <ArrowUpRight size={15} /></a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
    </header>

    {open && <motion.div className="mobileNav" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {['Stories', 'Techniques', 'Creators', 'Gear', 'Partner'].map((x, i) => <motion.a initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * .06 }} key={x} href={'#' + x.toLowerCase()} onClick={() => setOpen(false)}>{x}<ArrowUpRight /></motion.a>)}
    </motion.div>}

    <section id="top" className="hero">
      <motion.div className="heroMedia" style={{ y: heroY }}><Image fill priority src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2200&q=90" alt="Cinema audience" /><div className="shade" /></motion.div>
      <div className="heroTop"><span>GLOBAL FILMMAKING COMMUNITY</span><span>EST. 2017</span></div>
      <motion.div className="heroCopy" initial="hidden" animate="show" variants={reveal}>
        <p>Techniques, stories and tools for the next generation of filmmakers.</p>
        <h1>CREATE<br /><em>TODAY.</em></h1>
        <div className="heroBottom"><a href="#stories" className="circleBtn"><Play fill="currentColor" size={22} /></a><h2>INSPIRE TOMORROW.</h2></div>
      </motion.div>
      <a className="scroll" href="#manifesto">SCROLL TO EXPLORE <ArrowDownRight size={16} /></a>
    </section>

    <section id="manifesto" className="manifesto">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} variants={reveal}>
        <span className="eyebrow">01 — OUR PURPOSE</span>
        <p>We decode the craft behind unforgettable images, amplify the filmmakers creating them, and make world-class knowledge accessible to everyone.</p>
      </motion.div>
      <div className="manifestoStats"><div><strong>370K+</strong><span>FILMMAKERS</span></div><div><strong>180M+</strong><span>ANNUAL VIEWS</span></div><div><strong>190+</strong><span>COUNTRIES</span></div></div>
    </section>

    <section id="stories" className="stories">
      <div className="sectionHead"><div><span className="eyebrow">02 — FEATURED STORIES</span><h2>LEARN THE<br /><i>LANGUAGE</i> OF FILM.</h2></div><a href="#">VIEW ALL STORIES <ArrowUpRight /></a></div>
      <div className="filmGrid">{films.map((f, i) => <motion.article key={f.title} className="filmCard" initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} variants={reveal}>
        <div className="filmImg"><Image fill src={f.img} alt={f.title} /><div className="filmOverlay"><span className="play"><Play fill="currentColor" /></span></div><span className="number">0{i + 1}</span></div>
        <div className="filmMeta"><div><span>{f.tag}</span><h3>{f.title}</h3></div><ArrowUpRight /></div>
      </motion.article>)}</div>
    </section>

    <section id="techniques" className="ticker"><div>CAMERA MOVEMENT <Sparkles /> LIGHTING <Sparkles /> EDITING <Sparkles /> DIRECTING <Sparkles /> SOUND DESIGN <Sparkles /> VFX <Sparkles /> CAMERA MOVEMENT <Sparkles /> LIGHTING <Sparkles /></div></section>

    <section className="feature">
      <div className="featureMedia"><Image fill src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=90" alt="Cinema camera" /><span>MASTERCLASS 001</span></div>
      <motion.div className="featureCopy" initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}><span className="eyebrow">THE CRAFT, DECONSTRUCTED</span><h2>DON&apos;T JUST<br />WATCH THE SHOT.<br /><i>UNDERSTAND IT.</i></h2><p>Frame-by-frame breakdowns reveal the decisions behind lighting, movement, composition and emotion.</p><a className="textLink" href="#">EXPLORE TECHNIQUES <ArrowUpRight /></a></motion.div>
    </section>

    <section id="creators" className="creators">
      <div className="sectionHead light"><div><span className="eyebrow">03 — THE COMMUNITY</span><h2>MEET THE<br /><i>MAKERS.</i></h2></div><p>Original voices. Singular visions.<br />The people moving cinema forward.</p></div>
      <div className="creatorGrid">{creators.map((c, i) => <article className="creator" key={c.name}><div className="creatorImg"><Image fill src={c.img} alt={c.name} /><span>0{i + 1}</span></div><div><h3>{c.name}</h3><p>{c.role}</p></div></article>)}</div>
    </section>

    <section id="gear" className="gear">
      <Camera size={48} /><span className="eyebrow">04 — TOOLS OF THE TRADE</span><h2>THE GEAR DOESN&apos;T<br />MAKE THE FILM.<br /><i>YOU DO.</i></h2><p>Honest field guides, filmmaker setups and tools that earn their place on set.</p><a className="pill" href="#">EXPLORE THE GEAR ROOM <ArrowUpRight /></a>
    </section>

    <section id="partner" className="partner">
      <div className="partnerImage"><Image fill src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1800&q=90" alt="Film set" /></div>
      <div className="partnerCopy"><span className="eyebrow">PARTNER WITH TODAY FILM MAKERS</span><h2>PUT YOUR BRAND<br />WHERE FILMMAKERS<br /><i>PAY ATTENTION.</i></h2><p>Campaigns built around education, creativity and genuine product relevance—not interruptions.</p><a href="mailto:hello@todayfilmmakers.com" className="circleText">START A CONVERSATION <ArrowUpRight /></a></div>
    </section>

    <footer><div className="footerTop"><Image src="/logo.svg" alt="TFM" width={120} height={50} /><h2>TODAY FILM<br />MAKERS</h2><p>Create Today.<br />Inspire Tomorrow.</p></div><div className="footerBottom"><span>© 2026 TODAY FILM MAKERS</span><div><a href="#">INSTAGRAM</a><a href="#">YOUTUBE</a><a href="#">TIKTOK</a></div><a href="#top">BACK TO TOP ↑</a></div></footer>
  </main>;
}
