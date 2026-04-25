import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Menu, X, Linkedin, Twitter, Instagram, Mail,
    Users, Zap, Code, TrendingUp, Layers, Film, Globe, MapPin,
    Briefcase, Target, Shield, Award
} from 'lucide-react';

// --- Shared Components (Adapted for Router) ---

const Navbar = ({ onOpenModal }) => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 glass-nav px-6 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-12">
                <button onClick={() => navigate('/')} className="text-2xl font-bold font-display tracking-tighter text-white">LBB.</button>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
                    <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Work</button>
                    <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Why Us</button>
                    <button onClick={() => navigate('/teams')} className="text-white transition-colors">Team</button>
                    <button onClick={() => navigate('/')} className="hover:text-white transition-colors">FAQ</button>
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
};

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-display font-bold text-white mb-6">LBB.</h3>
                        <p className="text-gray-400 max-w-sm mb-8">
                            The invisible infrastructure behind the world's fastest-growing personal brands. We engineer attention, you take the credit.
                        </p>
                        <div className="flex items-start gap-4 text-gray-400">
                            <div className="w-5 h-5 mt-1 shrink-0 bg-teal/20 rounded-full flex items-center justify-center text-teal">
                                <Globe className="w-3 h-3" />
                            </div>
                            <div className="text-sm leading-relaxed">
                                <span className="text-white font-bold block mb-1">USA HEADQUARTERS <span className="text-xs font-normal text-teal border border-teal/20 bg-teal/10 px-2 py-0.5 rounded-full ml-2">OPENING SOON</span></span>
                                555 California Street, Suite 4900,<br />
                                San Francisco, CA 94104,<br />
                                United States
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold font-display mb-6">EXPLORE</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><button onClick={() => navigate('/')} className="hover:text-orange transition-colors">Home</button></li>
                            <li><button onClick={() => navigate('/')} className="hover:text-orange transition-colors">Selected Work</button></li>
                            <li><button onClick={() => navigate('/teams')} className="hover:text-orange transition-colors">The Unit</button></li>
                            <li><button onClick={() => navigate('/testimonials')} className="hover:text-orange transition-colors">Testimonials</button></li>
                        </ul>
                    </div>

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
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
                    <div>&copy; {new Date().getFullYear()} Let's Build Brand. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
};

// --- Page Components ---

const MemberCard = ({ member, color = "orange" }) => {
    const getIcon = (role) => {
        if (role.includes('Strategy')) return TrendingUp;
        if (role.includes('Systems') || role.includes('Engineer')) return Code;
        if (role.includes('Visual') || role.includes('Editor')) return Film;
        if (role.includes('Growth') || role.includes('Warrior')) return Target;
        return Users;
    };

    const Icon = getIcon(member.role);
    const colorClass = color === 'teal' ? 'text-teal' : color === 'purple' ? 'text-purple-400' : 'text-orange';
    const bgClass = color === 'teal' ? 'bg-teal/10 border-teal/20' : color === 'purple' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-orange/10 border-orange/20';

    return (
        <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-slate-900 h-[450px]">
            <div className="absolute inset-0">
                {member.img ? (
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center opacity-60 group-hover:opacity-80 transition-all">
                        <Users className="w-32 h-32 text-white/5" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className={`absolute top-8 right-8 p-3 rounded-xl backdrop-blur-md border ${bgClass} ${colorClass} opacity-50 group-hover:opacity-100 transition-opacity`}>
                    <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-3xl font-display font-bold mb-2 text-white uppercase">{member.name}</h3>
                <p className={`font-mono text-sm tracking-widest mb-2 ${colorClass} uppercase`}>{member.role}</p>

                {member.location && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-3 bg-amber-500/10 border border-amber-500/20 rounded-full w-fit">
                        <MapPin className="w-2.5 h-2.5 text-amber-200/70" />
                        <span className="text-[10px] font-bold text-amber-100/80 tracking-widest uppercase">{member.location}</span>
                    </div>
                )}

                {member.intro && (
                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                        "{member.intro}"
                    </p>
                )}
            </div>
        </div>
    );
};

const TeamPage = () => {
    // Founders Data (Existing)
    const founders = [
        {
            name: "Avi Javeri",
            role: "Head of Strategy",
            img: "/team/avi.jpg",
            intro: "Growth is calculated, not accidental. I architect the master plan that aligns your content with revenue goals.",
            color: "purple",
            location: "California, USA"
        },
        {
            name: "Yadish",
            role: "Head of Systems",
            img: "/team/yadish.png",
            intro: "Beautiful content is useless if it doesn't convert. I build the invisible infrastructure—the funnels, the automations.",
            color: "teal"
        },
        {
            name: "Chaitanya",
            role: "Head of Visuals",
            img: "/team/chaitanya.png",
            intro: "Attention is a currency. I engineer psychological hooks that force the brain to keep watching. Every frame is a calculated decision.",
            color: "orange"
        }
    ];

    // Creative Unit (New)
    const creativeUnit = [
        { name: "Ronit", role: "Senior Creative Lead", img: "/team/ronit.jpg", intro: "Crafting visual narratives that disrupt patterns and command engagement.", color: "orange" },
        { name: "Ganesh", role: "Lead Visual Engineer", img: "/team/ganesh.jpg", intro: "Precision editing meets storytelling. Every cut serves the algorithm.", color: "orange" },
        { name: "Priyanshu", role: "Post-Production Lead", img: "/team/priyanshu.jpg", intro: "Ensuring cinematic quality at viral speed. The standard is excellence.", color: "orange" }
    ];

    // Sales/Growth Team (New)
    const growthUnit = [
        { name: "Aditya", role: "Head of Warriors", img: "/team/aditya.jpg", intro: "Leading the charge. Defining the strategy for aggressive market expansion.", color: "teal" },
        { name: "Akshat", role: "Warrior", img: "/team/akshat.jpg", intro: "Identifying opportunities and executing precision outreach campaigns.", color: "teal" },
        { name: "Hemant", role: "Warrior", img: "/team/hemant.jpg", intro: "Building bridges between brand vision and execution reality.", color: "teal" },
        { name: "Mayank", role: "Warrior", img: "/team/mayank.jpg", intro: "Relentless pursuit of partnership excellence and client success.", color: "teal" }
    ];

    // Placeholder for Booking Modal (No-op in this view for simplicity, or could wire it up)
    const handleOpenModal = () => {
        window.open('https://www.cal.id/lbb-us', '_blank');
    };

    return (
        <div className="bg-premium-dark min-h-screen text-white selection:bg-orange selection:text-white">
            <div className="bg-noise" />

            {/* Background Blobs */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <Navbar onOpenModal={handleOpenModal} />

            <div className="relative pt-32 pb-20 container mx-auto px-6 z-10">

                {/* Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-6"
                    >
                        <Users className="w-3 h-3" />
                        <span>GLOBAL OPERATIONS</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-6"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-white to-teal">UNIT</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400"
                    >
                        A paramilitary collective of strategists, engineers, and creatives. <br />
                        We don't hire employees; we recruit operators.
                    </motion.p>
                </div>

                {/* Section 1: The Architects (Founders) */}
                <div className="mb-32">
                    <h2 className="text-2xl font-mono text-white/50 mb-12 border-b border-white/10 pb-4">01 // THE ARCHITECTS</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {founders.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <MemberCard member={member} color={member.color} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Creative Command */}
                <div className="mb-32">
                    <h2 className="text-2xl font-mono text-white/50 mb-12 border-b border-white/10 pb-4">02 // CREATIVE COMMAND</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {creativeUnit.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <MemberCard member={member} color={member.color} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Growth Operations */}
                <div className="mb-20">
                    <h2 className="text-2xl font-mono text-white/50 mb-12 border-b border-white/10 pb-4">03 // SALES & GROWTH</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {growthUnit.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <MemberCard member={member} color={member.color} />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default TeamPage;
