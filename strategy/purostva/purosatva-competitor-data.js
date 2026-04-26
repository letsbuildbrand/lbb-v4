const COMPETITOR_DATA = {
  // Positioning Map
  posMap: [
    {
      brand: "Two Brothers",
      category: "Organic Food",
      emotion: "Tradition",
      model: "D2C Farm Brand",
      trust: "Story",
      expandability: "High",
      isPurosatva: false
    },
    {
      brand: "Akshayakalpa",
      category: "Organic Milk",
      emotion: "Health",
      model: "Farmer Network",
      trust: "Process",
      expandability: "High",
      isPurosatva: false
    },
    {
      brand: "Country Delight",
      category: "Fresh Milk",
      emotion: "Convenience",
      model: "Subscription",
      trust: "Delivery",
      expandability: "Medium",
      isPurosatva: false
    },
    {
      brand: "Ambrosia",
      category: "Organic Ecosystem",
      emotion: "Purity",
      model: "Farming Network",
      trust: "Legacy",
      expandability: "High",
      isPurosatva: false
    },
    {
      brand: "Local A2 Brands",
      category: "A2 Milk",
      emotion: "Health",
      model: "Direct Supply",
      trust: "Claims",
      expandability: "Low",
      isPurosatva: false
    },
    {
      brand: "Purosatva",
      category: "Ownership Ecosystem",
      emotion: "Belonging",
      model: "Cow Ownership",
      trust: "Personal",
      expandability: "Selective",
      isPurosatva: true
    }
  ],

  // Strategic Comparison Table
  stratComparison: [
    {
      factor: "Model",
      akshayakalpa: "Farmer Network",
      twoBrothers: "Farm Brand",
      purosatva: "Ownership Ecosystem"
    },
    {
      factor: "Customer Role",
      akshayakalpa: "Buyer",
      twoBrothers: "Buyer",
      purosatva: "Owner"
    },
    {
      factor: "Trust Type",
      akshayakalpa: "Certification",
      twoBrothers: "Story",
      purosatva: "Personal"
    },
    {
      factor: "Retention",
      akshayakalpa: "Subscription",
      twoBrothers: "Brand Loyalty",
      purosatva: "Emotional Lock-in"
    },
    {
      factor: "Product",
      akshayakalpa: "Milk + Dairy",
      twoBrothers: "Food Products",
      purosatva: "Experience + Milk"
    }
  ],

  // Market Gaps (what nobody is doing)
  marketGaps: [
    {
      factor: "Ownership",
      market: false,
      purosatva: true,
      icon: "🏠"
    },
    {
      factor: "Emotional Bonding",
      market: false,
      purosatva: true,
      icon: "💛"
    },
    {
      factor: "Farm Interaction",
      market: false,
      purosatva: true,
      icon: "🚜"
    },
    {
      factor: "Asset-backed Consumption",
      market: false,
      purosatva: true,
      icon: "📜"
    },
    {
      factor: "Community",
      market: false,
      purosatva: true,
      icon: "👨‍👩‍👧‍👦"
    }
  ],

  // Competitor Weaknesses to Attack
  attacks: [
    {
      competitor: "Akshayakalpa",
      weakness: "Feels corporate organic. No emotional attachment. The cow is a process, not a relationship.",
      attack: '"You don\'t know your cow."',
      approach: "Position Purosatva as the opposite: you know your cow, you visit your cow, your cow has a name."
    },
    {
      competitor: "Two Brothers",
      weakness: "Not daily-use milk. Not habit forming. A specialty purchase, not a lifestyle.",
      attack: '"We are part of your daily life."',
      approach: "Show the daily ritual of Purosatva milk delivery. Make it a morning habit, not a special occasion."
    },
    {
      competitor: "Country Delight",
      weakness: "Transactional. Replaceable. Convenient but forgettable. No deeper meaning.",
      attack: '"We are not delivery. We are belonging."',
      approach: "Purosatva is not competing on convenience. It is replacing the entire mental model of what milk delivery means."
    }
  ],

  // Three Pillars all competitors use
  commonPillars: [
    { pillar: "Health", examples: "Organic, A2, Chemical-free, Antibiotic-free" },
    { pillar: "Supply Chain Story", examples: "Farm sourcing, Farmer empowerment, Transparent sourcing" },
    { pillar: "Freshness", examples: "Direct delivery, Minimal processing, Farm to home in 48 hours" }
  ],

  // Final strategic positions
  finalPositions: [
    { brand: "Akshayakalpa", position: "Trusted organic milk" },
    { brand: "Two Brothers", position: "Authentic organic food" },
    { brand: "Country Delight", position: "Convenient milk" },
    { brand: "Purosatva", position: "Emotional + ownership-based purity ecosystem" }
  ],

  // Brutal truth
  brutalTruth: {
    willFailIf: [
      "Looks like just another organic milk brand",
      "Positions on health or freshness alone",
      "Leads with price or product features"
    ],
    willWinIf: [
      '"I own something real"',
      '"This is my farm"',
      '"This is my cow"'
    ]
  },

  // Category definition
  category: {
    notEntering: ["Dairy", "Organic milk", "Premium packaged milk", "A2 milk"],
    actuallyCreating: "Participatory Agriculture / Ownership-based Food System",
    globalComparables: ["Farm shares (CSA models)", "Vineyard ownership", "Cow-sharing in Europe"],
    indiaStatus: "Almost untapped"
  }
};

function renderCompetitorSection() {
  const container = document.getElementById('competitor-section');
  if (!container) return;

  // Positioning Map Table
  let posMapHTML = `<table class="comp-table">
    <thead>
      <tr>
        <th>Brand</th>
        <th>Core Product</th>
        <th>Core Emotion</th>
        <th>Model</th>
        <th>Trust Type</th>
        <th>Expandability</th>
      </tr>
    </thead>
    <tbody>`;

  COMPETITOR_DATA.posMap.forEach(p => {
    const rowClass = p.isPurosatva ? 'class="purosatva-col"' : '';
    posMapHTML += `<tr ${rowClass}>
      <td><span class="brand-name" style="color:${p.isPurosatva ? 'var(--gold)' : 'var(--text)'}; font-weight:600;">${p.brand}</span></td>
      <td style="color:var(--text);">${p.category}</td>
      <td style="font-style:italic; color:var(--gold2);">${p.emotion}</td>
      <td style="color:var(--muted2);">${p.model}</td>
      <td style="color:var(--muted2);">${p.trust}</td>
      <td style="color:var(--muted2);">${p.expandability}</td>
    </tr>`;
  });

  posMapHTML += `</tbody></table>`;
  posMapHTML = `<div class="comp-table-wrap">${posMapHTML}</div>`;

  // Market Gaps Grid
  let gapsHTML = `<div class="opp-grid">`;
  COMPETITOR_DATA.marketGaps.forEach(g => {
    gapsHTML += `<div class="opp-item">
      <div class="opp-icon yes">${g.icon}</div>
      <div class="opp-text" style="color:var(--text);">
        <strong style="color:var(--text);">${g.factor}</strong><br>
        <span style="color:var(--muted2);">Market: ${g.market ? '✅ Has it' : '❌ Missing'} | Purosatva: ${g.purosatva ? '✅ Has it' : '❌ Missing'}</span>
      </div>
    </div>`;
  });
  gapsHTML += `</div>`;

  // Strategic Comparison
  let stratHTML = `<div class="strat-row">`;
  stratHTML += `
    <div class="strat-col">
      <div class="strat-col-header">
        <div class="strat-col-icon" style="background:rgba(5,150,105,0.15);">🍃</div>
        <div class="strat-col-name" style="color:var(--phase2);">Akshayakalpa</div>
      </div>
      <ul class="strat-col-body">
        <li>Farmer network model</li>
        <li>Buyer relationship</li>
        <li>Certification-based trust</li>
        <li>Process-driven organic</li>
        <li>Corporate feel</li>
      </ul>
    </div>`;

  stratHTML += `
    <div class="strat-col">
      <div class="strat-col-header">
        <div class="strat-col-icon" style="background:rgba(100,116,139,0.15);">🌾</div>
        <div class="strat-col-name" style="color:var(--phase1);">Two Brothers</div>
      </div>
      <ul class="strat-col-body">
        <li>D2C farm brand</li>
        <li>Buyer relationship</li>
        <li>Story-based trust</li>
        <li>Not daily-use</li>
        <li>Specialty focus</li>
      </ul>
    </div>`;

  stratHTML += `
    <div class="strat-col">
      <div class="strat-col-header">
        <div class="strat-col-icon" style="background:rgba(201,169,110,0.15);">✨</div>
        <div class="strat-col-name" style="color:var(--gold);">Purosatva</div>
      </div>
      <ul class="strat-col-body">
        <li>Ownership ecosystem</li>
        <li>Owner relationship</li>
        <li>Personal trust</li>
        <li>Emotional lock-in</li>
        <li>Experience + milk</li>
      </ul>
    </div>`;
  stratHTML += `</div>`;

  // Attack Cards
  let attacksHTML = ``;
  COMPETITOR_DATA.attacks.forEach(a => {
    attacksHTML += `<div class="attack-card">
      <div class="competitor">Attack on ${a.competitor}</div>
      <div class="weakness" style="color:var(--muted2);">Weakness: ${a.weakness}</div>
      <div class="attack-line">"${a.attack}"</div>
      <div style="margin-top:8px; font-size:12px; color:var(--muted2);">${a.approach}</div>
    </div>`;
  });

  // Common Pillars
  let pillarsHTML = ``;
  COMPETITOR_DATA.commonPillars.forEach(p => {
    pillarsHTML += `<div class="card" style="margin-bottom:10px;">
      <div style="font-size:14px; font-weight:600; color:var(--text); margin-bottom:6px;">${p.pillar}</div>
      <div style="font-size:13px; color:var(--muted2);">${p.examples}</div>
    </div>`;
  });

  // Final Positions
  let positionsHTML = ``;
  COMPETITOR_DATA.finalPositions.forEach(p => {
    const isPurosatva = p.brand === 'Purosatva';
    positionsHTML += `<div class="pos-item${isPurosatva ? ' purosatva' : ''}">
      <div class="brand" style="color:${isPurosatva ? 'var(--gold)' : 'var(--text)'};">${p.brand}</div>
      <div class="emotion" style="color:${isPurosatva ? 'var(--gold2)' : 'var(--muted2)'};">${p.position}</div>
    </div>`;
  });

  // Assemble the section | visible class added immediately since injected via JS (no IntersectionObserver)
  container.innerHTML = `
    <!-- Positioning Map -->
    <div class="comp-section-label visible">08 | Competitive Landscape</div>
    <h2 class="comp-section-title visible">Where Purosatva stands in the market</h2>
    <p class="comp-section-desc visible">Purosatva is not competing with Amul or Gokul. Its real battlefield is the organic farm-led lifestyle space. Here is how the positioning actually looks.</p>

    <div class="visible" style="margin-bottom:40px;">
      ${posMapHTML}
    </div>

    <!-- What Nobody Is Doing -->
    <div class="comp-section-label visible">09 | Market Opportunity</div>
    <h2 class="comp-section-title visible">What nobody in the market is doing</h2>
    <p class="comp-section-desc visible">While all competitors compete on health, supply chain, and freshness | Purosatva operates in an almost entirely uncontested space.</p>

    <div class="visible" style="margin-bottom:40px;">
      ${gapsHTML}
    </div>

    <div class="highlight visible" style="margin-bottom:40px;">
      <strong>True category:</strong> Purosatva is not entering dairy, organic milk, or premium packaged milk. It is creating <strong style="color:var(--gold2);">"Participatory Agriculture / Ownership-based Food System"</strong> | closest to CSA farm shares, vineyard ownership, or European cow-sharing models. In India: <strong style="color:var(--gold2);">almost entirely untapped.</strong>
    </div>

    <!-- Strategic Comparison -->
    <div class="comp-section-label visible">10 | Strategic Comparison</div>
    <h2 class="comp-section-title visible">Purosatva vs. real competitors</h2>

    <div class="visible" style="margin-bottom:40px;">
      ${stratHTML}
    </div>

    <!-- Competitor Weaknesses -->
    <div class="comp-section-label visible">11 | Competitive Attacks</div>
    <h2 class="comp-section-title visible">Where to attack. How to win.</h2>
    <p class="comp-section-desc visible">Each competitor has a structural weakness that Purosatva's model directly addresses. Here is how to use them.</p>

    <div class="visible" style="margin-bottom:40px;">
      ${attacksHTML}
    </div>

    <!-- Common Pillars (what everyone uses) -->
    <div class="comp-section-label visible">12 | Competitive Pattern</div>
    <h2 class="comp-section-title visible">What all competitors revolve around</h2>
    <p class="comp-section-desc visible">Every competitor in this space uses the same three pillars. Purosatva must use all three | but lead with ownership and emotion.</p>

    <div class="visible" style="margin-bottom:40px;">
      ${pillarsHTML}
    </div>

    <!-- Final Positioning -->
    <div class="comp-section-label visible">13 | Final Strategic Position</div>
    <h2 class="comp-section-title visible">Where each brand ends up</h2>

    <div class="pos-map visible">
      <div class="pos-map-header">Competitive Positioning | Final Map</div>
      <div class="pos-map-body">
        ${positionsHTML}
      </div>
    </div>

    <!-- Brutal Truth -->
    <div class="visible" style="margin-top:40px;">
      <div class="highlight" style="background:linear-gradient(120deg, rgba(232,124,94,0.12), rgba(232,124,94,0.04)); border-color:rgba(232,124,94,0.25);">
        <strong style="color:var(--coral);">The Brutal Truth </strong><br><br>
        <strong style="color:var(--gold2);">Purosatva will fail if it looks like:</strong><br>
        • Just another "organic milk brand"<br>
        • Positions on health or freshness alone<br>
        • Leads with price or product features<br><br>
        <strong style="color:var(--gold2);">Purosatva will win if it feels like:</strong><br>
        • "I own something real"<br>
        • "This is my farm"<br>
        • "This is my cow"
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderCompetitorSection);
