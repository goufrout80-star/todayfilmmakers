'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, BarChart3, Bookmark, Check, Eye, Instagram, Menu, Play, Sparkles, X } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';

const tutorials = [
  { title:'Light a cinematic portrait with one source', creator:'@creatorname', tag:'LIGHTING', views:'REAL DATA SOON', img:'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=90' },
  { title:'The match-cut trick editors keep saving', creator:'@creatorname', tag:'EDITING', views:'REAL DATA SOON', img:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90' },
  { title:'Three camera moves that add emotion', creator:'@creatorname', tag:'CAMERA', views:'REAL DATA SOON', img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=90' },
  { title:'Build atmosphere before adding music', creator:'@creatorname', tag:'SOUND', views:'REAL DATA SOON', img:'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1800&q=90' },
];
const categories=['Editing','Camera','Lighting','Color grading','VFX','Sound design','AI tools','Behind the scenes'];
const formats=[
  ['01','Dedicated tutorial','A complete educational concept built around a relevant product or creative workflow.'],
  ['02','Integrated feature','A natural product demonstration inside content filmmakers already want to watch and save.'],
  ['03','Multi-platform campaign','One strong idea adapted for the platforms where our filmmaking audience spends attention.'],
];
const reveal={hidden:{opacity:0,y:70},show:{opacity:1,y:0,transition:{duration:1,ease:[.16,1,.3,1]}}};

function MagneticLink({children,href,className=''}:{children:React.ReactNode;href:string;className?:string}){
  const x=useMotionValue(0),y=useMotionValue(0);const sx=useSpring(x,{stiffness:190,damping:16}),sy=useSpring(y,{stiffness:190,damping:16});
  const move=(e:MouseEvent<HTMLAnchorElement>)=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.18);y.set((e.clientY-r.top-r.height/2)*.18)};
  return <motion.a href={href} className={className} style={{x:sx,y:sy}} onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.a>
}

export default function Home(){
  const [open,setOpen]=useState(false),[loaded,setLoaded]=useState(false);
  const heroRef=useRef<HTMLElement>(null),storyRef=useRef<HTMLElement>(null);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),2100);return()=>clearTimeout(t)},[]);
  const mouseX=useMotionValue(50),mouseY=useMotionValue(50);
  const glow=useMotionTemplate`radial-gradient(680px circle at ${mouseX}% ${mouseY}%, rgba(244,201,0,.18), transparent 62%)`;
  const {scrollYProgress}=useScroll();
  const {scrollYProgress:heroP}=useScroll({target:heroRef,offset:['start start','end start']});
  const {scrollYProgress:storyP}=useScroll({target:storyRef,offset:['start start','end end']});
  const heroY=useTransform(heroP,[0,1],['0%','22%']),heroScale=useTransform(heroP,[0,1],[1,1.16]),heroOpacity=useTransform(heroP,[0,.78],[1,.05]);
  const railX=useTransform(storyP,[0,1],['0%','-74%']);

  return <main onMouseMove={e=>{mouseX.set((e.clientX/window.innerWidth)*100);mouseY.set((e.clientY/window.innerHeight)*100)}}>
    <AnimatePresence>{!loaded&&<motion.div className="loader" exit={{y:'-100%'}} transition={{duration:.9,ease:[.76,0,.24,1]}}><div className="loaderMark"><span>{'{'}</span><b>TFM</b><span>{'}'}</span></div><div className="loaderLine"><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.7,ease:[.16,1,.3,1]}}/></div><p>CURATING THE NEXT FRAME</p></motion.div>}</AnimatePresence>
    <div className="grain"/><motion.div className="ambientGlow" style={{background:glow}}/><motion.div className="progress" style={{scaleX:scrollYProgress}}/>

    <header className="nav"><a className="brand" href="#top"><Image src="/logo.svg" alt="Today Film Makers" width={88} height={40}/></a><nav>{['Tutorials','Skills','Community','Brands'].map(x=><a key={x} href={'#'+x.toLowerCase()}>{x}</a>)}</nav><MagneticLink className="navCta" href="#brands">Partner with us <ArrowUpRight size={15}/></MagneticLink><button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button></header>
    {open&&<motion.div className="mobileNav" initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0 0)'}}>{['Tutorials','Skills','Community','Brands'].map((x,i)=><motion.a key={x} href={'#'+x.toLowerCase()} initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{delay:.08*i}} onClick={()=>setOpen(false)}><span>0{i+1}</span>{x}<ArrowUpRight/></motion.a>)}</motion.div>}

    <motion.section id="top" className="hero" ref={heroRef} style={{opacity:heroOpacity}}>
      <motion.div className="heroMedia" style={{y:heroY,scale:heroScale}}><Image fill priority src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2400&q=92" alt="Filmmaking tutorial community"/><div className="shade"/></motion.div>
      <div className="cameraFrame"><span className="rec">● REC</span><span>CURATED DAILY</span><span>9:16 / SOCIAL FIRST</span><span>TFM / 2026</span></div>
      <motion.div className="heroCopy" initial={{opacity:0}} animate={loaded?{opacity:1}:{}} transition={{duration:.6}}>
        <motion.span initial={{y:25,opacity:0}} animate={loaded?{y:0,opacity:1}:{}} transition={{delay:.15}}>FILMMAKING EDUCATION, CURATED FOR THE FEED</motion.span>
        <h1><motion.b initial={{y:'110%'}} animate={loaded?{y:0}:{}} transition={{delay:.2,duration:1,ease:[.16,1,.3,1]}}>LEARN</motion.b><br/><motion.em initial={{y:'110%'}} animate={loaded?{y:0}:{}} transition={{delay:.32,duration:1,ease:[.16,1,.3,1]}}>FROM THE BEST.</motion.em></h1>
        <div className="heroBottom"><p>We discover, credit and share filmmaking tutorials worth saving.</p><MagneticLink href="#tutorials" className="heroPlay"><Play fill="currentColor"/> Explore tutorials</MagneticLink></div>
      </motion.div>
      <a href="#purpose" className="scrollCue">SCROLL TO LEARN <ArrowDownRight/></a>
    </motion.section>

    <section className="purpose" id="purpose"><span className="eyebrow">01 — THE REAL TFM</span><motion.p initial="hidden" whileInView="show" viewport={{once:true,amount:.25}} variants={reveal}>Not a production studio. Not a traditional magazine. <i>Today Film Makers is a curated filmmaking classroom</i> built from the best short-form tutorials across the creative community.</motion.p><div className="purposeRail"><span>WE DISCOVER</span><span>WE CURATE</span><span>WE CREDIT</span><span>WE EDUCATE</span></div></section>

    <section className="tutorials" id="tutorials"><div className="sectionHead"><div><span className="eyebrow">02 — CURATED NOW</span><h2>TUTORIALS<br/>WORTH <i>SAVING.</i></h2></div><p>Real creator posts, performance data and links will replace these presentation placeholders.</p></div><div className="tutorialGrid">{tutorials.map((t,i)=><motion.article key={t.title} className="tutorialCard" initial="hidden" whileInView="show" viewport={{once:true,amount:.15}} variants={reveal} whileHover="hover"><div className="tutorialImage"><Image fill src={t.img} alt={t.title}/><motion.div className="cardCurtain" variants={{hover:{scaleY:0}}}/><span className="cardIndex">0{i+1}</span><span className="cardTag">{t.tag}</span><motion.div className="cardPlay" variants={{hover:{scale:1,opacity:1}}}><Play fill="currentColor"/></motion.div></div><div className="tutorialInfo"><p>{t.creator}</p><h3>{t.title}</h3><div><span><Eye size={13}/>{t.views}</span><span><Bookmark size={13}/>SAVE</span></div></div></motion.article>)}</div></section>

    <section className="skills" id="skills"><div className="skillsSticky"><span className="eyebrow">03 — FIND YOUR NEXT SKILL</span><h2>EVERYTHING<br/>YOU WANT TO<br/><i>LEARN NEXT.</i></h2></div><div className="skillList">{categories.map((c,i)=><a href="#tutorials" key={c}><span>0{i+1}</span><strong>{c}</strong><ArrowUpRight/></a>)}</div></section>

    <section className="story" ref={storyRef}><div className="storySticky"><motion.div className="storyRail" style={{x:railX}}><article className="storyIntro"><span className="eyebrow">HOW THE PAGE WORKS</span><h2>FROM THE<br/>ENDLESS FEED<br/>TO <i>REAL VALUE.</i></h2></article>{[['01','DISCOVER','We scan the filmmaking community for techniques, workflows and ideas worth attention.'],['02','VERIFY','We check usefulness, clarity and relevance before a tutorial earns a place on the page.'],['03','CREDIT','The original creator stays visible. Their work is the reason the community learns.'],['04','SHARE','The best tutorials reach more filmmakers through a trusted educational feed.']].map(x=><article className="storyCard" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><div className="pixelBracket">{'{ }'}</div></article>)}</motion.div></div></section>

    <section className="community" id="community"><div className="communityHead"><div><span className="eyebrow">04 — VERIFIED COMMUNITY PROOF</span><h2>REAL NUMBERS.<br/><i>COMING NEXT.</i></h2></div><p>When you send the social insights, this section becomes a live proof system for followers, views, reach, saves, countries and audience demographics.</p></div><div className="statsGrid">{['Community size','Monthly views','Monthly reach','Engagement rate'].map(x=><div key={x}><strong>—</strong><h3>{x}</h3><p>Awaiting verified TFM analytics</p></div>)}</div><div className="audienceRibbon"><span>FILMMAKERS</span><span>EDITORS</span><span>CREATORS</span><span>STUDENTS</span><span>FREELANCERS</span><span>CREATIVE TEAMS</span></div></section>

    <section className="brands" id="brands"><div className="brandsHero"><span className="eyebrow">05 — FOR BRANDS</span><h2>DON&apos;T INTERRUPT<br/>FILMMAKERS.<br/><i>TEACH THEM.</i></h2><p>We turn relevant products into educational stories the filmmaking community can actually use, remember and save.</p></div><div className="brandValues"><div><Sparkles/><span>01</span><h3>Education first</h3><p>The product enters through a useful workflow, result or technique.</p></div><div><Instagram/><span>02</span><h3>Native to the feed</h3><p>Creative shaped for short-form platforms and filmmaking audiences.</p></div><div><BarChart3/><span>03</span><h3>Verified reporting</h3><p>Views, reach, saves and engagement presented with real campaign data.</p></div></div><div className="formats"><div className="formatsHead"><span className="eyebrow">CAMPAIGN FORMATS</span><h2>BUILT TO<br/><i>PERFORM.</i></h2></div><div className="formatGrid">{formats.map(f=><article key={f[0]}><span>{f[0]}</span><h3>{f[1]}</h3><p>{f[2]}</p><ArrowUpRight/></article>)}</div></div><div className="brandCta"><span className="eyebrow">READY FOR THE RIGHT PARTNER</span><h2>YOUR PRODUCT.<br/>A USEFUL STORY.<br/><i>THE RIGHT AUDIENCE.</i></h2><MagneticLink href="mailto:hello@todayfilmmakers.com" className="ctaCircle">REQUEST MEDIA KIT <ArrowUpRight/></MagneticLink></div></section>

    <footer><div className="footerTop"><Image src="/logo.svg" alt="Today Film Makers" width={128} height={58}/><h2>LEARN TODAY.<br/>CREATE TOMORROW.</h2></div><div className="footerBottom"><span>© 2026 TODAY FILM MAKERS</span><div><a href="#">INSTAGRAM</a><a href="#">FACEBOOK</a><a href="#">YOUTUBE</a></div><a href="#top">BACK TO TOP ↑</a></div></footer>
  </main>
}