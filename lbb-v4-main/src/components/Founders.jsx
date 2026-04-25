import React from 'react';
import { motion } from 'framer-motion';
import { Code, Film } from 'lucide-react';

const Founders = () => {
    return (
        <section className="py-32 bg-void relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">THE ARCHITECTS</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-lime to-cyan mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto relative">
                    {/* DNA Strand Simulation (Center Line) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2">
                        {/* Animated DNA nodes could go here */}
                    </div>

                    {/* Yadish */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
                        {/* Placeholder Image for Yadish */}
                        <div className="absolute inset-0 bg-neutral-800 grayscale group-hover:grayscale-0 transition-all duration-700">
                            <div className="w-full h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-lime/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-3 mb-2 text-lime">
                                <Film className="w-6 h-6" />
                                <span className="font-mono text-sm tracking-wider">CREATIVE DIRECTOR</span>
                            </div>
                            <h3 className="text-4xl font-bold mb-4">YADISH</h3>
                            <p className="text-gray-400 max-w-md">
                                VISUAL ENGINEERING. We don't just edit; we manipulate time and psychology to retain attention.
                            </p>
                        </div>
                    </motion.div>

                    {/* Chaitanya */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
                        {/* Placeholder Image for Chaitanya */}
                        <div className="absolute inset-0 bg-neutral-800 grayscale group-hover:grayscale-0 transition-all duration-700">
                            <div className="w-full h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-3 mb-2 text-cyan">
                                <Code className="w-6 h-6" />
                                <span className="font-mono text-sm tracking-wider">SYSTEM ARCHITECT</span>
                            </div>
                            <h3 className="text-4xl font-bold mb-4">CHAITANYA</h3>
                            <p className="text-gray-400 max-w-md">
                                SYSTEM ARCHITECTURE. Beautiful videos are useless without the backend to capture the cash.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Founders;
