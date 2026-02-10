import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Play, Code, Smartphone,
  Youtube, TrendingUp, DollarSign, MousePointer2,
  CheckCircle2, Calendar, Clock, ChevronRight, ChevronLeft,
  Users, Zap, HelpCircle, ChevronDown, BadgeCheck,
  Layers, BarChart3, Lock, Volume2, VolumeX, MapPin, Mail, Linkedin, Twitter, Instagram
} from 'lucide-react';
import createGlobe from 'cobe';

// --- COMPONENTS ---

// ... (Navbar, Hero, InteractiveCore, Marquee, Protocol components remain unchanged)

const VideoCarousel = ({ unmutedId, setUnmutedId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isCarouselUnmuted = unmutedId === 'carousel';
  const videoRefs = React.useRef([]);

  const videos = [
    { id: 1, src: "/videos/1.mp4", title: "High-Performance Funnel", tag: "STRATEGY" },
    { id: 2, src: "/videos/2.mp4", title: "Brand Narrative", tag: "PRODUCTION" },
    { id: 3, src: "/videos/3.mp4", title: "Algorithm Breaker", tag: "GROWTH" },
    { id: 4, src: "/videos/4.mp4", title: "Retention Engine", tag: "ADS" },
    { id: 5, src: "/videos/5.mp4", title: "Scale System", tag: "SCALE" },
    { id: 6, src: "/videos/6.mp4", title: "Viral Framework", tag: "ORGANIC" }
  ];

  // Auto-scroll every 5 seconds (slower for better viewing)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  // Ensure active video plays and others are correctly handled
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => { }); // Attempt to play active
          video.muted = !isCarouselUnmuted; // Sync mute state
        } else {
          // Optimization: Pause non-active videos to save resources
          video.pause();
          video.currentTime = 0; // Optional: Reset to start
        }
      }
    });
  }, [activeIndex, isCarouselUnmuted]);

  const getPositionStyles = (index) => {
    const distance = (index - activeIndex + videos.length) % videos.length;

    // Center Item
    if (distance === 0) {
      return { x: 0, scale: 1, zIndex: 20, opacity: 1, rotateY: 0, filter: 'brightness(1)' };
    }

    // Right Item
    if (distance === 1) {
      return { x: 200, scale: 0.8, zIndex: 10, opacity: 0.6, rotateY: -15, filter: 'brightness(0.5)' };
    }

    // Left Item
    if (distance === videos.length - 1) {
      return { x: -200, scale: 0.8, zIndex: 10, opacity: 0.6, rotateY: 15, filter: 'brightness(0.5)' };
    }

    // Back Layers
    if (distance === 2) {
      return { x: 350, scale: 0.6, zIndex: 5, opacity: 0.3, rotateY: -30, filter: 'brightness(0.3)' };
    }
    if (distance === videos.length - 2) {
      return { x: -350, scale: 0.6, zIndex: 5, opacity: 0.3, rotateY: 30, filter: 'brightness(0.3)' };
    }

    return { x: 0, scale: 0, zIndex: 0, opacity: 0 };
  };

  return (
    <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden py-10">
      <div className="absolute inset-x-0 top-0 h-[500px] flex items-center justify-center perspective-[1000px]">
        {videos.map((video, index) => {
          const styles = getPositionStyles(index);
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={video.id}
              className="absolute w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
              initial={styles}
              animate={styles}
              transition={{ duration: 0.8, ease: "circOut" }} // Smoother transition
            >
              <video
                ref={el => videoRefs.current[index] = el}
                src={video.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                muted={isActive ? !isCarouselUnmuted : true}
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4">
                <div className="inline-block px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono text-white/80 border border-white/10">
                  {video.tag}
                </div>
              </div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-0 w-full text-center"
                >
                  <h3 className="text-xl font-display font-bold text-white mb-2">{video.title}</h3>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation & Controls - Moved Lower and Outside */}
      <div className="absolute bottom-4 left-0 right-0 z-50 flex items-center justify-center gap-8">
        <button
          onClick={() => setActiveIndex((curr) => (curr - 1 + videos.length) % videos.length)}
          className="p-3 rounded-full bg-slate-900 border border-white/10 text-white hover:bg-orange hover:border-orange transition-all shadow-lg hover:shadow-orange/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setUnmutedId(isCarouselUnmuted ? null : 'carousel')}
          className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold font-display text-sm uppercase tracking-wide transition-all shadow-lg ${!isCarouselUnmuted ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-900 text-white border border-white/10 hover:bg-slate-800'}`}
        >
          {!isCarouselUnmuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              Unmute Center
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-orange" />
              Muting...
            </>
          )}
        </button>

        <button
          onClick={() => setActiveIndex((curr) => (curr + 1) % videos.length)}
          className="p-3 rounded-full bg-slate-900 border border-white/10 text-white hover:bg-orange hover:border-orange transition-all shadow-lg hover:shadow-orange/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ onOpenModal, onNavigate }) => (
  <nav className="fixed top-0 left-0 right-0 z-40 glass-nav px-6 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-12">
      <button onClick={() => onNavigate('home')} className="text-2xl font-bold font-display tracking-tighter text-white">LBB.</button>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('work')?.scrollIntoView(), 100); }} className="hover:text-white transition-colors">Work</button>
        <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('why-us')?.scrollIntoView(), 100); }} className="hover:text-white transition-colors">Why Us</button>
        <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('protocol')?.scrollIntoView(), 100); }} className="hover:text-white transition-colors">Protocol</button>
        <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('team')?.scrollIntoView(), 100); }} className="hover:text-white transition-colors">Team</button>
        <button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView(), 100); }} className="hover:text-white transition-colors">FAQ</button>
      </div>
    </div>
    <button
      onClick={onOpenModal}
      className="bg-white text-black px-6 py-2 font-bold font-display tracking-wide hover:bg-orange hover:text-white transition-colors duration-300 text-sm uppercase"
    >
      Book Strategy
    </button>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Background Blobs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />

    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      {/* Left: Text */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-orange mb-6"
        >
          <Zap className="w-3 h-3" />
          <span>ACCEPTING 4 NEW PARTNERS FOR Q2</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold font-display uppercase leading-[0.9] mb-6"
        >
          Your Content <br /> Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Invisible.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 mb-12 max-w-lg"
        >
          We combine <span className="text-orange font-bold">Retention-Editing</span> with <span className="text-teal font-bold">High-Ticket Funnels</span> to engineer attention.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
        >
          <div>
            <h3 className="text-3xl font-bold font-display text-white">50M+</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Views Generated</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold font-display text-white">$12M</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Client Revenue</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold font-display text-white">4.8%</h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Avg CTR</p>
          </div>
        </motion.div>
      </div>

      {/* Right: Abstract Visual - Interactive Core */}
      <InteractiveCore />
    </div>
  </section>
);

const InteractiveCore = () => {
  const containerRef = React.useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-1000 cursor-pointer"
    >
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">

        {/* Interactive Rings - React to mouse */}
        <motion.div
          animate={{
            rotate: 360,
            scale: 1 + Math.abs(mousePosition.x * 0.1),
          }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 0.2 } }}
          className="absolute inset-0 rounded-full border border-dashed border-white/10"
          style={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20
          }}
        >
          {/* Planet 1: Revenue Orb (Teal) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-6 h-6 rounded-full bg-slate-950 border border-teal shadow-[0_0_15px_rgba(20,184,166,0.5)] flex items-center justify-center">
              <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              {/* Orbital Trail Effect */}
              <div className="absolute top-1/2 left-1/2 w-20 h-[1px] bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0 -translate-y-1/2 -translate-x-1/2 rotate-90 blur-[1px]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
            scale: 1 + Math.abs(mousePosition.y * 0.1),
          }}
          transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 0.2 } }}
          className="absolute inset-12 rounded-full border border-white/5"
          style={{
            x: mousePosition.x * -10,
            y: mousePosition.y * -10
          }}
        >
          {/* Planet 2: Viral Orb (Orange) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="relative w-8 h-8 rounded-full bg-slate-950 border border-orange shadow-[0_0_20px_rgba(255,69,0,0.6)] flex items-center justify-center">
              <div className="absolute inset-0 bg-orange/20 rounded-full animate-ping" />
              <div className="w-3 h-3 bg-orange rounded-full" />
            </div>
          </div>
        </motion.div>
        {/* Central Core - 3D Tilt Effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotateX: mousePosition.y * 20, // Tilt X based on mouse Y
            rotateY: mousePosition.x * -20, // Tilt Y based on mouse X
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-64 h-64 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden shadow-2xl shadow-orange/10 transform-style-3d">
            <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-teal/10 opacity-50" />

            {/* Floating Icons - Parallax Depth */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 transform-style-3d">
              <motion.div
                className="flex items-center gap-4 w-full p-3 bg-white/5 rounded-lg border border-white/5 shadow-lg"
                animate={{ x: mousePosition.x * 30, y: mousePosition.y * 30 }}
              >
                <div className="w-8 h-8 rounded bg-orange/20 flex items-center justify-center text-orange shrink-0">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div className="flex-1 font-mono text-xs text-gray-300">
                  <span className="text-green-400 font-bold">84%</span> Client Retention Rate
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 w-full p-3 bg-white/5 rounded-lg border border-white/5 shadow-lg"
                animate={{ x: mousePosition.x * 15, y: mousePosition.y * 15 }}
              >
                <div className="w-8 h-8 rounded bg-teal/20 flex items-center justify-center text-teal">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="flex-1 font-mono text-xs text-gray-300">
                  <span className="text-green-400 font-bold">2,400+</span> Projects Delivered
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Marquee = () => {
  const tools = [
    { name: "ADOBE PREMIERE", icon: Layers },
    { name: "NEXT.JS", icon: Code },
    { name: "AFTER EFFECTS", icon: Zap },
    { name: "REACT NATIVE", icon: Smartphone },
    { name: "UNREAL ENGINE", icon: Box }, // Box is not imported, using Layers as placeholder if needed or just generic
    { name: "FIGMA", icon: MousePointer2 },
    { name: "STRIPE API", icon: DollarSign },
    { name: "AWS", icon: Cloud } // Cloud not imported
  ];

  // Simplified list for safety with imports
  const simpleTools = [
    "ADOBE PREMIERE", "NEXT.JS", "AFTER EFFECTS", "REACT NATIVE", "UNREAL ENGINE", "FIGMA", "STRIPE API", "AWS"
  ];

  return (
    <div className="py-8 border-y border-white/5 bg-black/20 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...simpleTools, ...simpleTools, ...simpleTools, ...simpleTools].map((tool, i) => (
          <div key={i} className="mx-8 flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-2xl font-display font-bold text-white uppercase tracking-tight">
              {tool}
            </span>
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Placeholder components for missing imports in Marquee
const Box = () => null;
const Cloud = () => null;

const Protocol = () => (
  <section id="protocol" className="py-32 container mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">THE LBB PROTOCOL</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">We don't guess. We execute a 3-step system engineered to extract maximum value from your audience.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 relative">
      {/* Connecting Line (Desktop) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0" />

      {/* Step 1 */}
      <div className="relative z-10 group">
        <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl hover:border-orange/50 transition-all duration-300 h-full">
          <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-6 font-display font-bold text-xl">01</div>
          <h3 className="text-2xl font-display font-bold mb-4">DIAGNOSE</h3>
          <p className="text-gray-400">We audit your current content and funnel leaks. We find exactly where you are leaving money on the table.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative z-10 group">
        <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl hover:border-white/50 transition-all duration-300 h-full">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 font-display font-bold text-xl">02</div>
          <h3 className="text-2xl font-display font-bold mb-4">CONSTRUCT</h3>
          <p className="text-gray-400">We build the infrastructure. The high-ticket funnel, the email sequences, and the content strategy.</p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="relative z-10 group">
        <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl hover:border-teal/50 transition-all duration-300 h-full">
          <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center text-teal mb-6 font-display font-bold text-xl">03</div>
          <h3 className="text-2xl font-display font-bold mb-4">AMPLIFY</h3>
          <p className="text-gray-400">We deploy retention-engineered content to flood your new system with qualified traffic.</p>
        </div>
      </div>
    </div>
  </section>
);

const LongFormShowcase = ({ unmutedId, setUnmutedId }) => {
  const videos = [
    { id: 'long1', src: "/videos/long1.mp4", title: "Strategy Breakdown" },
    { id: 'long2', src: "/videos/long2.mp4", title: "Execution Plan" },
    { id: 'long3', src: "/videos/long3.mp4", title: "Framework Analysis" }
  ];

  const videoRefs = React.useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <div className="mt-32 grid md:grid-cols-3 gap-8">
      {videos.map((video) => {
        const isUnmuted = unmutedId === video.id;
        return (
          <div key={video.id} className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <video
              ref={(el) => (videoRefs.current[video.id] = el)}
              src={video.src}
              className="w-full h-full object-cover"
              loop
              muted={!isUnmuted}
              playsInline
              preload="metadata" // Optimization: Load metadata only initially
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />

            {/* Small Title Tag */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-mono text-white/90 border border-white/10">
                {video.title}
              </div>
            </div>

            <button
              onClick={() => setUnmutedId(isUnmuted ? null : video.id)}
              className={`absolute bottom-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all duration-300 z-10 ${isUnmuted ? 'bg-orange text-white border-orange' : 'bg-black/50 text-white border-white/10 hover:bg-white hover:text-black'}`}
            >
              {isUnmuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Portfolio = () => {
  const [unmutedId, setUnmutedId] = useState(null);

  return (
    <section id="work" className="py-20 container mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-display font-bold text-white">SELECTED WORKS</h2>
        <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          LIVE FEED
        </div>
      </div>

      <VideoCarousel unmutedId={unmutedId} setUnmutedId={setUnmutedId} />
      <LongFormShowcase unmutedId={unmutedId} setUnmutedId={setUnmutedId} />
    </section>
  );
};

const WhyUs = () => (
  <section id="why-us" className="py-32 container mx-auto px-6 relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] md:max-w-[800px] aspect-square bg-gradient-to-r from-orange/5 to-teal/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />

    <div className="text-center mb-24 max-w-3xl mx-auto">
      <h2 className="text-sm font-mono text-orange tracking-[0.2em] mb-4">THE GROWTH ENGINE</h2>
      <h3 className="text-5xl md:text-6xl font-display font-bold mb-6">THE INVISIBLE BACKEND</h3>
      <p className="text-xl text-gray-400">
        We help agency founders scale from bottlenecks to breakthroughs. <br />
        <span className="text-white font-bold">Your delivery, editing, and fulfillment—handled.</span>
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {/* Card 1: Revenue - Large Span */}
      <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-10 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold mb-6">
              <TrendingUp className="w-3 h-3" />
              REVENUE UNLOCKED
            </div>
            <h4 className="text-4xl font-display font-bold text-white mb-4">Add $40,000+ Monthly</h4>
            <p className="text-gray-400 leading-relaxed text-lg">
              Freedom to onboard <strong>20+ new clients</strong> without hiring a single employee. We handle the 100% of delivery chaos; you keep the profit.
            </p>
          </div>
          <div className="w-full md:w-48 h-32 bg-slate-950 rounded-xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
            <div className="text-3xl font-bold text-white mb-1">+$40k</div>
            <div className="text-xs text-gray-500 font-mono">NEW REVENUE</div>
          </div>
        </div>
      </div>

      {/* Card 2: 24h Turnaround */}
      <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-8">
        <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-colors">
          <Clock className="w-8 h-8 text-orange" />
        </div>
        <h4 className="text-2xl font-bold text-white mb-3">24-Hour Speed</h4>
        <p className="text-gray-400">
          Zero chaos. We operate on a paramilitary schedule. Submissions in by 6PM, delivery by 6PM next day.
        </p>
      </div>

      {/* Card 3: White Label (Important) */}
      <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-8">
        <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-colors">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-white mb-3">100% White-Labeled</h4>
        <p className="text-gray-400">
          We are your secret weapon. We never, ever reach out to your clients. We handle the revisions; you take the credit.
        </p>
      </div>

      {/* Card 4: Quality Tech */}
      <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-300 p-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              <CheckCircle2 className="w-3 h-3" />
              QUALITY ASSURANCE
            </div>
            <h4 className="text-3xl font-display font-bold text-white mb-4">Editing by Strategy, Not Guesswork</h4>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Our editors are trained operators. Every cut is driven by retention data, platform trends, and performance metrics. Detailed Quality Assurance process included.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-xs font-bold">01</div>
              <div className="text-sm font-medium text-gray-300">Trend Analysis</div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center text-orange text-xs font-bold">02</div>
              <div className="text-sm font-medium text-gray-300">Retention Editing</div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">03</div>
              <div className="text-sm font-medium text-gray-300">Final Quality Assurance Check</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Founders = () => (
  <section id="team" className="py-32 container mx-auto px-6">
    <h2 className="text-4xl font-display font-bold mb-16 text-center">THE ARCHITECTS</h2>
    <div className="grid md:grid-cols-3 gap-8 mb-20">
      {/* Avi Javeri - Head of Strategy */}
      <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900 h-[500px]">
        <div className="absolute inset-0">
          <img src="/team/avi.jpg" alt="Avi Javeri" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <div className="absolute top-10 right-10 p-3 bg-purple-500/10 rounded-xl text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-purple-500/20">
            <TrendingUp className="w-8 h-8" />
          </div>

          <h3 className="text-3xl font-display font-bold mb-2">AVI JAVERI</h3>
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-6">HEAD OF STRATEGY</p>
          <p className="text-gray-300 text-base leading-relaxed">
            "Growth is calculated, not accidental. I architect the master plan that aligns your content with revenue goals. We don't just consult; we engineer your market dominance."
          </p>
        </div>
      </div>

      {/* Yadish - Head of Systems */}
      <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900 h-[500px]">
        <div className="absolute inset-0">
          <img src="/team/yadish.png" alt="Yadish" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <div className="absolute top-10 right-10 p-3 bg-teal/10 rounded-xl text-teal opacity-50 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-teal/20">
            <Code className="w-8 h-8" />
          </div>

          <h3 className="text-3xl font-display font-bold mb-2">YADISH</h3>
          <p className="text-teal font-mono text-sm tracking-widest mb-6">HEAD OF SYSTEMS</p>
          <p className="text-gray-300 text-base leading-relaxed">
            "Beautiful content is useless if it doesn't convert. I build the invisible infrastructure—the funnels, the automations, the code—that turns views into dollars."
          </p>
        </div>
      </div>

      {/* Chaitanya - Head of Visuals */}
      <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900 h-[500px]">
        <div className="absolute inset-0">
          <img src="/team/chaitanya.png" alt="Chaitanya" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <div className="absolute top-10 right-10 p-3 bg-orange/10 rounded-xl text-orange opacity-50 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-orange/20">
            <Youtube className="w-8 h-8" />
          </div>

          <h3 className="text-3xl font-display font-bold mb-2">CHAITANYA</h3>
          <p className="text-orange font-mono text-sm tracking-widest mb-6">HEAD OF VISUALS</p>
          <p className="text-gray-300 text-base leading-relaxed">
            "Attention is a currency. I don't just edit videos; I engineer psychological hooks that force the brain to keep watching. Every frame is a calculated decision."
          </p>
        </div>
      </div>
    </div>

    {/* The Elite Unit - Redesigned */}
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-mono text-teal tracking-widest mb-4">THE UNIT</h3>
        <h2 className="text-4xl md:text-5xl font-display font-bold">PARAMILITARY CREATIVE OPS</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Card 1: Editors (Large) */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-500">
          <div className="absolute inset-0 bg-noise opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-orange/10 rounded-xl text-orange">
                <Layers className="w-8 h-8" />
              </div>
              <div className="px-3 py-1 rounded-full border border-orange/20 text-orange text-xs font-mono bg-orange/5">
                DEPLOYED
              </div>
            </div>

            <div>
              <h4 className="text-6xl font-display font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">18</h4>
              <h5 className="text-xl font-bold text-gray-300 mb-2">Elite Editors</h5>
              <p className="text-sm text-gray-500 leading-relaxed">
                Specialized in retention engineering. Each editor is trained on a specific platform (Shorts, Long-form, Ads) to maximize algorithm favorability.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Strategists */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-500 p-6">
          <div className="absolute top-0 right-0 w-20 h-20 bg-teal/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal/20 transition-colors" />
          <div className="relative z-10">
            <div className="mb-4 text-teal"><BarChart3 className="w-6 h-6" /></div>
            <div className="text-4xl font-display font-bold text-white mb-1">03</div>
            <div className="font-bold text-gray-300 text-sm">Content Strategists</div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-teal w-3/4" />
            </div>
          </div>
        </div>

        {/* Card 3: Developers */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-500 p-6">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
          <div className="relative z-10">
            <div className="mb-4 text-blue-400"><Code className="w-6 h-6" /></div>
            <div className="text-4xl font-display font-bold text-white mb-1">04</div>
            <div className="font-bold text-gray-300 text-sm">Full-Stack Devs</div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-4/5" />
            </div>
          </div>
        </div>

        {/* Card 4: Creative Directors */}
        <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-all duration-500 p-6 flex items-center justify-between">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-purple-400"><Zap className="w-5 h-5" /></div>
              <div className="text-4xl font-display font-bold text-white">02</div>
            </div>
            <div className="font-bold text-gray-300">Creative Directors</div>
          </div>
          <div className="relative z-10 text-right">
            <div className="text-xs text-gray-500 font-mono mb-1">STATUS</div>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              ONLINE
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "Cody Horn",
      role: "Community Coach",
      text: "As a busy coach focused on my community, I needed a content team I could trust completely, and handing everything over to them was the single best decision for my business. Their support is unparalleled. From sharp scripting with viral hooks to the incredible technical skill in their edits—like the muscle CGI overlays—they consistently deliver.",
      img: "/testimonials/Cody horn.jpg",
      metric: "Primary Revenue Driver"
    },
    {
      name: "Stephanie",
      role: "Influencer",
      text: "I dedicate my incredible growth entirely to the team at Let's Build Brand. When we started 4 months ago, I was at 10k followers; today, I'm at 550k. This would have been impossible without their expert strategy and their amazing video editing team.",
      img: "/testimonials/stephanie.jpg",
      metric: "10k → 550k Followers"
    },
    {
      name: "Johann De Silva",
      role: "Martial Arts Instructor",
      text: "It's rare to find a creative team that truly listens and executes with such precision. They took my vision for my Taekwon-Do content and captured the energy and discipline of the art form in every edit. The final videos were exactly my dream style, only better.",
      img: "/testimonials/Joahnn De Silva.jpg",
      metric: "Perfect Execution"
    },
    {
      name: "Innerlink",
      role: "Agency Partner",
      text: "We gave them an incredibly demanding project: 60 videos in just 10 days. Not only did they deliver on time, but the quality was exceptional. Their systematic process, which included three rounds of quality checks, ensured every video was perfect.",
      img: "/testimonials/innerlink.jpg",
      metric: "60 Videos in 10 Days"
    },
    {
      name: "Avi Javeri",
      role: "Strategist",
      text: "They are the complete package. From developing a winning content strategy and scripts to delivering flawless video edits, they managed it all. But what truly sets them apart is their genuine support. They were true partners who hand-held me through the process.",
      img: "/testimonials/avi javeri.jpg",
      metric: "Complete Package"
    },
    {
      name: "Joni",
      role: "Creative Partner",
      text: "I'm speechless. What this team created wasn't just a video, it was a true piece of art. Beyond the phenomenal editing, what really stood out was their personal touch. They helped with strategy, gave inspiration for how to shoot, and offered incredible support.",
      img: "/testimonials/joni.jpg",
      metric: "True Art"
    },
    {
      name: "Jason",
      role: "Content Creator",
      text: "The video edits were absolutely insane—they completely blew me away. This team doesn't just deliver; they surprise you with their level of expertise and dedication. The quality was perfect, and their supportive attitude made the collaboration seamless. Highly recommend for anyone looking for exceptional results.",
      img: "/testimonials/jason.jpg",
      metric: "Exceptional Quality"
    },
    {
      name: "Beknown Brand",
      role: "B2B Partner",
      text: "High-quality work, quick turnarounds, and extremely affordable. A solid B2B backend partner. Deliveries of 120 videos within a month were completed smoothly.",
      img: "/testimonials/beknown brand.jpg",
      metric: "120 Videos/Month"
    },
    {
      name: "Mohan",
      role: "Agency Partner",
      text: "As a backend B2B partner, Chaitanya & Yadish and their team have been exceptional. Quick deliveries, consistently high-quality work, and extremely affordable rates make them a reliable extension of our operations. Professional, efficient, and dependable.",
      img: "/testimonials/mohan.jpg",
      metric: "Reliable Extension"
    },
    {
      name: "Lua Filmmaker",
      role: "Filmmaker",
      text: "Excellent and fantastic cinematic video editing with exceptional attention to detail.",
      img: "/testimonials/lua.jpg",
      metric: "Cinematic Detail"
    },
    {
      name: "PUK Promotions",
      role: "Brand",
      text: "Chaitanya and his team delivered exceptional results. The advanced Al VFX, cinematic CGI, and smoke effects were executed flawlessly with impressive speed. Communication was clear, delivery was fast, and the final output felt truly premium.",
      img: "/testimonials/PUK promotions.jpg",
      metric: "Advanced AI VFX"
    },
    {
      name: "And 50+ More",
      role: "Global Partners",
      text: "We've silently scaled dozens of other brands across 3 continents. The system works universally. The only variable missing is you. Are you ready to stop guessing and start dominating?",
      img: "special_plus",
      metric: "You're Next"
    }
  ];

  return (
    <section className="py-24 container mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">THE VERDICT</h2>
      <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
        We don't chase likes. We chase revenue, reputation, and retention. Here is the data from the frontlines.
      </p>

      {/* Masonry-style Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((t, i) => (
          <div key={i} className="break-inside-avoid relative group">
            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${t.img === 'special_plus' ? 'bg-orange/40' : 'bg-gradient-to-r from-orange/20 to-teal/20'}`} />
            <div className={`relative border p-6 rounded-2xl backdrop-blur-sm transition-colors duration-300 ${t.img === 'special_plus' ? 'bg-orange/10 border-orange/20 hover:bg-orange/20' : 'bg-slate-900/50 border-white/10 hover:bg-slate-900'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  {t.img === 'special_plus' ? (
                    <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center border-2 border-white/10 text-black">
                      <Users className="w-6 h-6" />
                    </div>
                  ) : (
                    <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-white/20">
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400/10" />
                  </div>
                </div>
                <div>
                  <h4 className={`font-bold font-display leading-tight ${t.img === 'special_plus' ? 'text-orange' : 'text-white'}`}>{t.name}</h4>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{t.role}</p>
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${t.img === 'special_plus' ? 'text-white font-medium' : 'text-gray-300'}`}>
                "{t.text}"
              </p>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${t.img === 'special_plus' ? 'bg-orange text-black border-orange' : 'bg-white/5 border-white/10 text-teal'}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                {t.metric}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProofOfConcepts = () => {
  const allImages = Array.from({ length: 46 }, (_, i) => i + 1)
    .filter(id => ![22, 37, 45].includes(id))
    .map(id => `/pow/${id}.jpg`);

  // Split images for two logical rows
  const midpoint = Math.ceil(allImages.length / 2);
  const row1 = allImages.slice(0, midpoint);
  const row2 = allImages.slice(midpoint);

  return (
    <section className="py-24 border-t border-white/5 bg-black/20 overflow-hidden">
      <div className="text-center mb-16">
        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">The Receipts</h3>
        <h2 className="text-3xl font-display font-bold text-white">PROVEN RESULTS</h2>
      </div>

      {/* Container for the two rows */}
      <div className="space-y-4">
        {/* Row 1 - Left to Right */}
        <div className="flex overflow-hidden relative mask-gradient">
          <div
            className="flex whitespace-nowrap animate-scroll hover:pause gap-4"
            style={{ animationDuration: '60s' }}
          >
            {[...row1, ...row1, ...row1].map((src, i) => (
              <div key={i} className="min-w-[300px] h-60 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 relative group">
                <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
                <img
                  src={src}
                  alt={`Proof Row 1 ${i}`}
                  className="relative z-10 h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex overflow-hidden relative mask-gradient">
          <div
            className="flex whitespace-nowrap animate-scroll hover:pause gap-4"
            style={{ animationDuration: '70s', animationDirection: 'reverse' }}
          >
            {[...row2, ...row2, ...row2].map((src, i) => (
              <div key={i} className="min-w-[300px] h-60 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 relative group">
                <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
                <img
                  src={src}
                  alt={`Proof Row 2 ${i}`}
                  className="relative z-10 h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Who is this service built for?",
      a: "This is built specifically for agencies and professional creators who want consistent, high-quality video delivery without hiring, training, or managing an internal editing team. If you sell video services, we become your invisible backend team."
    },
    {
      q: "How fast is your turnaround time?",
      a: "Most videos are delivered within 24 hours. Larger or complex projects may take slightly longer—but timelines are always clearly communicated upfront. Speed without compromising quality is our core system."
    },
    {
      q: "Is this a white-labeled service?",
      a: "Yes. 100% white-labeled. Your clients never know we exist. All communication, files, and deliveries are handled under your brand identity."
    },
    {
      q: "How do you maintain consistent quality?",
      a: "Every video goes through a 3-step process: \n1. Assigned editor based on video style \n2. Internal Quality Assurance review \n3. Final export check before delivery \nThis ensures consistency—even at high volumes."
    },
    {
      q: "How do revisions work?",
      a: "We handle 2 Free revisions as per your client’s feedback. A 3rd revision costs some percentage of the video budget. You don’t deal with back-and-forth—we manage the entire revision cycle for you."
    },
    {
      q: "Can you match different editing styles and trends?",
      a: "Absolutely. We work with style-specific editors and continuously adapt to platform trends across Instagram, YouTube, TikTok, and ads. Your content stays relevant, not outdated."
    },
    {
      q: "How many videos can you handle per month?",
      a: "Our system supports 500+ videos per month without quality drop. Whether you have 5 clients or 50, our infrastructure scales with you."
    },
    {
      q: "Will my clients be updated during the process?",
      a: "Yes. We provide real-time updates and clear status tracking so nothing goes silent. This protects your client relationships and builds long-term trust."
    },
    {
      q: "What makes you different from freelancers or in-house editors?",
      a: "Freelancers disappear. Employees need training, salaries, and management. We provide: Zero hiring headaches, No turnover risk, Predictable delivery, and Proven systems. You focus on growth, not operations."
    },
    {
      q: "How do we get started?",
      a: "Book a strategy call. We understand your workflow, volume, and style—then plug in seamlessly. New brands currently get a FLAT 10% OFF."
    }
  ];

  return (
    <section id="faq" className="py-20 container mx-auto px-6 max-w-4xl">
      <h2 className="text-4xl font-display font-bold mb-12 text-center">FREQUENTLY ASKED</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const Globe = () => {
  const canvasRef = React.useRef();

  const markers = [
    { location: [40, -100], size: 0.05 }, // USA
    { location: [51, 10], size: 0.05 }, // Germany
    { location: [36, 138], size: 0.05 }, // Japan
    { location: [20, 78], size: 0.05 }, // India
    { location: [55, -3], size: 0.05 }, // UK
    { location: [46.2, 2.2], size: 0.05 }, // France
    { location: [60, -106], size: 0.05 }, // Canada
    { location: [60, 100], size: 0.05 }, // Russia
    { location: [-25, 133], size: 0.05 }, // Australia
    { location: [40, -3], size: 0.05 }, // Spain
    { location: [24, 54], size: 0.05 }, // UAE
    { location: [1.3, 103.8], size: 0.05 }, // Singapore
    { location: [56.2, 9.5], size: 0.05 }, // Denmark
    { location: [64, 26], size: 0.05 }, // Finland
    { location: [50.5, 4.4], size: 0.05 }, // Belgium
    { location: [-30, 25], size: 0.05 }, // South Africa
    { location: [15, 100], size: 0.05 }, // Thailand
    { location: [9.0, 8.6], size: 0.05 }, // Nigeria
    { location: [45.1, 15.2], size: 0.05 }, // Croatia
    { location: [0.02, 37.9], size: 0.05 }, // Kenya
    { location: [1.3, 32.2], size: 0.05 }, // Uganda
    { location: [33, 35], size: 0.05 }, // Lebanon
  ];

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0.8, 0], // Gold
      glowColor: [0, 0.9, 1],
      markers: markers,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
      />
    </div>
  );
};

const MidSectionCTA = ({ onOpenModal }) => (
  <section className="py-12 border-y border-white/10 bg-orange/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-noise opacity-10" />
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
      <div>
        <h3 className="text-2xl font-display font-bold mb-1">SEEN ENOUGH?</h3>
        <p className="text-gray-400 text-sm">Stop guessing. Start engineering attention.</p>
      </div>
      <button
        onClick={onOpenModal}
        className="group flex items-center gap-2 bg-white text-black px-6 py-3 font-bold font-display uppercase tracking-wide hover:bg-orange hover:text-white transition-all duration-300"
      >
        Get The Blueprint
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </section>
);

const FinalCTA = ({ onOpenModal }) => (
  <section className="py-32 container mx-auto px-6 text-center relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange/20 to-teal/20 rounded-full blur-[120px] -z-10" />

    <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 uppercase leading-[0.9]">
      The System <br /> Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-teal">Ready.</span>
    </h2>
    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
      You have two choices: Continue posting into the void, or deploy a retention architecture that forces the algorithm to favor you.
    </p>

    <button
      onClick={onOpenModal}
      className="relative group inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-display font-bold text-xl uppercase tracking-widest overflow-hidden hover:bg-orange hover:text-white transition-all duration-500"
    >
      <span className="relative z-10">Initialize Protocol</span>
      <div className="absolute inset-0 bg-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
    </button>
  </section>
);

const GlobalOperations = () => {
  // Sorted by approximate GDP
  const countries = [
    "United States of America",
    "Germany",
    "Japan",
    "India",
    "United Kingdom",
    "France",
    "Canada",
    "Russia",
    "Australia",
    "Spain",
    "United Arab Emirates",
    "Singapore",
    "Denmark",
    "Finland",
    "Belgium",
    "South Africa",
    "Thailand",
    "Nigeria",
    "Croatia",
    "Kenya",
    "Uganda",
    "Lebanon"
  ];

  return (
    <section className="py-20 container mx-auto px-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">GLOBAL <br /> REVENUE ARCHITECTURE</h2>
          <p className="text-gray-400 text-lg mb-8">
            We don't just edit; we <span className="text-white font-bold">localize and scale</span>.
            We are actively engineering revenue for clients across <span className="text-teal font-bold">20+ countries' markets</span>, ensuring your message dominates from Tokyo to Toronto.
          </p>

          <div className="mb-3 text-xs font-mono text-gray-500 uppercase tracking-widest">Our clients are from:</div>

          <div className="flex flex-wrap gap-2">
            {countries.map((country, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-teal hover:bg-teal/10 transition-colors">
                {country}
              </span>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange/10 to-teal/10 blur-[100px] rounded-full" />
          <Globe />
        </div>
      </div>
    </section>
  );
};

// --- Add new imports to the list at the top first if not present, but for this tool I will assume I need to add the Footer component definition and then use it.
// Wait, I can't edit imports and the footer location easily in one go if they are far apart.
// I will just define the Footer component before App and replace the footer in App.
// Actually, I should update the imports first or use existing icons or generic SVGs? 
// I have 'MapPin' and 'Mail' in my plan but I need to check if they are imported.
// Step 70 shows imports: ... Layers, BarChart3, Lock, Volume2, VolumeX.
// I need to add MapPin, Mail, Linkedin, Twitter (or similar) to imports.

const Footer = ({ onNavigate }) => (
  <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-noise opacity-5" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        {/* Brand & Address */}
        <div className="md:col-span-2">
          <div className="text-3xl font-bold font-display tracking-tighter text-white mb-6">LBB.</div>
          <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
            We engineer attention for brands that define culture. A paramilitary creative unit dedicated to high-ticket retention and revenue.
          </p>

          <div className="flex flex-col gap-6 text-gray-400 mb-4">
            {/* India Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange mt-1 shrink-0" />
              <div className="text-sm leading-relaxed">
                <span className="text-white font-bold block mb-1">INDIA HEADQUARTERS</span>
                201, Wing-B, Cube Vastu,<br />
                Kanchanwadi, Chhatrapati Sambhajinagar (Aurangabad),<br />
                Maharashtra - 431011, India
              </div>
            </div>

            {/* USA Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal mt-1 shrink-0" />
              <div className="text-sm leading-relaxed">
                <span className="text-white font-bold block mb-1">USA HEADQUARTERS <span className="text-xs font-normal text-teal border border-teal/20 bg-teal/10 px-2 py-0.5 rounded-full ml-2">OPENING SOON</span></span>
                555 California Street, Suite 4900,<br />
                San Francisco, CA 94104,<br />
                United States
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold font-display mb-6">EXPLORE</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><button onClick={() => onNavigate('home')} className="hover:text-orange transition-colors">Home</button></li>
            <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('work')?.scrollIntoView(), 100); }} className="hover:text-orange transition-colors">Selected Work</button></li>
            <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('why-us')?.scrollIntoView(), 100); }} className="hover:text-orange transition-colors">Why Us</button></li>
            <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('protocol')?.scrollIntoView(), 100); }} className="hover:text-orange transition-colors">The Protocol</button></li>
            <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('team')?.scrollIntoView(), 100); }} className="hover:text-orange transition-colors">The Unit</button></li>
            <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView(), 100); }} className="hover:text-orange transition-colors">FAQ</button></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-bold font-display mb-6">CONNECT</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <a href="mailto:letsbuildbrand.us@gmail.com" className="flex items-center gap-2 hover:text-teal transition-colors">
                <Mail className="w-4 h-4" />
                letsbuildbrand.us@gmail.com (USA)
              </a>
            </li>
            <li>
              <a href="mailto:letsbuildbrand.in@gmail.com" className="flex items-center gap-2 hover:text-teal transition-colors">
                <Mail className="w-4 h-4" />
                letsbuildbrand.in@gmail.com (India)
              </a>
            </li>
            <li>
              <a href="mailto:yadish@letsbuildbrand.com" className="flex items-center gap-2 hover:text-teal transition-colors">
                <Mail className="w-4 h-4" />
                yadish@letsbuildbrand.com
              </a>
            </li>
            <li className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/letsbuildbrand.us" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-gray-400 border border-white/5">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-gray-400 border border-white/5">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-gray-400 border border-white/5">
                <Twitter className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
        <div>&copy; {new Date().getFullYear()} Let's Build Brand. All rights reserved.</div>
        <div className="flex gap-8">
          <button onClick={() => onNavigate('privacy')} className="hover:text-gray-400 transition-colors uppercase">PRIVACY POLICY</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-gray-400 transition-colors uppercase">TERMS OF SERVICE</button>
        </div>
      </div>
    </div>
  </footer>
);

const TermsOfService = () => (
  <section className="pt-32 pb-20 container mx-auto px-6 min-h-screen text-gray-300">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">TERMS OF SERVICE</h1>
      <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-12 leading-relaxed">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">1. THE LBB PROTOCOL & CREDIT SYSTEM</h3>
          <p className="mb-4">
            Let's Build Brand ("LBB") operates on a flexible, currency-based model designed for speed and scalability. All services are exchanged for <strong>LBB Credits</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Credit Packages:</strong> Credits are purchased in prepaid packages. The cost per credit varies based on the specific promotional offer or volume deal active at the time of purchase.</li>
            <li><strong>Expiration Policy:</strong> To ensure our team's availability and schedule integrity, purchased credits have a lifespan of <strong>60 days</strong> from the date of invoice payment. Unused credits after this period are subject to expiration.</li>
            <li><strong>Valuation:</strong> Content complexity dictates usage.
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-500">
                <li>Standard Short-Form content starts at <strong>1 Credit per video</strong>.</li>
                <li>Long-Form content and complex visual effects are quoted custom credits.</li>
              </ul>
            </li>
            <li><strong>Fair Scope Agreement:</strong> Final credit cost is mutually agreed upon before work commences, based on the provided reference video and scope. Any mid-project changes to the requirements will induce a re-calculation of the credit cost.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">2. TURNAROUND & DELIVERY</h3>
          <p>
            We operate on a <strong>24-Hour Turnaround Time</strong> standard for routine edits and ongoing subscriptions.
            <br /><br />
            Please note:
            High-complexity projects (e.g., 3D motion graphics, 10min+ documentaries) may require extended timelines, which will be communicated explicitly via your Client Dashboard.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">3. CLIENT DASHBOARD & WORKFLOW</h3>
          <p className="mb-4">
            Access to our proprietary <strong>LBB Client Dashboard</strong> is granted upon onboarding. This tool is the single source of truth for our partnership.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong>Requests:</strong> All new edits must be submitted via the Dashboard to ensure proper tracking.</li>
            <li><strong>Communication:</strong> Direct lines to your Project Manager and Editor are facilitated within the platform.</li>
            <li><strong>Tracking:</strong> Real-time status updates (In Queue, Editing, Review, Completed) and Credit Ledger history are visible 24/7.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">4. GLOBAL SUPPORT</h3>
          <p>
            While our creatives operate globally to ensure 24-hour coverage, our Headquarters and administrative support are based in the <strong>USA</strong>. Support tickets raised regarding billing, credits, or account management are handled by our US team.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">5. INTELLECTUAL PROPERTY</h3>
          <p>
            Upon final credit deduction, full copyright of the finished produced video files is transferred to the Client. LBB retains the right to display the work in our portfolio unless a Non-Disclosure Agreement (NDA) has been signed.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const PrivacyPolicy = () => (
  <section className="pt-32 pb-20 container mx-auto px-6 min-h-screen text-gray-300">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">PRIVACY POLICY</h1>
      <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-12 leading-relaxed">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">DATA COLLECTION & USAGE</h3>
          <p>
            We collect information strictly necessary to execute our services: Name, Email, Billing Information, and Raw Content Assets (Video/Audio files).
            <br /><br />
            Your data is primarily used within the <strong>LBB Client Dashboard</strong> to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
            <li>Facilitate project management and communication.</li>
            <li>Track credit usage and project progress.</li>
            <li>Ensure legal compliance and secure asset delivery.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">ASSET SECURITY</h3>
          <p>
            All raw footage and assets uploaded to our system are stored on secure, encrypted cloud servers. Access is restricted strictly to the assigned creative team (Editors, Project Managers) and is revoked once the project is archived.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">THIRD-PARTY SHARING</h3>
          <p>
            We do not sell your personal data. We may share necessary data with trusted third-party infrastructure providers (e.g., Stripe for payments, Cloud Storage providers) solely for the purpose of maintaining service functionality.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">CONTACT US</h3>
          <p>
            For privacy-related inquiries or to request data deletion, please contact our USA Headquarters support team via the Dashboard or email hello@letsbuildbrand.com.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Home = ({ onOpenModal }) => (
  <>
    <Hero />
    <Marquee />
    <Protocol />
    <Portfolio />
    <WhyUs />
    <MidSectionCTA onOpenModal={onOpenModal} />
    <Founders />
    <GlobalOperations />
    <Testimonials />
    <ProofOfConcepts />
    <FAQ />
    <FinalCTA onOpenModal={onOpenModal} />
  </>
);

const BookingModal = ({ isOpen, onClose }) => {
  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh]"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white/50 backdrop-blur-sm p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 w-full h-full bg-white">
                <iframe
                  src="https://www.cal.id/lbb-us"
                  style={{ border: 0 }}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Schedule Appointment"
                ></iframe>
              </div>

              <div className="p-3 text-center bg-gray-900 border-t border-gray-800">
                <a
                  href="https://www.cal.id/lbb-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-200 hover:text-orange underline transition-colors"
                >
                  Click here if booking window doesn't open automatically
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-premium-dark min-h-screen text-white selection:bg-orange selection:text-white">
      <div className="bg-noise" />

      <Navbar onOpenModal={() => setIsModalOpen(true)} onNavigate={navigateTo} />

      <main>
        {currentPage === 'home' && <Home onOpenModal={() => setIsModalOpen(true)} />}
        {currentPage === 'terms' && <TermsOfService />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
      </main>

      <Footer onNavigate={navigateTo} />

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
