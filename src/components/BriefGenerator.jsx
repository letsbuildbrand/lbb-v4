import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BriefGenerator = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState({ show: false, msg: '' });
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [briefType, setBriefType] = useState('detailed');
  const [showResetModal, setShowResetModal] = useState(false);

  // Field Mapping (Copied from original)
  const fieldMapping = [
    {
      section: "Project Details", items: [
        { label: "Client Name", name: "meta_client_name" },
        { label: "Project Name", name: "meta_project_name" },
        { label: "Date", name: "meta_date" },
        { label: "Deadline", name: "meta_deadline" }
      ]
    },
    {
      section: "01. Project Overview", items: [
        { label: "Goal of the Video", name: "goal" },
        { label: "Target Audience", name: "audience" },
        { label: "Platform", name: "platform" },
        { label: "Core Message", name: "message" }
      ]
    },
    {
      section: "02. Creative References", items: [
        { label: "Reference 1", name: "ref1_url" },
        { label: "What we like (Ref 1)", name: "ref1_likes" },
        { label: "Reference 2", name: "ref2_url" },
        { label: "What we like (Ref 2)", name: "ref2_likes" },
        { label: "Reference 3", name: "ref3_url" },
        { label: "What we like (Ref 3)", name: "ref3_likes" }
      ]
    },
    {
      section: "03. Editing Style & Pacing", items: [
        { label: "General Vibe", name: "style" },
        { label: "Pacing / Cut Style", name: "pacing" },
        { label: "Speed Adjustment", name: "speed" },
        { label: "Transitions", name: "transitions" },
        { label: "Filler Words to Remove", name: "fillers" }
      ]
    },
    {
      section: "04. Assets & Resources", items: [
        { label: "Footage Link", name: "url_footage" },
        { label: "Stock Preferences", name: "stock_pref" },
        { label: "B-Roll Link", name: "url_broll" },
        { label: "Script Link", name: "url_script" },
        { label: "Assets Link", name: "url_assets" }
      ]
    },
    {
      section: "05. Text & Graphics", items: [
        { label: "Primary Font", name: "font_primary" },
        { label: "Secondary Font", name: "font_secondary" },
        { label: "Caption Style", name: "caption_style" },
        { label: "Caption Colour", name: "caption_color" },
        { label: "Caption Size/Weight", name: "caption_size" },
        { label: "Overlays", name: "overlays" },
        { label: "Branding Elements", name: "branding" },
        { label: "Branding Instructions", name: "branding_notes" }
      ]
    },
    {
      section: "06. Colour & Cinematic Look", items: [
        { label: "Overall Grade", name: "grade" },
        { label: "Grade Reference", name: "grade_ref" },
        { label: "Skin Tone", name: "skin" },
        { label: "Sharpening", name: "sharpen" },
        { label: "Additional Look Notes", name: "look_notes" }
      ]
    },
    {
      section: "07. Audio & Music", items: [
        { label: "Music Genre / Mood", name: "music_mood" },
        { label: "Specific Track/Playlist", name: "music_url" },
        { label: "Sound Effects", name: "sfx" },
        { label: "Background Music Level", name: "lvl_bgm", suffix: " dB" },
        { label: "Vocals / Voiceover Level", name: "lvl_vox", suffix: " dB" },
        { label: "SFX Level", name: "lvl_sfx", suffix: " dB" }
      ]
    },
    {
      section: "08. Technical Specifications", items: [
        { label: "Aspect Ratio", name: "ratio" },
        { label: "Resolution", name: "resolution" },
        { label: "Frame Rate", name: "fps" },
        { label: "Export Format", name: "format" },
        { label: "Delivery Method", name: "delivery" }
      ]
    },
    {
      section: "09. Brand Identity", items: [
        { label: "Primary Colour", name: "col_primary" },
        { label: "Secondary Colour", name: "col_secondary" },
        { label: "Accent Colour", name: "col_accent" },
        { label: "Background Colour", name: "col_bg" },
        { label: "Heading Font", name: "brand_heading_font" },
        { label: "Body Font", name: "brand_body_font" },
        { label: "Brand Guidelines", name: "url_brandkit" },
        { label: "Instagram", name: "social_ig" },
        { label: "YouTube", name: "social_yt" },
        { label: "TikTok", name: "social_tt" },
        { label: "LinkedIn", name: "social_li" }
      ]
    },
    {
      section: "10. Notes & Sign-off", items: [
        { label: "Open Notes", name: "open_notes" },
        { label: "Revision Rounds", name: "rounds" },
        { label: "Assigned Editor", name: "assigned_editor" },
        { label: "Approver Name", name: "approver_name" },
        { label: "Approval Date", name: "approval_date" }
      ]
    }
  ];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Load Saved Data
    const raw = localStorage.getItem('interactive_brief_autosave');
    if (raw) {
      try {
        const state = JSON.parse(raw);
        setFormData(state.answers || {});
        setCurrentStep(state.step || 0);
        setBriefType(state.briefType || 'detailed');
      } catch (e) {}
    }

    // Load html2pdf script
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    // Autosave
    localStorage.setItem('interactive_brief_autosave', JSON.stringify({
      briefType,
      step: currentStep,
      answers: formData
    }));

    // Local Progress Calculation
    const totalPossible = 40;
    let filled = Object.keys(formData).filter(k => formData[k] && formData[k].toString().trim() !== '').length;
    let percent = Math.min(Math.round((filled / totalPossible) * 100), 100);
    setProgress(percent);
  }, [formData, currentStep, briefType]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const current = formData[name] || [];
      const updated = checked ? [...current, value] : current.filter(v => v !== value);
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const displayToast = (msg) => {
    setShowToast({ show: true, msg });
    setTimeout(() => setShowToast({ show: false, msg: '' }), 3000);
  };

  const buildStructuredData = () => {
    let textContent = "VIDEO EDITING BRIEF\n===================\n\n";
    const htmlContainer = document.createElement('div');
    htmlContainer.id = "pdf-content";

    const styleStr = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
      #pdf-content { font-family: 'DM Sans', sans-serif; width: 390px; background: #FFFDF9; box-sizing: border-box; display: block; margin: 0; padding: 0; }
      .pdf-cover { width: 390px; height: 840px; background: #2A2015; color: #FFFDF9; padding: 60px 40px; box-sizing: border-box; display: flex; flex-direction: column; position: relative; overflow: hidden; }
      .pdf-cover::before { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: radial-gradient(circle at top right, rgba(196,123,43,0.15) 0%, rgba(42,32,21,0) 60%); pointer-events: none; }
      .cover-kicker { color: #E8A84C; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; font-weight: bold; position: relative; z-index: 2; }
      .cover-title { font-family: 'Playfair Display', serif; font-size: 40px; line-height: 1.1; margin: 0 0 16px 0; color: #FFF; position: relative; z-index: 2; word-wrap: break-word; }
      .cover-subtitle { font-size: 14px; color: rgba(255,255,255,0.7); font-style: italic; position: relative; z-index: 2; }
      .cover-meta { margin-top: auto; display: flex; flex-direction: column; gap: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; position: relative; z-index: 2; }
      .meta-block { display: flex; flex-direction: column; gap: 4px; }
      .meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5); }
      .meta-val { font-size: 14px; font-weight: bold; color: #FFFDF9; }
      .pdf-page { width: 390px; background: #FFFDF9; color: #2A2015; padding: 40px 30px; box-sizing: border-box; break-before: page; page-break-before: always; position: relative; }
      .pdf-page-footer { margin-top: 40px; display: flex; justify-content: space-between; border-top: 1px solid #EDE4D3; padding-top: 16px; font-size: 9px; color: #A08C72; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .page-num-bg { position: absolute; top: 20px; right: 30px; font-family: 'Playfair Display', serif; font-size: 56px; font-weight: bold; color: rgba(196,123,43,0.06); line-height: 1; pointer-events: none; margin: 0; }
      .page-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #2A2015; margin: 0 0 32px 0; padding-bottom: 16px; border-bottom: 2px solid #C47B2B; position: relative; z-index: 2; max-width: 85%; }
      .data-grid { display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 2; }
      .data-group { display: flex; flex-direction: column; gap: 4px; }
      .data-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #A08C72; font-weight: bold; }
      .data-val { font-size: 14px; color: #2A2015; line-height: 1.5; word-wrap: break-word; font-weight: 500; }
      .data-val a { color: #C47B2B; text-decoration: none; }
      .swatch-circ { display: inline-block; width: 14px; height: 14px; border-radius: 50%; vertical-align: middle; margin-right: 8px; border: 1px solid rgba(0,0,0,0.1); }
      .pdf-watermark { text-align: center; font-size: 10px; color: #A08C72; letter-spacing: 1px; padding: 12px 0 0 0; margin-top: auto; position: relative; z-index: 2; }
      .pdf-watermark .heart { color: #e74c3c; }
      .pdf-watermark a { color: #A08C72; text-decoration: none; }
    `;

    const clientName = formData['meta_client_name'] || 'Client';
    const projectName = formData['meta_project_name'] || 'Project';
    const prjDate = formData['meta_date'] || '';
    const deadline = formData['meta_deadline'] || '';

    let htmlContent = `
      <style>${styleStr}</style>
      <div class="pdf-cover">
          <div class="cover-kicker">✦ Video Editing Brief</div>
          <h1 class="cover-title">${projectName}</h1>
          <div class="cover-subtitle">Project Requirements & Asset Guidelines</div>
          <div class="cover-meta">
              <div class="meta-block"><span class="meta-label">Client</span><span class="meta-val">${clientName}</span></div>
              <div class="meta-block"><span class="meta-label">Date Submitted</span><span class="meta-val">${prjDate || 'N/A'}</span></div>
              <div class="meta-block"><span class="meta-label">Target Deadline</span><span class="meta-val">${deadline || 'N/A'}</span></div>
          </div>
          <div class="pdf-watermark"><a href="https://www.letsbuildbrand.com">Made with <span class="heart">❤️</span> by LBB</a></div>
      </div>
    `;

    let pageIndex = 1;
    fieldMapping.forEach(sec => {
      if (sec.section === 'Project Details') return;
      let sectionHasDataHTML = false;
      let secNumMatch = sec.section.match(/^(\d+)\./);
      let secNum = secNumMatch ? secNumMatch[1] : `0${pageIndex}`;
      let secTitle = sec.section.replace(/^\d+\.\s*/, '');

      let sectionHTML = `<div class="pdf-page"><div class="page-num-bg">${secNum}</div><h2 class="page-title">${secTitle}</h2><div class="data-grid">`;

      sec.items.forEach(item => {
        let val = formData[item.name];
        if (val && (Array.isArray(val) ? val.length > 0 : true)) {
          let displayVal = Array.isArray(val) ? val.join(', ') : val;
          if (item.suffix) displayVal += item.suffix;
          textContent += `${item.label}: ${displayVal}\n`;
          sectionHasDataHTML = true;
          let swatch = (item.name.startsWith('col_') && /^#[0-9A-Fa-f]{6}$/i.test(displayVal)) ? `<span class="swatch-circ" style="background-color:${displayVal};"></span>` : '';
          sectionHTML += `<div class="data-group"><div class="data-label">${item.label}</div><div class="data-val">${swatch}${displayVal}</div></div>`;
        }
      });

      sectionHTML += `</div><div class="pdf-page-footer"><span>${clientName} — ${projectName}</span><span>Page ${pageIndex}</span></div><div class="pdf-watermark">Made with ❤️ by LBB</div></div>`;
      if (sectionHasDataHTML) { htmlContent += sectionHTML; pageIndex++; }
      textContent += "\n";
    });

    htmlContainer.innerHTML = htmlContent;
    return { textContent, htmlContainer };
  };

  const downloadPDF = () => {
    if (typeof window.html2pdf === 'undefined') {
      displayToast("Error: PDF library not loaded yet.");
      return;
    }
    const { htmlContainer } = buildStructuredData();
    const clientName = formData['meta_client_name'] || 'Client';
    const projectName = formData['meta_project_name'] || 'Project';
    const pdfFilename = (clientName + '_' + projectName + '_Brief.pdf').replace(/\s+/g, '_');

    displayToast("Generating PDF... Please wait.");

    // PDF Iframe Logic (NUCLEAR OPTION PRESERVED)
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed; left:0; top:0; width:390px; height:844px; border:none; z-index:-9999;';
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
      <style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:390px;display:block;background:#FFFDF9;}</style>
      </head><body><div id="pdf-wrapper">${htmlContainer.innerHTML}</div></body></html>`);
    iframeDoc.close();

    setTimeout(() => {
      const iframeWindow = iframe.contentWindow;
      const target = iframeDoc.getElementById('pdf-wrapper');
      const opt = {
        margin: 0,
        filename: pdfFilename,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: 390 },
        jsPDF: { unit: 'px', format: [390, 844], orientation: 'portrait' }
      };
      iframeWindow.html2pdf().set(opt).from(target).save().then(() => {
        document.body.removeChild(iframe);
        displayToast("Brief downloaded successfully!");
      }).catch(e => {
          console.error(e);
          document.body.removeChild(iframe);
          displayToast("Failed to generate PDF.");
      });
    }, 2000);
  };

  const copyBrief = () => {
    const { textContent } = buildStructuredData();
    navigator.clipboard.writeText(textContent).then(() => displayToast("All answers copied!"));
  };

  const confirmReset = () => {
    localStorage.removeItem('interactive_brief_autosave');
    setFormData({});
    setCurrentStep(0);
    setShowResetModal(false);
    displayToast("Form Reset");
  };

  // UI Components
  const StepWrapper = ({ children, active, reverse }) => (
    <div className={`transition-all duration-500 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'} ${reverse ? '-translate-y-10' : ''} flex flex-col gap-6`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#2A2015] font-sans flex flex-col relative overflow-x-hidden">
      <style>{`
        h1, h2, h3, h4, .playfair { font-family: 'Playfair Display', serif; }
        .glass-input { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 12px 16px; border-radius: 8px; color: white; }
        .std-input { background: #FBF7F0; border: 1.5px solid #E2D4BE; border-radius: 8px; padding: 12px 16px; width: 100%; transition: all 0.2s; }
        .std-input:focus { outline: none; border-color: #C47B2B; background: #FDF3E3; box-shadow: 0 0 0 3px rgba(196, 123, 43, 0.2); }
        .pill-label { display: inline-flex; align-items: center; padding: 10px 20px; background: #FBF7F0; border: 1.5px solid #E2D4BE; border-radius: 100px; cursor: pointer; transition: 0.2s; font-size: 14px; }
        .pill-label:hover { border-color: #C47B2B; color: #C47B2B; }
        .pill-label.active { background: #2A2015; border-color: #2A2015; color: white; }
      `}</style>
      
      {/* Top Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#E2D4BE] z-[101]">
        <div className="h-full bg-gradient-to-r from-[#E8A84C] to-[#C47B2B] transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero Section */}
      <div className={`bg-[#2A2015] text-white p-12 md:p-24 transition-all duration-700 h-screen flex flex-col justify-center items-center text-center ${currentStep === 0 ? 'block slide-up' : 'hidden'}`}>
        <span className="text-xs uppercase tracking-[0.3em] text-[#C47B2B] mb-4">Internal Tool</span>
        <h1 className="text-5xl md:text-7xl mb-6">Interactive <br/><span className="text-[#E8A84C] italic-accent opacity-90">Brief System</span></h1>
        <p className="text-[#A08C72] text-lg max-w-xl mb-12">The standardized protocol for elite video production. Fill this out, export the PDF, and send to the unit.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
            <input type="text" name="meta_client_name" value={formData.meta_client_name || ''} onChange={handleInputChange} placeholder="Client Name" className="glass-input text-center" />
            <input type="text" name="meta_project_name" value={formData.meta_project_name || ''} onChange={handleInputChange} placeholder="Project Name" className="glass-input text-center" />
        </div>
        
        <button onClick={() => setCurrentStep(1)} className="bg-[#C47B2B] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
           Initialize Construction →
        </button>
      </div>

      {/* Form Body */}
      {currentStep > 0 && currentStep <= 10 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 mb-24">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EDE4D3] overflow-hidden">
                <div className="bg-gradient-to-r from-[#F2EAD8] to-white p-6 border-b border-[#EDE4D3] flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2A2015] text-[#E8A84C] rounded-xl flex items-center justify-center text-2xl font-bold">
                        {currentStep}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{fieldMapping[currentStep].section.split('. ')[1] || fieldMapping[currentStep].section}</h3>
                        <p className="text-xs text-[#A08C72] uppercase tracking-widest font-bold">Protocol Step {currentStep} of 10</p>
                    </div>
                </div>
                
                <div className="p-8 md:p-12 space-y-8 min-h-[400px]">
                    {fieldMapping[currentStep].items.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                           <label className="text-xs uppercase font-bold text-[#6B5236] tracking-widest">{item.label}</label>
                           {item.name.includes('notes') || item.name === 'goal' || item.name === 'audience' || item.name === 'message' ? (
                               <textarea name={item.name} value={formData[item.name] || ''} onChange={handleInputChange} className="std-input h-32" />
                           ) : item.name.includes('col') ? (
                               <div className="flex gap-3">
                                   <input type="color" name={item.name} value={formData[item.name] || '#ffffff'} onChange={handleInputChange} className="w-12 h-12 rounded cursor-pointer" />
                                   <input type="text" name={item.name} value={formData[item.name] || ''} onChange={handleInputChange} className="std-input flex-1 font-mono uppercase" />
                               </div>
                           ) : (
                               <input type={item.name.includes('date') ? 'date' : 'text'} name={item.name} value={formData[item.name] || ''} onChange={handleInputChange} className="std-input" />
                           )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* Submit Section */}
      {currentStep > 10 && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-screen bg-[#2A2015] text-white">
              <h2 className="text-5xl mb-4">The brief is <span className="text-[#E8A84C] italic-accent font-bold">complete.</span></h2>
              <p className="text-[#A08C72] max-w-md mx-auto mb-12">All strategic assets have been mapped. Proceed to export the tactical brief for the editing unit.</p>
              
              <div className="flex flex-col md:flex-row gap-4">
                  <button onClick={downloadPDF} className="bg-gradient-to-r from-[#E8A84C] to-[#C47B2B] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all">
                      ✦ DOWNLOAD PDF BRIEF
                  </button>
                  <button onClick={copyBrief} className="bg-white/5 border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                      COPY ALL DATA
                  </button>
              </div>
              <button onClick={() => setCurrentStep(1)} className="mt-12 text-[#A08C72] hover:text-white transition-colors text-sm">
                  Restart Construction
              </button>
          </div>
      )}

      {/* Floating Buttons */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FBF7F0] to-transparent flex justify-center gap-6 z-50 ${currentStep === 0 || currentStep > 10 ? 'hidden' : 'flex'}`}>
          <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} className="bg-[#2A2015] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2">
            ← BACK
          </button>
          <button onClick={() => setCurrentStep(s => Math.min(11, s + 1))} className="bg-[#2A2015] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2">
            NEXT STEP →
          </button>
      </div>

      <button onClick={() => setShowResetModal(true)} className="fixed top-6 right-6 w-12 h-12 bg-[#2A2015] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 transition-colors z-[100]">
          <RefreshCcw className="w-5 h-5"/>
      </button>

      {showResetModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[200] flex items-center justify-center p-6">
              <div className="bg-white p-8 rounded-3xl max-w-sm text-center shadow-2xl border border-[#EDE4D3]">
                  <h3 className="text-2xl font-bold mb-2">Reset Brief?</h3>
                  <p className="text-sm text-gray-500 mb-8">This will clear all progress and restart the construction. This cannot be undone.</p>
                  <div className="flex gap-3">
                      <button onClick={() => setShowResetModal(false)} className="flex-1 px-6 py-3 border border-[#E2D4BE] rounded-full font-bold">Cancel</button>
                      <button onClick={confirmReset} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-full font-bold">Reset</button>
                  </div>
              </div>
          </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] bg-[#2A2015] text-white px-6 py-4 rounded-2xl shadow-all transition-all duration-500 ${showToast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {showToast.msg}
      </div>

    </div>
  );
};

const RefreshCcw = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
    </svg>
);

export default BriefGenerator;
