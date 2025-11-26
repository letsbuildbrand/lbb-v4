import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        x.set(clientX - centerX);
        y.set(clientY - centerY);
    };

    const rotateX = useTransform(y, [-500, 500], [5, -5]);
    const rotateY = useTransform(x, [-500, 500], [-5, 5]);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void pt-20"
            onMouseMove={handleMouseMove}
        >
            {/* Background Mesh Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/20 rounded-full blur-[100px] mix-blend-screen translate-x-20 translate-y-20" />
            </div>

            <div className="z-10 text-center max-w-5xl px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
                    style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}
                >
                    ATTENTION IS <br /> THE NEW OIL.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-textGrey mb-12 max-w-2xl mx-auto"
                >
                    We refine it through Retina-Retention Editing and High-Performance Funnels.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        SCALE YOUR BRAND <ArrowRight className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </motion.button>
            </div>

            {/* Floating Glass Card / Before After Slider Placeholder */}
            <motion.div
                style={{ rotateX, rotateY, perspective: 1000 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-20 relative w-full max-w-5xl mx-auto h-[300px] md:h-[500px] glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-lime/5"
            >
                <div className="absolute inset-0 flex">
                    {/* Left Side - Average */}
                    <div className="w-1/2 bg-gray-900 flex items-center justify-center border-r border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 transition-opacity duration-500 group-hover:opacity-40" />
                        <span className="relative z-20 text-gray-400 font-mono text-xl md:text-3xl font-bold tracking-widest opacity-50">AVERAGE</span>
                        {/* Simulated blurry content */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 blur-xl opacity-50" />
                    </div>
                    {/* Right Side - LBB */}
                    <div className="w-1/2 bg-black flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-cyan/5 z-0" />
                        <span className="relative z-20 text-chrome font-bold text-xl md:text-3xl tracking-widest drop-shadow-[0_0_15px_rgba(217,255,0,0.5)]">LBB ENGINEERED</span>
                        {/* Sharp content simulation */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime/20 via-black to-black opacity-60 mix-blend-screen" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:opacity-50 transition-opacity duration-500" />
                    </div>

                    {/* Slider Handle */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)] flex items-center justify-center -translate-x-1/2">
                        <div className="w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] backdrop-blur-md">
                            <div className="flex gap-1">
                                <div className="w-0.5 h-4 bg-white/50 rounded-full" />
                                <div className="w-0.5 h-4 bg-white/50 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
