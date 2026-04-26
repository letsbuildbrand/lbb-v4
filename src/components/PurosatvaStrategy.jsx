import { useState, useEffect, useRef } from 'react';
import './purosatva-strategy.css';
import { COMPETITOR_DATA, renderCompetitorSection } from '../data/purosatva-competitor-data';
import { CALENDAR_DATA, WEEK_LABELS, getWeek } from '../data/purosatva-calendar-data';

const getDayPhaseClass = (phase) => {
  const map = { phase1: 'phase1', phase2: 'phase2', phase3: 'phase3', phase4: 'phase4' };
  return map[phase] || 'phase1';
};

const DayCard = ({ day }) => {
  const [expanded, setExpanded] = useState(false);
  const num = String(day.day).padStart(2, '0');

  const typeColors = {
    cinematic: { bg: 'rgba(155,140,255,0.1)', color: '#9b8cff', border: 'rgba(155,140,255,0.15)' },
    raw: { bg: 'rgba(107,203,119,0.1)', color: '#6bcb77', border: 'rgba(107,203,119,0.15)' },
    graphic: { bg: 'rgba(78,205,196,0.1)', color: '#4ecdc4', border: 'rgba(78,205,196,0.15)' },
  };
  const tc = typeColors[day.type] || typeColors.graphic;

  const tagColors = {
    content: { bg: 'rgba(201,169,110,0.1)', color: '#c9a96e', border: 'rgba(201,169,110,0.18)' },
    emotion: { bg: 'rgba(78,205,196,0.1)', color: '#4ecdc4', border: 'rgba(78,205,196,0.18)' },
    tactics: { bg: 'rgba(155,140,255,0.1)', color: '#9b8cff', border: 'rgba(155,140,255,0.18)' },
    message: { bg: 'rgba(232,124,94,0.1)', color: '#e87c5e', border: 'rgba(232,124,94,0.18)' },
  };

  return (
    <div
      className={`day-card ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
      style={{
        background: expanded ? '#1e1e22' : '#111113',
        border: `1px solid ${expanded ? 'rgba(201,169,110,0.25)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <div className="day-header">
        <div className="day-number">{num}</div>
        <div className="day-title">{day.title}</div>
        <span
          className="day-type"
          style={{
            background: tc.bg,
            color: tc.color,
            border: `1px solid ${tc.border}`,
            fontSize: '11px',
            fontWeight: '500',
            padding: '4px 10px',
            borderRadius: '999px',
            flexShrink: 0,
            textTransform: 'capitalize',
          }}
        >
          {day.type}
        </span>
        <div
          className="day-toggle"
          style={{
            transform: expanded ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease',
          }}
        >
          +
        </div>
      </div>

      {expanded && (
        <div className="day-body">
          <div className="form-tags">
            {day.tags.map((t, i) => {
              const tg = tagColors[t.cls] || tagColors.content;
              return (
                <span
                  key={i}
                  style={{
                    background: tg.bg,
                    color: tg.color,
                    border: `1px solid ${tg.border}`,
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    display: 'inline-block',
                  }}
                >
                  {t.label} | {t.text}
                </span>
              );
            })}
          </div>
          <div className="form-detail">
            {day.details.map((d, i) => (
              <div
                key={i}
                className="form-detail-block"
                style={{ background: '#1e1e22', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px' }}
              >
                <div className="label" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', marginBottom: '8px' }}>
                  {d.label}
                </div>
                <div className="value" style={{ fontSize: '13px', color: '#a09d98', lineHeight: '1.6' }}>
                  {d.value}
                </div>
              </div>
            ))}
          </div>
          <div className="impact-row" style={{ background: '#1e1e22', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(107,203,119,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
              {day.impactIcon}
            </div>
            <div style={{ fontSize: '13px', color: '#a09d98', lineHeight: '1.5' }}>
              <strong style={{ color: '#6bcb77', fontWeight: '500' }}>
                {day.impact.split(':')[0]}:
              </strong>
              {day.impact.split(':').slice(1).join(':')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CompetitorSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.innerHTML = '';
      const container = document.createElement('div');
      renderCompetitorHTML(container);
      sectionRef.current.appendChild(container);
    }
  }, []);

  return (
    <section id="competitors" style={{ marginBottom: '80px' }}>
      <div ref={sectionRef} style={{ display: 'contents' }} />
    </section>
  );
};

function renderCompetitorHTML(container) {
  const posMapRows = COMPETITOR_DATA.posMap.map(p => {
    const isP = p.isPurosatva;
    return `
      <tr style="${isP ? 'background:rgba(201,169,110,0.07);border-left:3px solid #c9a96e;' : ''}">
        <td style="padding:14px 16px;font-size:13px;color:${isP ? '#c9a96e' : '#f0eee8'};font-weight:600;border-bottom:1px solid rgba(255,255,255,0.07);">${p.brand}</td>
        <td style="padding:14px 16px;font-size:13px;color:#f0eee8;border-bottom:1px solid rgba(255,255,255,0.07);">${p.category}</td>
        <td style="padding:14px 16px;font-size:13px;font-style:italic;color:#f0d48a;border-bottom:1px solid rgba(255,255,255,0.07);">${p.emotion}</td>
        <td style="padding:14px 16px;font-size:13px;color:#a09d98;border-bottom:1px solid rgba(255,255,255,0.07);">${p.model}</td>
        <td style="padding:14px 16px;font-size:13px;color:#a09d98;border-bottom:1px solid rgba(255,255,255,0.07);">${p.trust}</td>
        <td style="padding:14px 16px;font-size:13px;color:#a09d98;border-bottom:1px solid rgba(255,255,255,0.07);">${p.expandability}</td>
      </tr>`;
  }).join('');

  const gapsRows = COMPETITOR_DATA.marketGaps.map(g => `
    <div class="opp-item" style="background:#111113;border:1px solid rgba(5,150,105,0.25);border-radius:20px;padding:20px;display:flex;align-items:flex-start;gap:14px;">
      <div style="width:36px;height:36px;border-radius:8px;background:rgba(5,150,105,0.15);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${g.icon}</div>
      <div style="font-size:13px;color:#f0eee8;line-height:1.6;">
        <strong style="color:#f0eee8;font-weight:600;">${g.factor}</strong><br>
        <span style="color:#a09d98;">Market: ${g.market ? '✅ Has it' : '❌ Missing'} | Purosatva: ${g.purosatva ? '✅ Has it' : '❌ Missing'}</span>
      </div>
    </div>`).join('');

  const attacksRows = COMPETITOR_DATA.attacks.map(a => `
    <div class="attack-card" style="background:#111113;border:1px solid rgba(232,124,94,0.2);border-radius:20px;padding:20px 24px;margin-bottom:12px;border-left:3px solid #e87c5e;">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#e87c5e;margin-bottom:8px;">Attack on ${a.competitor}</div>
      <div style="font-size:13px;color:#a09d98;margin-bottom:10px;line-height:1.6;">Weakness: ${a.weakness}</div>
      <div style="font-family:'Instrument Serif',serif;font-size:18px;font-style:italic;color:#c9a96e;line-height:1.4;">"${a.attack}"</div>
      <div style="margin-top:8px;font-size:12px;color:#a09d98;">${a.approach}</div>
    </div>`).join('');

  const pillarsRows = COMPETITOR_DATA.commonPillars.map(p => `
    <div style="background:#111113;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:28px 32px;margin-bottom:16px;">
      <div style="font-size:14px;font-weight:600;color:#f0eee8;margin-bottom:6px;">${p.pillar}</div>
      <div style="font-size:13px;color:#a09d98;">${p.examples}</div>
    </div>`).join('');

  const posItems = COMPETITOR_DATA.finalPositions.map(p => {
    const isP = p.brand === 'Purosatva';
    return `
      <div style="background:#1e1e22;border-radius:12px;padding:16px;border:1px solid ${isP ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.07)'};${isP ? 'background:rgba(201,169,110,0.1);' : ''}">
        <div style="font-size:13px;font-weight:600;color:${isP ? '#c9a96e' : '#f0eee8'};margin-bottom:8px;">${p.brand}</div>
        <div style="font-family:'Instrument Serif',serif;font-size:14px;font-style:italic;color:${isP ? '#f0d48a' : '#a09d98'};line-height:1.4;">${p.position}</div>
      </div>`;
  }).join('');

  const innerHTML = `
    <div id="competitor-section-inner">
      <!-- Positioning Map -->
      <div class="comp-section-label" style="display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;font-weight:500;margin-bottom:24px;font-family:monospace;">
        <span style="width:24px;height:1px;background:#c9a96e;"></span>08 | Competitive Landscape
      </div>
      <h2 class="comp-section-title" style="font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-0.01em;color:#f0eee8;margin-bottom:16px;">Where Purosatva stands in the market</h2>
      <p style="color:#a09d98;font-size:15px;max-width:580px;line-height:1.7;margin-bottom:40px;">Purosatva is not competing with Amul or Gokul. Its real battlefield is the organic farm-led lifestyle space.</p>
      <div style="margin-bottom:40px;overflow-x:auto;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);background:#111113;" class="puro-comp-table-wrap">
        <table style="width:100%;border-collapse:collapse;background:#111113;">
          <thead>
            <tr style="background:#18181b;">
              <th style="padding:14px 16px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07);">Brand</th>
              <th style="padding:14px 16px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07);">Core Product</th>
              <th style="padding:14px 16px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07);">Core Emotion</th>
              <th style="padding:14px 16px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07);">Model</th>
              <th style="padding:14px 16px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07);">Trust Type</th>
              <th style="padding:14px 16px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07);">Expandability</th>
            </tr>
          </thead>
          <tbody>${posMapRows}</tbody>
        </table>
      </div>

      <!-- Market Opportunity -->
      <div class="comp-section-label" style="display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;font-weight:500;margin-bottom:24px;font-family:monospace;">
        <span style="width:24px;height:1px;background:#c9a96e;"></span>09 | Market Opportunity
      </div>
      <h2 class="comp-section-title" style="font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-0.01em;color:#f0eee8;margin-bottom:16px;">What nobody in the market is doing</h2>
      <p style="color:#a09d98;font-size:15px;max-width:580px;line-height:1.7;margin-bottom:40px;">While all competitors compete on health, supply chain, and freshness | Purosatva operates in an almost entirely uncontested space.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:40px;" class="puro-2col">${gapsRows}</div>

      <div style="background:linear-gradient(120deg,rgba(201,169,110,0.15),rgba(201,169,110,0.05));border:1px solid rgba(201,169,110,0.2);border-radius:12px;padding:20px 24px;font-size:14px;color:#e8d5b0;line-height:1.7;margin-bottom:40px;">
        <strong style="color:#f0d48a;">True category:</strong> Purosatva is not entering dairy, organic milk, or premium packaged milk. It is creating <strong style="color:#f0d48a;">"Participatory Agriculture / Ownership-based Food System"</strong> | closest to CSA farm shares, vineyard ownership, or European cow-sharing models. In India: <strong style="color:#f0d48a;">almost entirely untapped.</strong>
      </div>

      <!-- Strategic Comparison -->
      <div class="comp-section-label" style="display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;font-weight:500;margin-bottom:24px;font-family:monospace;">
        <span style="width:24px;height:1px;background:#c9a96e;"></span>10 | Strategic Comparison
      </div>
      <h2 class="comp-section-title" style="font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-0.01em;color:#f0eee8;margin-bottom:40px;">Purosatva vs. real competitors</h2>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:40px;">
        <div style="background:#111113;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:16px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:6px;background:rgba(5,150,105,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;">🍃</div>
            <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#059669;">Akshayakalpa</div>
          </div>
          <ul style="font-size:12px;color:#a09d98;line-height:1.8;list-style:none;padding:0;margin:0;">
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Farmer network model</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Buyer relationship</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Certification-based trust</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Process-driven organic</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Corporate feel</li>
          </ul>
        </div>
        <div style="background:#111113;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:16px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:6px;background:rgba(100,116,139,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;">🌾</div>
            <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Two Brothers</div>
          </div>
          <ul style="font-size:12px;color:#a09d98;line-height:1.8;list-style:none;padding:0;margin:0;">
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>D2C farm brand</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Buyer relationship</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Story-based trust</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Not daily-use</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Specialty focus</li>
          </ul>
        </div>
        <div style="background:#111113;border:1px solid rgba(201,169,110,0.2);border-radius:20px;padding:16px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:28px;height:28px;border-radius:6px;background:rgba(201,169,110,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;">✨</div>
            <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#c9a96e;">Purosatva</div>
          </div>
          <ul style="font-size:12px;color:#a09d98;line-height:1.8;list-style:none;padding:0;margin:0;">
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Ownership ecosystem</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Owner relationship</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Personal trust</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Emotional lock-in</li>
            <li style="display:flex;align-items:flex-start;gap:6px;"><span style="color:#c9a96e;">—</span>Experience + milk</li>
          </ul>
        </div>
      </div>

      <!-- Competitive Attacks -->
      <div class="comp-section-label" style="display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;font-weight:500;margin-bottom:24px;font-family:monospace;">
        <span style="width:24px;height:1px;background:#c9a96e;"></span>11 | Competitive Attacks
      </div>
      <h2 class="comp-section-title" style="font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-0.01em;color:#f0eee8;margin-bottom:16px;">Where to attack. How to win.</h2>
      <p style="color:#a09d98;font-size:15px;max-width:580px;line-height:1.7;margin-bottom:40px;">Each competitor has a structural weakness that Purosatva's model directly addresses.</p>
      <div style="margin-bottom:40px;">${attacksRows}</div>

      <!-- Competitive Pattern -->
      <div class="comp-section-label" style="display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;font-weight:500;margin-bottom:24px;font-family:monospace;">
        <span style="width:24px;height:1px;background:#c9a96e;"></span>12 | Competitive Pattern
      </div>
      <h2 class="comp-section-title" style="font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-0.01em;color:#f0eee8;margin-bottom:16px;">What all competitors revolve around</h2>
      <p style="color:#a09d98;font-size:15px;max-width:580px;line-height:1.7;margin-bottom:40px;">Every competitor in this space uses the same three pillars. Purosatva must use all three | but lead with ownership and emotion.</p>
      <div style="margin-bottom:40px;">${pillarsRows}</div>

      <!-- Final Strategic Position -->
      <div class="comp-section-label" style="display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#c9a96e;font-weight:500;margin-bottom:24px;font-family:monospace;">
        <span style="width:24px;height:1px;background:#c9a96e;"></span>13 | Final Strategic Position
      </div>
      <h2 class="comp-section-title" style="font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-0.01em;color:#f0eee8;margin-bottom:40px;">Where each brand ends up</h2>
      <div style="background:#111113;border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;margin-bottom:40px;">
        <div style="padding:14px 20px;background:#18181b;border-bottom:1px solid rgba(255,255,255,0.07);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a96e;font-family:monospace;">Competitive Positioning | Final Map</div>
        <div style="padding:20px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">${posItems}</div>
      </div>

      <!-- Brutal Truth -->
      <div style="margin-top:40px;background:linear-gradient(120deg,rgba(232,124,94,0.12),rgba(232,124,94,0.04));border:1px solid rgba(232,124,94,0.25);border-radius:12px;padding:20px 24px;">
        <strong style="color:#e87c5e;">The Brutal Truth </strong><br><br>
        <strong style="color:#f0d48a;">Purosatva will fail if it looks like:</strong><br>
        • Just another "organic milk brand"<br>
        • Positions on health or freshness alone<br>
        • Leads with price or product features<br><br>
        <strong style="color:#f0d48a;">Purosatva will win if it feels like:</strong><br>
        • "I own something real"<br>
        • "This is my farm"<br>
        • "This is my cow"
      </div>
    </div>
  `;

  container.innerHTML = innerHTML;
}

const PurosatvaStrategy = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (index) => (el) => {
    if (el) sectionRefs.current[index] = el;
  };

  return (
    <div style={{ background: '#0a0a0b', color: '#f0eee8', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10,10,11,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo + Brand */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#c9a96e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Geist', sans-serif",
            fontSize: '9px',
            fontWeight: 800,
            color: '#0a0a0b',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}>
            LBB.
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: '12px', fontWeight: 600, color: '#f0eee8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Let's Build Brand
          </div>
        </a>
        {/* Nav Links */}
        <div className="puro-nav-links" style={{ display: 'flex', gap: '4px' }}>
          {['mission', 'brand', 'competitors', 'framework', 'phases', 'calendar'].map(link => (
            <a
              key={link}
              href={`#${link}`}
              style={{
                fontSize: '12px',
                color: '#7a7875',
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '6px',
                transition: 'all 0.15s ease',
                textTransform: 'capitalize',
              }}
              onMouseEnter={e => { e.target.style.color = '#f0eee8'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = '#7a7875'; e.target.style.background = 'transparent'; }}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 28px 120px' }}>
        {/* Hero */}
        <section id="mission" style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} className="puro-mission-glow" />
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(201,169,110,0.1)',
            border: '1px solid rgba(201,169,110,0.25)',
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c9a96e',
            fontWeight: 500,
            marginBottom: '32px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e', animation: 'pulse 2s ease-in-out infinite' }} />
            Premium Dairy Strategy | Kolhapur District
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(48px, 7vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f0eee8',
            marginBottom: '24px',
          }}>
            30-Day Social Media<br /><em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Strategy for Purosatva</em>
          </h1>
          <p style={{ fontSize: '17px', color: '#a09d98', maxWidth: '580px', lineHeight: 1.65, marginBottom: '48px' }}>
            A deeply emotional, psychology-driven content framework built around a single idea: people are not buying milk, they are buying a relationship. Every post builds the bridge between urban families and the purity they never knew they were missing.
          </p>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Brand', value: 'Purosatva' },
              { label: 'Location', value: 'Kolhapur District' },
              { label: 'Duration', value: '30 Days' },
              { label: 'Model', value: 'Cow Ownership' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a7875' }}>{item.label}</span>
                <span style={{ fontSize: '14px', color: '#a09d98', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.07)', margin: '60px 0' }} />

        {/* Mission */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.03))',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '28px',
            padding: '36px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '300px',
              background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.15), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(24px, 3vw, 32px)', fontStyle: 'italic', color: '#c9a96e', lineHeight: 1.4, marginBottom: '20px', position: 'relative' }}>
              "शुद्धतेशी नातं"
            </div>
            <p style={{ fontSize: '14px', color: '#a09d98', maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
              The cow is family. The farm is home. The milk is not a product | it is the yield of something that belongs to you, maintained by people who care for it like their own. This is not dairy. This is a return to purity and connection.
            </p>
          </div>
        </section>

        {/* Brand Brief */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />01 | Brand Foundation
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Who Purosatva is
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            This strategy is built on a powerful emotional truth: urban families have lost their connection with nature, with farms, and with animals. There was once a time when people either owned cattle or at least knew where their milk came from. Today, milk has become a packaged commodity with fancy labels, but no real connection.
          </p>

          {/* Brand Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="puro-2col">
            {[
              { title: 'Brand Name', name: 'Purosatva', sub: 'शुद्ध + सात्त्व | Purity in nature. The name itself is the promise.' },
              { title: 'Core Industry', name: 'Premium Dairy', sub: 'Not milk delivery. Cow ownership. Farm connection. Community.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 32px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', marginBottom: '10px' }}>{card.title}</div>
                <div style={{ fontSize: '22px', fontFamily: "'Instrument Serif', serif", color: '#f0eee8', marginBottom: '8px' }}>{card.name}</div>
                <div style={{ fontSize: '13px', color: '#7a7875' }}>{card.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="puro-2col">
            {[
              { title: 'Target Audience', body: 'Urban families in Kolhapur district who value health and quality. Parents aged 28–45 who grew up with a connection to villages and farming. Families who feel the quiet loss of authenticity in modern food but do not know how to reclaim it. Children who know every brand on their phone but have never touched a cow.' },
              { title: 'Brand Voice', body: 'Calm. Confident. Deeply rooted. Never loud, never salesy, never desperate. The brand speaks like someone who knows their value and is simply inviting the right people to be part of it. Emotion leads. Logic supports. Visuals complete.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 32px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', marginBottom: '10px' }}>{card.title}</div>
                <div style={{ fontSize: '14px', color: '#a09d98', lineHeight: 1.7 }}>{card.body}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 32px', marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', marginBottom: '10px' }}>The One-Line Positioning</div>
            <div style={{ fontSize: '18px', color: '#c9a96e', lineHeight: 1.6, fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
              "Purosatva is not dairy delivered. It is a relationship restored."
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="puro-3col">
            {[
              { pillar: 'शुद्धता', english: 'Purity', desc: 'Not a claim. A way of life.' },
              { pillar: 'पारदर्शकता', english: 'Transparency', desc: 'Not a promise. A practice.' },
              { pillar: 'निसर्गाशी नातं', english: 'Connection to Nature', desc: 'Not a feature. A philosophy.' },
            ].map(p => (
              <div key={p.pillar} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 32px' }} className="puro-card">
                <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', marginBottom: '10px' }}>Brand Pillar</div>
                <div style={{ fontSize: '18px', fontFamily: "'Instrument Serif', serif", color: '#c9a96e', marginBottom: '6px' }}>{p.pillar}</div>
                <div style={{ fontSize: '13px', color: '#a09d98', fontStyle: 'italic', marginBottom: '6px' }}>{p.english}</div>
                <div style={{ fontSize: '13px', color: '#7a7875' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Satva Circle */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />02 | The Ownership Model
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Satva Circle | The Core Offering
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            This is not a prepaid milk plan. This is cow ownership. A family invests ₹1 lakh into their cow | and receives daily milk deliveries of equivalent worth over time. But this is never how it is communicated. The communication feels like belonging, like a family tie, like owning a piece of something real and alive.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }} className="puro-2col">
            {[
              { emoji: '🐃', title: 'Farm Connected Milk', sub: 'Direct from the source', color: '#4ecdc4', bg: 'rgba(78,205,196,0.12)', body: 'Your family receives milk directly from your cow on our farm. Not processed. Not packaged. Not standardised. Just pure, farm-fresh milk delivered to your doorstep every morning.' },
              { emoji: '🚪', title: 'Farm Access Anytime', sub: 'Visit your cow', color: '#6bcb77', bg: 'rgba(107,203,119,0.12)', body: 'You and your family can visit the farm anytime. Bring your children. Let them touch the source. Let them meet the cow that belongs to them. This is not a farm tour | this is homecoming.' },
              { emoji: '🥛', title: 'Priority Dairy Products', sub: 'First access', color: '#9b8cff', bg: 'rgba(155,140,255,0.12)', body: 'Ghee, butter, paneer, curd | everything we make, Satva Circle members get first. Before anyone else. Because you are not customers. You are the foundation.' },
              { emoji: '🏡', title: 'Annual Farm Gathering', sub: 'Community reunion', color: '#e87c5e', bg: 'rgba(232,124,94,0.12)', body: 'Once a year, all Satva Circle families gather at the farm. Not for a business meeting. For a reunion. Children play with calves. Parents meet each other. A community is built over chai and fresh milk.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0eee8' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: item.color }}>{item.sub}</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#a09d98', lineHeight: 1.65 }}>{item.body}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(120deg,rgba(201,169,110,0.15),rgba(201,169,110,0.05))', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '12px', padding: '20px 24px', fontSize: '14px', color: '#e8d5b0', lineHeight: '1.7' }}>
            <strong style={{ color: '#f0d48a' }}>The Satva Circle Investment </strong> ₹1 lakh per cow. This is not the price of milk. This is the value of a relationship. The daily milk deliveries are the fruit of that connection | not a product transaction, but a living bond between your family and a cow that belongs to you.
          </div>
        </section>

        {/* EMOC Framework */}
        <section id="framework" style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />03 | The EMOC Framework
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Every post must carry all four elements
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            This is not optional. The EMOC framework creates psychological completeness | the audience's brain receives emotion, owns a piece of content, understands the logic, and receives a direction. That is what builds memory and trust.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '24px' }}>
            {[
              { letter: 'E', color: '#c9a96e', bg: 'rgba(201,169,110,0.15)', title: 'Emotion', body: 'A feeling that the audience did not know they were carrying. The quiet ache of a lost connection. The warmth of a memory from childhood. The longing for something pure. Emotion opens the door before logic walks in.', sub: 'People do not buy what makes sense. They buy what makes them feel something. Emotion is the hook. Without it, no post survives the scroll.' },
              { letter: 'M', color: '#4ecdc4', bg: 'rgba(78,205,196,0.12)', title: 'Memory', body: 'A piece of the brand or the founder\'s story that grounds everything in something real. The cow named something. The morning when the first calf was born. Memory makes the brand human and the philosophy lived.', sub: 'People invest emotionally in stories before they invest financially. Memory creates parasocial trust | the feeling that you know the people behind the product.' },
              { letter: 'O', color: '#9b8cff', bg: 'rgba(155,140,255,0.12)', title: 'Observation', body: 'A quiet question or reframing of something ordinary. "Do you really know where your milk comes from?" Observation disrupts the mental model | makes them pause and reconsider what they accepted as normal.', sub: 'The quietest disruption is the most powerful. When you question something without attacking it, you create space for curiosity. Curiosity is the beginning of trust.' },
              { letter: 'C', color: '#e87c5e', bg: 'rgba(232,124,94,0.12)', title: 'Connection', body: 'The invitation. Not to buy | but to belong. To be part of the Satva Circle. To visit the farm. To meet the cow. Connection is the message that moves people from audience to community.', sub: 'The final frame is never a CTA. It is a door left open. "If this sounds like your family | we would love to meet you."' },
            ].map(item => (
              <div key={item.letter} style={{ background: '#111113', padding: '32px 36px', position: 'relative', overflow: 'hidden', borderTop: '2px solid rgba(255,255,255,0.07)' }}>
                <div style={{ position: 'absolute', right: '24px', bottom: '16px', fontFamily: "'Instrument Serif', serif", fontSize: '80px', fontStyle: 'italic', color: 'rgba(255,255,255,0.03)', lineHeight: 1, pointerEvents: 'none' }}>
                  {item.letter}
                </div>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontSize: '18px', fontWeight: 500, fontStyle: 'italic', marginBottom: '16px', color: item.color }}>
                  {item.letter}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', color: '#f0eee8', marginBottom: '8px', textTransform: 'uppercase' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: '#a09d98', lineHeight: 1.65 }}>{item.body}</div>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '12px', color: '#7a7875', lineHeight: 1.6 }}>
                  <strong style={{ color: item.color, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Why it matters</strong><br />
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(120deg,rgba(201,169,110,0.15),rgba(201,169,110,0.05))', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '12px', padding: '20px 24px', fontSize: '14px', color: '#e8d5b0', lineHeight: '1.7' }}>
            <strong style={{ color: '#f0d48a' }}>EMOC in action </strong> Emotion: A parent pours milk for their child who barely reacts. Memory: The founder remembers the cow in his village. Observation: "When did the milk we drink stop meaning something?" Connection: "Your family could be part of the Satva Circle. Come meet your cow."
          </div>
        </section>

        {/* Content Architecture */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />04 | Content Architecture
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Three layers of content
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            Every piece of content falls into one of three layers. The ratio is intentional: the cinematic creates desire, the raw creates trust, the graphic creates clarity. Together they build a complete world.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="puro-3col">
            {[
              { emoji: '🎬', title: 'Cinematic / Film', pct: '50%', bg: 'rgba(155,140,255,0.1)', color: '#9b8cff', border: 'rgba(155,140,255,0.15)', body: 'Beautiful, slow, deliberate. Drone shots of the farm at dawn. Early morning routines. Hands washing a cow\'s face. Cinematic content is the visual heartbeat | it makes the brand feel aspirational and real. Music-driven. Almost like short films.' },
              { emoji: '📱', title: 'Raw / UGC Style', pct: '30%', bg: 'rgba(107,203,119,0.1)', color: '#6bcb77', border: 'rgba(107,203,119,0.15)', body: 'Unpolished, real, warm. Shot on phone. Natural light. Children laughing. Hands on fur. Milk being poured. Raw content is the emotional texture | it makes the cinematic feel grounded and authentic.' },
              { emoji: '🖼️', title: 'Graphic / Static', pct: '20%', bg: 'rgba(78,205,196,0.1)', color: '#4ecdc4', border: 'rgba(78,205,196,0.15)', body: 'Clean, minimal, text-first. Thought-provoking lines. Myth-busting content. Simple visual language. Graphic content is the intellectual clarity | it reinforces concepts without overwhelming the audience.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0eee8' }}>{item.title}</div>
                    <span style={{ display: 'inline-block', marginTop: '3px', background: item.bg, color: item.color, border: `1px solid ${item.border}`, fontSize: '11px', fontWeight: 500, padding: '4px 10px', borderRadius: '999px' }}>
                      {item.pct} of content
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#a09d98', lineHeight: 1.65 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Phases */}
        <section id="phases" style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />05 | Campaign Phases
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Four phases of perception
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            The audience moves through four emotional stages. Each phase has a specific psychological goal and a specific tone. The content plan is designed to guide them through all four | slowly, gently, inevitably.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }} className="puro-2col">
            {[
              { phase: 'Phase 1', days: 'Days 1–10', title: 'The Uncomfortable Question', quote: '"Do you really know where your milk comes from?"', body: 'Make them pause. Create doubt. Disrupt their existing mental model of "premium milk." The content never mentions Purosatva as a product. It asks questions they have never been asked before.', tone: 'Questioning, reflective, unsettling', color: '#64748b' },
              { phase: 'Phase 2', days: 'Days 11–20', title: 'The Honest Answer', quote: '"There is another way."', body: 'Introduce the philosophy. Let emotion breathe. Build trust through transparency. The founder\'s story is told in full. The farm is revealed. The concept of cow ownership is planted | not as a financial model, but as a lifestyle upgrade.', tone: 'Warm, revealing, philosophical', color: '#059669' },
              { phase: 'Phase 3', days: 'Days 21–26', title: 'The Invitation', quote: '"This is not for everyone. But it could be for you."', body: 'Position the Satva Circle as aspirational. Create desire through community, not product. The exclusivity is framed as care | "we are choosing 20 families carefully because relationships cannot scale." The door opens.', tone: 'Aspirational, exclusive, generous', color: '#d97706' },
              { phase: 'Phase 4', days: 'Days 27–30', title: 'The Quiet Call', quote: '"The door is open. Step in."', body: 'Soft conversion. Not a sales push. An open door. The call to action is warm, simple, human. Nothing feels like a billboard. Everything feels like a handwritten note.', tone: 'Intimate, closing, reflective', color: '#be185d' },
            ].map(p => (
              <div key={p.phase} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.color, fontFamily: 'monospace' }}>{p.phase}</span>
                  <span style={{ fontSize: '11px', color: '#7a7875' }}>{p.days}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0eee8', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', color: '#a09d98', marginBottom: '12px', fontStyle: 'italic' }}>{p.quote}</p>
                <div style={{ fontSize: '12px', color: '#7a7875', lineHeight: 1.6, marginBottom: '12px' }}>{p.body}</div>
                <div style={{ fontSize: '11px', color: p.color, fontWeight: 500 }}>Tone: {p.tone}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(120deg,rgba(201,169,110,0.15),rgba(201,169,110,0.05))', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '12px', padding: '20px 24px', fontSize: '14px', color: '#e8d5b0', lineHeight: '1.7' }}>
            <strong style={{ color: '#f0d48a' }}>Phase psychology </strong> Phase 1 plants a question. Phase 2 answers it with a story. Phase 3 makes the story feel like a world worth entering. Phase 4 lets them choose to step in. You never sell. You invite. The audience never buys. They belong.
          </div>
        </section>

        {/* Platform Strategy */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />06 | Platform Strategy
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Platform-specific content rules
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            Each platform has its own psychological contract. Content that ignores this gets ignored. Every post should be native to its platform, adapted for its audience, but unified in the EMOC message.
          </p>

          <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', marginBottom: '40px', overflow: 'hidden' }} className="puro-platform-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <th style={{ padding: '12px 16px 12px 0', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', textAlign: 'left' }}>Platform</th>
                  <th style={{ padding: '12px 16px', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', textAlign: 'left' }}>Optimal Format</th>
                  <th style={{ padding: '12px 16px', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', textAlign: 'left' }}>Peak Times</th>
                  <th style={{ padding: '12px 16px', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', textAlign: 'left' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { platform: '📸 Instagram', sub: 'Reels, Carousels, Stories', format: 'Reels 30–90s cinematic / Carousel 3–6 slides / Stories daily', times: 'Tue–Sun, 7am–9am & 6pm–8pm', priority: 'Primary', width: '90%', gradient: 'linear-gradient(90deg, #ee2a7b, #f9ce34)', bg: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' },
                  { platform: '💬 WhatsApp', sub: 'Status, Broadcast Lists', format: 'Status 30s clips / Text-forward stories / Personal outreach', times: 'Daily, 8am–10am', priority: 'High', width: '75%', gradient: 'linear-gradient(90deg, #25d366, #128c7f)', bg: '#25d366' },
                  { platform: '👥 Facebook', sub: 'Long-form, Video, Groups', format: 'Extended video stories / Community group engagement / Live Q&A', times: 'Daily, 9am–11am', priority: 'Secondary', width: '50%', gradient: 'linear-gradient(90deg, #1877f2, #66b2ff)', bg: '#1877f2' },
                  { platform: '🎵 YouTube Shorts', sub: 'Shorts + Long-form', format: 'Shorts under 60s / Extended farm stories / Behind-the-scenes', times: 'Thu–Sun, 12pm–3pm & 7pm–10pm', priority: 'Evergreen', width: '65%', gradient: 'linear-gradient(90deg, #ff0000, #ff914d)', bg: '#000' },
                ].map((row, i) => (
                  <tr key={row.platform} style={{ borderBottom: i === 3 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
                    <td style={{ padding: '18px 16px 18px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: row.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{row.platform.split(' ')[0]}</div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '13px', color: '#f0eee8' }}>{row.platform.split(' ').slice(1).join(' ')}</div>
                        <div style={{ fontSize: '11px', color: '#7a7875' }}>{row.sub}</div>
                      </div>
                    </td>
                    <td style={{ padding: '18px 16px', fontSize: '13px', color: '#a09d98' }}>{row.format}</td>
                    <td style={{ padding: '18px 16px', fontSize: '13px', color: '#a09d98' }}>{row.times}</td>
                    <td style={{ padding: '18px 16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0eee8' }}>{row.priority}</div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginTop: '4px' }}>
                        <div style={{ height: '100%', width: row.width, background: row.gradient, borderRadius: '999px' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: 'linear-gradient(120deg,rgba(201,169,110,0.15),rgba(201,169,110,0.05))', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '12px', padding: '20px 24px', fontSize: '14px', color: '#e8d5b0', lineHeight: '1.7' }}>
            <strong style={{ color: '#f0d48a' }}>Local platform note </strong> For Kolhapur district, WhatsApp is as important as Instagram. Community groups, broadcast lists, and personal outreach through trusted local networks carry trust that paid ads never can. The Satva Circle grows word-of-mouth before it grows digitally.
          </div>
        </section>

        {/* Competitor Section */}
        <CompetitorSection />

        {/* Calendar */}
        <section id="calendar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />07 | 30-Day Content Calendar
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#f0eee8', marginBottom: '16px' }}>
            Every day. Every post. Every purpose.
          </h2>
          <p style={{ color: '#a09d98', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7, marginBottom: '40px' }}>
            Each day below contains the full EMOC breakdown: the content concept, the emotional goal, the format, suggested caption, and the psychological mechanism behind why it works. Click any day to expand the full brief.
          </p>

          {[1, 2, 3, 4, 5, 6].map(weekNum => {
            const weekData = WEEK_LABELS[weekNum];
            if (!weekData) return null;
            const weekDays = CALENDAR_DATA.filter(d => getWeek(d.day) === weekNum);
            if (weekDays.length === 0) return null;

            const phaseColors = {
              phase1: '#64748b',
              phase2: '#059669',
              phase3: '#d97706',
              phase4: '#be185d',
            };
            const color = phaseColors[weekData.phase] || '#7a7875';

            return (
              <div key={weekNum}>
                <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontFamily: 'monospace', padding: '24px 0 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {weekData.label}
                  <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                </div>
                <div>
                  {weekDays.map(day => (
                    <DayCard key={day.day} day={day} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.07)', margin: '60px 0' }} />

        {/* Final Note */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a7875', fontWeight: 500, marginBottom: '24px', fontFamily: 'monospace' }}>
            <span style={{ width: '24px', height: '1px', background: '#7a7875' }} />Final Note
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(232,124,94,0.08), rgba(232,124,94,0.03))',
            border: '1px solid rgba(232,124,94,0.2)',
            borderRadius: '28px',
            padding: '36px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: '#e87c5e', lineHeight: 1.4, marginBottom: '20px', position: 'relative' }}>
              "30 days is not enough to build a brand. But it is enough to plant one. This campaign lays the foundation. It introduces Purosatva to the families in and around Kolhapur who are looking for something better. It creates the first circle of believers. It builds the awareness and the emotional groundwork that makes the Satva Circle feel like something worth joining, not something being sold."
            </div>
            <p style={{ fontSize: '14px', color: '#a09d98', maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
              शुद्धतेशी नातं | Purosatva. The relationship with purity.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PurosatvaStrategy;
