import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Hammer, PlayCircle } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "DIAGNOSE",
        desc: "We audit your leaked traffic.",
        icon: FileSearch,
        color: "text-lime"
    },
    {
        id: "02",
        title: "CONSTRUCT",
        desc: "We build the Funnel & Tech.",
        icon: Hammer,
        color: "text-cyan"
    },
    {
        id: "03",
        title: "AMPLIFY",
        desc: "We deploy Retention-Editing.",
        icon: PlayCircle,
        color: "text-white"
    }
];

const Services = () => {
    return (
        <section className="py-32 bg-void">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-20">
                {/* Sticky Left Side */}
                <div className="md:w-1/3">
                    <div className="sticky top-32">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">THE LBB <br /> PROTOCOL</h2>
                        <p className="text-gray-400 text-xl">
                            A systematic approach to scaling your brand infrastructure.
                        </p>
                    </div>
                </div>

                {/* Scrollable Right Side */}
                <div className="md:w-2/3 flex flex-col gap-32">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-20% 0px -20% 0px" }}
                            transition={{ duration: 0.5 }}
                            className="min-h-[40vh] flex flex-col justify-center border-l border-white/10 pl-10 relative group"
                        >
                            <div className={`absolute left-[-1px] top-0 bottom-0 w-1 bg-${step.color.replace('text-', '')} scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`} style={{ backgroundColor: step.color === 'text-lime' ? '#D9FF00' : step.color === 'text-cyan' ? '#00F0FF' : 'white' }} />

                            <span className="text-8xl font-bold text-white/5 absolute -top-10 left-0 select-none">{step.id}</span>

                            <div className="relative z-10">
                                <step.icon className={`w-16 h-16 mb-6 ${step.color}`} />
                                <h3 className="text-5xl font-bold mb-4">{step.title}</h3>
                                <p className="text-2xl text-gray-400">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
