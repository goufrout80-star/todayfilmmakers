'use client';

import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BarChart3, Bookmark, Check, Eye, Instagram, Menu, Play, Sparkles, X } from 'lucide-react';
import { MouseEvent, useRef, useState } from 'react';

const tutorials = [
  { title: 'Cinematic Lighting With One Softbox', creator: '@featuredcreator', tag: 'LIGHTING', views: '1.8M views', saves: '42K saves', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=90' },
  { title: 'Make Any Match Cut Feel Invisible', creator: '@featuredcreator', tag: 'EDITING', views: '920K views', saves: '31K saves', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90' },
  { title: 'Three Camera Moves That Add Emotion', creator: '@featuredcreator', tag: 'CAMERA', views: '2.4M views', saves: '58K saves', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=90' },
  { title: 'Build Better Atmosphere With Sound', creator: '@featuredcreator', tag: 'SOUND', views: '780K views', saves: '19K saves', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1800&q=90' },
];

const categories = ['Editing', 'Camera', 'Lighting', 'Color', 'VFX', 'Sound', 'AI Tools', 'Behind the Scenes'];

const audience = [
  { value: '—', label: 'Community size', note: 'Verified number coming from your insights' },
  { value: '—', label: 'Monthly views', note: 'Verified number coming from your insights' },
  { value: '—', label: 'Monthly reach', note: 'Verified number coming from your insights' },
  { value: '—', label: 'Engagement rate', note: 'Verified number coming from your insights' },
];

const partnershipFormats = [
  { n: '01', title: 'Dedicated tutorial', text: 'A complete educational video built around your product, workflow or creative use case.' },
  { n: '02', title: 'Integrated feature', text: 'Natural product placement inside a tutorial our audience already wants to watch and save.' },
  { n: '03', title: 'Multi-platform campaign', text: 'One idea adapted across Instagram, Facebook and other relevant channels for wider reach.' },
];

const reveal = { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0, transition: { duration: .85, ease: [0.16, 1, 0.3, 1] } } };

function MagneticLink({ children, href, className = '' }: { children: React.ReactNode; href: string; className?: string }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 190, damping: 17 }); const sy = useSpring(y, { stiffness: 190, damping: 17 });
  function move(e: MouseEvent<HTMLAnchorElement>) { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left-r.width/2)*.18); y.set((e.clientY-r.top-r.height/2)*.18); }
  return <motion.a href={href} className={className} style={{ x:sx, y:sy }} onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.a>;
}

export default function Home(){
  const [open,setOpen]=useState(false);
  const heroRef=useRef<HTMLElement>(null);
  const mouseX=useMotionValue(50), mouseY=useMotionValue(50);
  const glow=useMotionTemplate`radial-gradient(700px circle at ${mouseX}% ${mouseY}%, rgba(211,255,68,.16), transparent 62%)`;
  const {scrollYProgress}=useScroll();
  const {scrollYProgress:heroProgress}=useScroll({target:heroRef,offset:['start start','end start']});
  const heroY=useTransform(heroProgress,[0,1],['0%','16%']);
  const heroScale=useTransform(heroProgress,[0,1],[1,1.1]);

  return <main onMouseMove={(e)=>{mouseX.set((e.clientX/innerWidth)*100);mouseY.set((e.clientY/innerHeight)*100)}}>
    <div className="grain"/><motion.div className="ambientGlow" style={{background:glow}}/><motion.div className="progress" style={{scaleX:scrollYProgress}}/>

    <header className="nav">
      <a className="brand" href="#top"><Image src="/logo.svg" alt="Today Film Makers" width={84} height={38}/></a>
      <nav>{['Tutorials','Categories','Community','Brands'].map(x=><a key={x} href={'#'+x.toLowerCase()}>{x}</a>)}</nav>
      <MagneticLink className="navCta" href="#brands">Work with us <ArrowUpRight size={15}/></MagneticLink>
      <button className="menu" aria-label="Open menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </header>

    {open&&<motion.div className="mobileNav" initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0 0)'}}>{['Tutorials','Categories','Community','Brands'].map((x,i)=><motion.a key={x} href={'#'+x.toLowerCase()} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.08*i}} onClick={()=>setOpen(false)}><span>0{i+1}</span>{x}<ArrowUpRight/></motion.a>)}</motion.div>}

    <section className="hero" id="top" ref={heroRef}>
      <motion.div className="heroMedia" style={{y:heroY,scale:heroScale}}><Image fill priority src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2400&q=92" alt="Filmmaker learning from short-form tutorials"/><div className="shade"/></motion.div>
      <div className="heroFrame"><span>CURATED DAILY</span><span>FILMMAKING EDUCATION</span><span>SOCIAL-FIRST</span><span>EST. 2017</span></div>
      <motion.div className="heroCopy" initial="hidden" animate="show" variants={reveal}>
        <span className="heroKicker">THE BEST FILMMAKING TUTORIALS — FOUND, CURATED AND SHARED</span>
        <h1>LEARN FILMMAKING<br/><em>ONE GREAT VIDEO</em><br/>AT A TIME.</h1>
        <div className="heroActions"><MagneticLink href="#tutorials" className="primaryBtn"><Play fill="currentColor" size={17}/> Explore tutorials</MagneticLink><a href="#brands" className="ghostBtn">For brands <ArrowRight size={16}/></a></div>
      </motion.div>
    </section>

    <section className="positioning">
      <span className="eyebrow">WHAT TODAY FILM MAKERS IS</span>
      <motion.p initial="hidden" whileInView="show" viewport={{once:true,amount:.25}} variants={reveal}>A curated filmmaking education page that discovers useful tutorials, credits the creators behind them, and helps a global community learn faster through short-form content.</motion.p>
      <div className="positioningNote"><span>WE CURATE</span><span>WE CREDIT</span><span>WE EDUCATE</span><span>WE CONNECT BRANDS WITH FILMMAKERS</span></div>
    </section>

    <section className="tutorials" id="tutorials">
      <div className="sectionHead"><div><span className="eyebrow">LATEST CURATED TUTORIALS</span><h2>WATCH.<br/><i>SAVE.</i> CREATE.</h2></div><a href="#categories">Browse by skill <ArrowUpRight/></a></div>
      <div className="tutorialGrid">{tutorials.map((t,i)=><motion.article className="tutorialCard" key={t.title} initial="hidden" whileInView="show" viewport={{once:true,amount:.12}} variants={reveal}>
        <div className="tutorialImage"><Image fill src={t.img} alt={t.title}/><div className="tutorialOverlay"><span className="play"><Play fill="currentColor"/></span></div><span className="cardIndex">0{i+1}</span><span className="cardTag">{t.tag}</span></div>
        <div className="tutorialInfo"><p>{t.creator}</p><h3>{t.title}</h3><div><span><Eye size={13}/>{t.views}</span><span><Bookmark size={13}/>{t.saves}</span></div></div>
      </motion.article>)}</div>
      <p className="demoNotice">Tutorial names, creators and performance numbers are presentation placeholders until real post data is supplied.</p>
    </section>

    <section className="categories" id="categories"><div className="categoriesIntro"><span className="eyebrow">EXPLORE BY SKILL</span><h2>FIND WHAT YOU<br/>WANT TO <i>LEARN.</i></h2></div><div className="categoryList">{categories.map((c,i)=><a key={c} href="#tutorials"><span>0{i+1}</span><strong>{c}</strong><ArrowUpRight/></a>)}</div></section>

    <section className="whyFollow"><div className="whyMedia"><Image fill src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=90" alt="Creator filming on location"/></div><div className="whyCopy"><span className="eyebrow">WHY FOLLOW TODAY FILM MAKERS</span><h2>LESS SEARCHING.<br/><i>MORE LEARNING.</i></h2><p>We filter the endless feed and surface techniques worth your attention—from camera movement and lighting to editing, VFX, sound and AI tools.</p><ul><li><Check/>Useful tutorials, not random entertainment</li><li><Check/>Original creators clearly credited</li><li><Check/>Skills for beginners and working filmmakers</li><li><Check/>Fresh discoveries across the filmmaking community</li></ul></div></section>

    <section className="community" id="community"><div className="communityHead"><span className="eyebrow">COMMUNITY PROOF</span><h2>BUILT ON<br/><i>REAL ATTENTION.</i></h2><p>These cards are intentionally waiting for your verified social statistics. No invented claims.</p></div><div className="statsGrid">{audience.map(s=><div key={s.label}><strong>{s.value}</strong><h3>{s.label}</h3><p>{s.note}</p></div>)}</div><div className="audienceTypes"><span>FILMMAKERS</span><span>EDITORS</span><span>CONTENT CREATORS</span><span>STUDENTS</span><span>FREELANCERS</span><span>CREATIVE TEAMS</span></div></section>

    <section className="brands" id="brands">
      <div className="brandsHero"><div><span className="eyebrow">FOR FILMMAKING & CREATIVE BRANDS</span><h2>TURN YOUR PRODUCT<br/>INTO SOMETHING<br/><i>WORTH LEARNING.</i></h2></div><p>Today Film Makers helps relevant products enter the feed through useful tutorials—not through ads people immediately skip.</p></div>
      <div className="brandPrinciples"><div><Sparkles/><h3>Education first</h3><p>The product becomes part of a real technique, workflow or creative result.</p></div><div><Eye/><h3>Native attention</h3><p>Content is designed for the way filmmakers already discover and save ideas.</p></div><div><BarChart3/><h3>Clear reporting</h3><p>Campaign results can be presented with verified reach, views, saves and engagement.</p></div></div>
      <div className="formats"><div className="formatsHead"><span className="eyebrow">CAMPAIGN FORMATS</span><h2>BUILT FOR<br/><i>THE FEED.</i></h2></div><div className="formatGrid">{partnershipFormats.map(f=><article key={f.n}><span>{f.n}</span><h3>{f.title}</h3><p>{f.text}</p><ArrowUpRight/></article>)}</div></div>
      <div className="mediaKit"><div><span className="eyebrow">MEDIA KIT PREVIEW</span><h2>THE NUMBERS BRANDS<br/>NEED TO SAY <i>YES.</i></h2></div><div className="mediaKitList">{['Verified audience size','Monthly reach and views','Top countries and age groups','Content performance benchmarks','Campaign formats and deliverables','Previous brand results'].map(x=><span key={x}><Check/>{x}</span>)}</div></div>
      <div className="brandCta"><span className="eyebrow">START A PARTNERSHIP</span><h2>YOUR PRODUCT.<br/>OUR COMMUNITY.<br/><i>A USEFUL STORY.</i></h2><MagneticLink className="ctaCircle" href="mailto:hello@todayfilmmakers.com">REQUEST MEDIA KIT <ArrowUpRight/></MagneticLink></div>
    </section>

    <footer><div className="footerTop"><Image src="/logo.svg" alt="Today Film Makers" width={120} height={54}/><h2>TODAY FILM<br/>MAKERS</h2><p>Learn today.<br/>Create tomorrow.</p></div><div className="footerBottom"><span>© 2026 TODAY FILM MAKERS</span><div><a href="#">INSTAGRAM</a><a href="#">FACEBOOK</a><a href="#">YOUTUBE</a></div><a href="#top">BACK TO TOP ↑</a></div></footer>
  </main>
}
