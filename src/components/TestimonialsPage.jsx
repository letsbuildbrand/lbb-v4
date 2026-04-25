import React from 'react';
import { Users, BadgeCheck, TrendingUp } from 'lucide-react';

const TestimonialsPage = () => {
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
        <div className="h-screen w-full bg-[#050507] overflow-y-scroll snap-y snap-mandatory text-white font-sans scroll-smooth">
            {testimonials.map((t, i) => (
                <div key={i} className="h-screen w-full flex items-center justify-center snap-center p-6 sm:p-12 relative">

                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#151022] to-[#0E0E12] z-0 opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8A2BFF] rounded-full blur-[150px] opacity-10 pointer-events-none" />

                    {/* Card */}
                    <div className="relative z-10 max-w-2xl w-full bg-[#0E0E12] border border-[#6F2CFF]/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(138,43,255,0.2)] hover:border-[#8A2BFF]/40 transition-all duration-500 transform hover:scale-[1.02]">

                        {/* Quote Icon Background */}
                        <div className="absolute top-6 right-8 text-[#151022] font-serif text-9xl leading-none opacity-50 pointer-events-none select-none">"</div>

                        {/* Profile Section */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative shrink-0">
                                {t.img === 'special_plus' ? (
                                    <div className="w-20 h-20 rounded-full bg-[#8A2BFF]/10 flex items-center justify-center border-2 border-[#8A2BFF] text-[#8A2BFF] shadow-[0_0_20px_rgba(138,43,255,0.3)]">
                                        <Users className="w-8 h-8" />
                                    </div>
                                ) : (
                                    <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#8A2BFF]/30 ring-4 ring-[#151022]" />
                                )}
                                {t.img !== 'special_plus' && (
                                    <div className="absolute -bottom-2 -right-2 bg-[#050507] rounded-full p-1 border border-[#6F2CFF]/50">
                                        <BadgeCheck className="w-5 h-5 text-[#A64DFF] fill-[#A64DFF]/20" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className={`text-2xl md:text-3xl font-bold font-display tracking-tight mb-1 ${t.img === 'special_plus' ? 'text-[#A64DFF]' : 'text-white'}`}>
                                    {t.name}
                                </h3>
                                <div className="inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A2BFF]"></span>
                                    <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className={`text-lg md:text-xl leading-relaxed mb-8 ${t.img === 'special_plus' ? 'text-gray-100 font-medium' : 'text-gray-300'}`}>
                            {t.text}
                        </p>

                        {/* Metric/Result Badge */}
                        <div className="flex items-start">
                            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border text-sm font-bold shadow-lg ${t.img === 'special_plus'
                                    ? 'bg-[#8A2BFF] text-white border-[#8A2BFF] shadow-[#8A2BFF]/20'
                                    : 'bg-[#151022] border-[#6F2CFF]/30 text-[#A64DFF] shadow-[#6F2CFF]/10'
                                }`}>
                                <TrendingUp className="w-4 h-4" />
                                {t.metric}
                            </div>
                        </div>

                    </div>

                    {/* Scroll Indicator (except last item) */}
                    {i < testimonials.length - 1 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce opacity-50">
                            <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
                            <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#8A2BFF] to-transparent" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TestimonialsPage;
