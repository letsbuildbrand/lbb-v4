import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Play, Code, Smartphone,
  Youtube, TrendingUp, DollarSign, MousePointer2,
  CheckCircle2, Calendar, Clock, ChevronRight,
  Users, Zap, HelpCircle, ChevronDown, BadgeCheck,
  Layers, BarChart3, Lock
} from 'lucide-react';
import createGlobe from 'cobe';

// --- COMPONENTS ---

const Navbar = ({ onOpenModal }) => (
  <nav className="fixed top-0 left-0 right-0 z-40 glass-nav px-6 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-12">
      <div className="text-2xl font-bold font-display tracking-tighter text-white">LBB.</div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#protocol" className="hover:text-white transition-colors">Protocol</a>
        <a href="#team" className="hover:text-white transition-colors">Team</a>
        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
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
          <span>ACCEPTING 2 NEW PARTNERS FOR Q4</span>
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
                <div className="w-8 h-8 rounded bg-orange/20 flex items-center justify-center text-orange">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-16 bg-white/20 rounded mb-1" />
                  <div className="h-1.5 w-8 bg-white/10 rounded" />
                </div>
                <div className="text-xs text-green-400 font-mono">+42%</div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 w-full p-3 bg-white/5 rounded-lg border border-white/5 shadow-lg"
                animate={{ x: mousePosition.x * 15, y: mousePosition.y * 15 }}
              >
                <div className="w-8 h-8 rounded bg-teal/20 flex items-center justify-center text-teal">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-20 bg-white/20 rounded mb-1" />
                  <div className="h-1.5 w-12 bg-white/10 rounded" />
                </div>
                <div className="text-xs text-green-400 font-mono">$12.4k</div>
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

const Portfolio = () => (
  <section id="work" className="py-20 container mx-auto px-6">
    <h2 className="text-4xl font-display font-bold mb-12 text-center">SELECTED WORKS</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px]">
      {/* Item 1 - Large */}
      <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-2xl bg-gradient-to-br from-orange-900 to-slate-900 border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <Play className="w-16 h-16 text-white fill-white" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold font-display">Fintech Launch</h3>
          <p className="text-sm text-gray-300">Campaign Strategy</p>
        </div>
      </div>

      {/* Item 2 */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-bl from-teal-900 to-slate-900 border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <Play className="w-12 h-12 text-white fill-white" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold font-display">SaaS Promo</h3>
        </div>
      </div>

      {/* Item 3 */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-tr from-purple-900 to-slate-900 border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <Play className="w-12 h-12 text-white fill-white" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold font-display">Viral Reel</h3>
        </div>
      </div>

      {/* Item 4 - Wide */}
      <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <Play className="w-12 h-12 text-white fill-white" />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold font-display">E-Com Scale</h3>
        </div>
      </div>
    </div>
  </section>
);

const Founders = () => (
  <section id="team" className="py-32 container mx-auto px-6">
    <h2 className="text-4xl font-display font-bold mb-16 text-center">THE ARCHITECTS</h2>
    <div className="grid md:grid-cols-2 gap-12 mb-20">
      {/* Yadish - Head of Systems */}
      <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900 h-[500px]">
        <div className="absolute inset-0">
          <img src="/team/yadish.png" alt="Yadish" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-10 h-full flex flex-col justify-end">
          <div className="absolute top-10 right-10 p-3 bg-teal/10 rounded-xl text-teal opacity-50 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-teal/20">
            <Code className="w-8 h-8" />
          </div>

          <h3 className="text-4xl font-display font-bold mb-2">YADISH</h3>
          <p className="text-teal font-mono text-sm tracking-widest mb-6">HEAD OF SYSTEMS</p>
          <p className="text-gray-300 text-lg leading-relaxed">
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

        <div className="relative z-10 p-10 h-full flex flex-col justify-end">
          <div className="absolute top-10 right-10 p-3 bg-orange/10 rounded-xl text-orange opacity-50 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-orange/20">
            <Youtube className="w-8 h-8" />
          </div>

          <h3 className="text-4xl font-display font-bold mb-2">CHAITANYA</h3>
          <p className="text-orange font-mono text-sm tracking-widest mb-6">HEAD OF VISUALS</p>
          <p className="text-gray-300 text-lg leading-relaxed">
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

const Testimonials = () => (
  <section className="py-20 container mx-auto px-6">
    <h2 className="text-4xl font-display font-bold mb-12 text-center">THE ROI</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { metric: "+$40k MRR", text: "The funnel Yadish built is printing money. Literally.", author: "SaaS Founder", handle: "@saas_king" },
        { metric: "2.1M Views", text: "Chaitanya's editing style is unlike anything on the market.", author: "Coach X", handle: "@coach_x" },
        { metric: "3x ROAS", text: "We stopped running ads and just used LBB organic content.", author: "E-com Brand", handle: "@ecom_scale" },
        { metric: "150% Growth", text: "The team is a machine. They don't miss deadlines.", author: "Agency Owner", handle: "@agency_life" },
        { metric: "Viral Hit", text: "First video they touched got 500k views. Insane.", author: "Fitness Influencer", handle: "@fit_pro" },
        { metric: "Zero Churn", text: "Our clients stay because the content actually performs.", author: "Marketing Director", handle: "@cmo_daily" }
      ].map((t, i) => (
        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900" />
              <div>
                <div className="font-bold text-sm flex items-center gap-1">
                  {t.author}
                  <BadgeCheck className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                </div>
                <div className="text-xs text-gray-500">{t.handle}</div>
              </div>
            </div>
            <div className="text-teal font-bold text-xs bg-teal/10 px-2 py-1 rounded border border-teal/20">
              {t.metric}
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.text}"</p>
        </div>
      ))}
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "Why are you more expensive than freelancers?", a: "Because we don't just 'edit'. We engineer assets that generate revenue. You aren't paying for time; you're paying for the 8-person team and the system that guarantees quality at scale." },
    { q: "What is the turnaround time?", a: "48-72 hours for standard deliverables. We move fast because money loves speed." },
    { q: "Do you handle the strategy or just execution?", a: "Both. We audit your current leaks, build the roadmap, and then execute the content and funnels to fix them." },
    { q: "Can I just hire you for editing?", a: "Yes, but our highest ROI comes from the full 'Content + Funnel' ecosystem. We prefer partners who want to dominate, not just post." }
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
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ22TRgjCde992OaMMdXilTx44Sey56rm_n0cwocUecwyfCKfPobFwzFsRkrZ14CFAAgZdmfVJKv?gv=true"
                  style={{ border: 0 }}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Schedule Appointment"
                ></iframe>
              </div>

              <div className="p-3 text-center bg-slate-50 border-t border-gray-200">
                <a
                  href="https://calendar.app.google/RLpuXEWaSmHyb2ML8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-orange underline transition-colors"
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

  return (
    <div className="bg-premium-dark min-h-screen text-white selection:bg-orange selection:text-white">
      <div className="bg-noise" />

      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main>
        <Hero />
        <Marquee />
        <Protocol />
        <Portfolio />
        <MidSectionCTA onOpenModal={() => setIsModalOpen(true)} />
        <Founders />
        <GlobalOperations />
        <Testimonials />
        <FAQ />
        <FinalCTA onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10 bg-black">
        <p>&copy; 2025 Let's Build Brand. All rights reserved.</p>
      </footer>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
