import React from 'react';
import { TrendingUp, Eye, Percent } from 'lucide-react';

const results = [
    {
        client: "Client X",
        metric: "$40k MRR",
        desc: "Added in 30 days",
        icon: TrendingUp,
        color: "text-lime"
    },
    {
        client: "Client Y",
        metric: "4.5M Views",
        desc: "On single reel",
        icon: Eye,
        color: "text-cyan"
    },
    {
        client: "Client Z",
        metric: "4.8% Conv.",
        desc: "Up from 1.2%",
        icon: Percent,
        color: "text-purple-400"
    },
];

const Results = () => {
    return (
        <section className="py-20 bg-void overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-center">THE ROI ENGINE</h2>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-scroll flex gap-8 whitespace-nowrap py-4 group-hover:[animation-play-state:paused]">
                    {[...results, ...results, ...results, ...results].map((item, index) => (
                        <div
                            key={index}
                            className="w-[350px] md:w-[450px] h-[250px] glass-card rounded-2xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300 shrink-0"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-gray-400 font-mono text-lg">{item.client}</span>
                                <item.icon className={`w-10 h-10 ${item.color}`} />
                            </div>
                            <div>
                                <h3 className="text-5xl font-bold mb-2 text-white">{item.metric}</h3>
                                <p className="text-gray-400 text-xl">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Results;
