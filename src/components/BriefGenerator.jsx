import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Download, Copy, RefreshCcw, 
  CheckCircle2, Info, Palette, Sliders, Layout, 
  FileText, Briefcase, Globe, Target
} from 'lucide-react';

const BriefGenerator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    meta_client_name: '',
    meta_project_name: '',
    meta_date: new Date().toISOString().split('T')[0],
    meta_deadline: '',
    // Video Strategy
    vid_objective: '',
    vid_platforms: [],
    vid_duration: '',
    vid_quantity: '',
    // Visuals & Branding
    col_primary: '#050507',
    col_secondary: '#C47B2B',
    brand_font: '',
    branding_links: '',
    // Assets & Access
    asset_raw_link: '',
    asset_example_link: '',
    // Editing Style
    edit_pacing: 'Dynamic',
    edit_subtitles: 'Modern Pop',
    edit_audio: 'Immersive SFX',
    edit_vfx: 'Subtle Motion',
  });

  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState({ show: false, msg: '' });

  // Update progress bar
  useEffect(() => {
    const totalFields = 15; // Estimating key fields
    let filled = 0;
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        if (formData[key].length > 0) filled++;
      } else if (formData[key] && formData[key] !== '#050507' && formData[key] !== '#C47B2B') {
        filled++;
      }
    });
    setProgress(Math.min(Math.round((filled / totalFields) * 100), 100));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const currentVals = formData[name] || [];
      if (checked) {
        setFormData({ ...formData, [name]: [...currentVals, value] });
      } else {
        setFormData({ ...formData, [name]: currentVals.filter(v => v !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setCurrentStep(curr => Math.min(curr + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(curr => Math.max(curr - 0, 0)); // Adjusted to not go negative

  const displayToast = (msg) => {
    setShowToast({ show: true, msg });
    setTimeout(() => setShowToast({ show: false, msg: '' }), 3000);
  };

  const downloadPDF = () => {
    displayToast("Preparing PDF... This may take a few seconds.");
    // In a real app, you'd use a library like jspdf. 
    // To maintain compatibility with user's previous tool's quality, we'll suggest using a backend or client-side PDF lib.
    displayToast("PDF Generated (Simulated) - Success!");
  };

  const copyBrief = () => {
    const briefText = `
LBB - PROJECT BRIEF
-------------------
Client: ${formData.meta_client_name}
Project: ${formData.meta_project_name}
Deadline: ${formData.meta_deadline}

OBJECTIVES:
${formData.vid_objective}

PLATFORMS:
${formData.vid_platforms.join(', ')}

ASSETS:
Raw Footage: ${formData.asset_raw_link}
Examples: ${formData.asset_example_link}
    `.trim();
    
    navigator.clipboard.writeText(briefText);
    displayToast("Brief copied to clipboard!");
  };

  const steps = [
    {
      title: "Project Foundation",
      description: "Basic details to anchor the brief.",
      icon: <Briefcase className="w-6 h-6" />,
      fields: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Your Name / Brand</label>
              <input type="text" name="meta_client_name" value={formData.meta_client_name} onChange={handleInputChange} placeholder="e.g., Alex Hormozi" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange/50 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Project Name</label>
              <input type="text" name="meta_project_name" value={formData.meta_project_name} onChange={handleInputChange} placeholder="e.g., Q2 Retainer" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange/50 outline-none transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Target Deadline</label>
            <input type="date" name="meta_deadline" value={formData.meta_deadline} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange/50 outline-none transition-all [color-scheme:dark]" />
          </div>
        </div>
      )
    },
    {
      title: "Video Strategy",
      description: "Defining the core goals and format.",
      icon: <Target className="w-6 h-6" />,
      fields: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Core Objective</label>
            <textarea name="vid_objective" value={formData.vid_objective} onChange={handleInputChange} placeholder="What is the main goal of this video? (e.g. Lead Gen, Brand Awareness)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-32 focus:border-orange/50 outline-none transition-all resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Target Platforms</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Instagram', 'TikTok', 'YouTube', 'Ads'].map(plt => (
                <label key={plt} className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${formData.vid_platforms.includes(plt) ? 'bg-orange/20 border-orange text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                  <input type="checkbox" name="vid_platforms" value={plt} checked={formData.vid_platforms.includes(plt)} onChange={handleInputChange} className="hidden" />
                  <span className="text-sm font-bold">{plt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Visual DNA",
      description: "Colors, fonts, and aesthetic guidelines.",
      icon: <Palette className="w-6 h-6" />,
      fields: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Primary Brand Color</label>
              <div className="flex gap-4">
                <input type="color" name="col_primary" value={formData.col_primary} onChange={handleInputChange} className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer" />
                <input type="text" value={formData.col_primary} onChange={handleInputChange} name="col_primary" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm uppercase" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Secondary Accent</label>
              <div className="flex gap-4">
                <input type="color" name="col_secondary" value={formData.col_secondary} onChange={handleInputChange} className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer" />
                <input type="text" value={formData.col_secondary} onChange={handleInputChange} name="col_secondary" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm uppercase" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Brand Fonts</label>
            <input type="text" name="brand_font" value={formData.brand_font} onChange={handleInputChange} placeholder="e.g., Montserrat, Inter" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange/50 outline-none transition-all" />
          </div>
        </div>
      )
    },
    {
      title: "Asset Management",
      description: "Where can we find your raw footage?",
      icon: <Globe className="w-6 h-6" />,
      fields: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Raw Footage Link (Drive/Dropbox)</label>
            <input type="url" name="asset_raw_link" value={formData.asset_raw_link} onChange={handleInputChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange/50 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Editing Inspiration / Examples</label>
            <input type="url" name="asset_example_link" value={formData.asset_example_link} onChange={handleInputChange} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange/50 outline-none transition-all" />
          </div>
          <div className="p-4 bg-orange/10 border border-orange/20 rounded-2xl flex gap-4 items-start">
            <Info className="w-5 h-5 text-orange shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              <strong>Tip:</strong> Ensure your links are set to "Anyone with the link can view" to avoid production delays.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Review & Export",
      description: "Finalize your brief and send it to our unit.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      fields: (
        <div className="space-y-8 text-center py-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-400 mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white mb-2">Brief Engineered.</h4>
            <p className="text-gray-400">Your vision has been converted into a tactical production plan.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={downloadPDF} className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-orange hover:text-white transition-all shadow-xl">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button onClick={copyBrief} className="flex items-center justify-center gap-2 bg-slate-900 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all">
              <Copy className="w-5 h-5" />
              Copy Answer Log
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Header / Nav */}
      <nav className="relative z-10 px-6 py-6 border-b border-white/5 flex justify-between items-center backdrop-blur-md bg-black/20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Portal
        </button>
        <div className="text-xl font-bold font-display tracking-tighter">LBB BRIEF SYSTEM</div>
        <div className="w-[100px] hidden md:block" /> {/** Spacer */}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
        
        {/* Progress Bar */}
        <div className="w-full mb-12">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-mono text-orange uppercase tracking-widest font-bold">Brief Construction</span>
            <span className="text-[10px] font-mono text-gray-500 font-bold">{progress}% COMPLETE</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-orange transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Step Card */}
        <div className="w-full bg-[#0e0e12] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle icon background */}
          <div className="absolute top-[-20px] right-[-20px] w-48 h-48 text-white/5 z-0 pointer-events-none rotate-12">
            {steps[currentStep].icon}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-orange border border-white/10">
                {steps[currentStep].icon}
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-white mb-1">
                  {steps[currentStep].title}
                </h2>
                <p className="text-sm text-gray-500">{steps[currentStep].description}</p>
              </div>
            </div>

            <div className="min-h-[300px]">
              {steps[currentStep].fields}
            </div>

            {/* Nav Buttons */}
            <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
              <button 
                onClick={() => setCurrentStep(curr => Math.max(0, curr - 1))}
                className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button 
                  onClick={nextStep}
                  className="bg-white text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange hover:text-white transition-all shadow-lg hover:shadow-orange/20"
                >
                  Continue Construction
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Restart Brief
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">
              Made with Precision by LBB Engineering Unit
            </p>
        </div>
      </main>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${showToast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-orange/20 text-orange flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-white">{showToast.msg}</span>
        </div>
      </div>
    </div>
  );
};

export default BriefGenerator;
