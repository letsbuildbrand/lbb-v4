import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const codeSnippet = `const optimizeFunnel = async () => {
  const data = await analyzeTraffic();
  const conversion = data.users
    .filter(u => u.intent === 'high')
    .map(u => u.convertToSale());
  
  return conversion.scale(100);
};`;

const TechStack = () => {
    const [text, setText] = useState('');
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        // Simple typing effect loop
        let timeout;
        if (text.length < codeSnippet.length) {
            timeout = setTimeout(() => {
                setText(codeSnippet.slice(0, text.length + 1));
            }, 50);
        } else {
            timeout = setTimeout(() => {
                setShowVideo(true);
            }, 1000);
        }
        return () => clearTimeout(timeout);
    }, [text]);

    return (
        <section className="py-32 bg-void flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">CODE MEETS CINEMA</h2>

                <div className="relative w-full aspect-video glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan/10">
                    {/* Laptop Header */}
                    <div className="h-8 bg-black/50 border-b border-white/10 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>

                    {/* Content */}
                    <div className="relative w-full h-full bg-black/80 font-mono p-8 text-sm md:text-lg text-green-400 overflow-hidden">
                        <div className={`absolute inset-0 p-8 transition-opacity duration-500 ${showVideo ? 'opacity-0' : 'opacity-100'}`}>
                            <pre className="whitespace-pre-wrap">
                                {text}
                                <span className="animate-pulse">|</span>
                            </pre>
                        </div>

                        {/* Video Transformation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: showVideo ? 1 : 0, scale: showVideo ? 1 : 0.8 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-black flex items-center justify-center"
                        >
                            {/* Placeholder for Video */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                            <div className="relative z-10 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 cursor-pointer hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-2xl font-bold">LBB SHOWREEL 2025</h3>
                                <p className="text-gray-300">High Performance Creative</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
