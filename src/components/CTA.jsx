import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock } from 'lucide-react';

const CTA = () => {
    const [completed, setCompleted] = useState(false);

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 200) {
            setCompleted(true);
            // Here you would typically trigger the application modal or redirect
            console.log("Application Triggered");
        }
    };

    return (
        <section className="py-32 bg-void flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-5xl md:text-7xl font-bold mb-6">WE ARE EXPENSIVE. <br /> BUT WE ARE WORTH IT.</h2>
                <p className="text-xl text-gray-400">Limited to 4 Partners per month.</p>
            </div>

            {/* Slide to Apply Button */}
            <div className="relative w-[300px] h-[70px] bg-white/5 rounded-full border border-white/10 overflow-hidden select-none">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium tracking-widest pointer-events-none transition-opacity duration-300" style={{ opacity: completed ? 0 : 1 }}>
                    SLIDE TO APPLY
                </div>

                {completed ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-lime flex items-center justify-center text-black font-bold tracking-widest"
                    >
                        <Check className="w-5 h-5 mr-2" /> APPLIED
                    </motion.div>
                ) : (
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 230 }}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDragEnd={handleDragEnd}
                        className="absolute left-1 top-1 bottom-1 w-[62px] bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowRight className="text-black w-5 h-5" />
                    </motion.div>
                )}
            </div>

            <p className="mt-8 text-sm text-gray-600 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Secure Application
            </p>
        </section>
    );
};

export default CTA;
