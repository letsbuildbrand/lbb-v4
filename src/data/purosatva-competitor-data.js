export const COMPETITOR_DATA = {
  posMap: [
    { brand: "Two Brothers", category: "Organic Food", emotion: "Tradition", model: "D2C Farm Brand", trust: "Story", expandability: "High", isPurosatva: false },
    { brand: "Akshayakalpa", category: "Organic Milk", emotion: "Health", model: "Farmer Network", trust: "Process", expandability: "High", isPurosatva: false },
    { brand: "Country Delight", category: "Fresh Milk", emotion: "Convenience", model: "Subscription", trust: "Delivery", expandability: "Medium", isPurosatva: false },
    { brand: "Ambrosia", category: "Organic Ecosystem", emotion: "Purity", model: "Farming Network", trust: "Legacy", expandability: "High", isPurosatva: false },
    { brand: "Local A2 Brands", category: "A2 Milk", emotion: "Health", model: "Direct Supply", trust: "Claims", expandability: "Low", isPurosatva: false },
    { brand: "Purosatva", category: "Ownership Ecosystem", emotion: "Belonging", model: "Cow Ownership", trust: "Personal", expandability: "Selective", isPurosatva: true }
  ],
  marketGaps: [
    { factor: "Ownership", market: false, purosatva: true, icon: "🏠" },
    { factor: "Emotional Bonding", market: false, purosatva: true, icon: "💛" },
    { factor: "Farm Interaction", market: false, purosatva: true, icon: "🚜" },
    { factor: "Asset-backed Consumption", market: false, purosatva: true, icon: "📜" },
    { factor: "Community", market: false, purosatva: true, icon: "👨‍👩‍👧‍👦" }
  ],
  attacks: [
    { competitor: "Akshayakalpa", weakness: "Feels corporate organic. No emotional attachment. The cow is a process, not a relationship.", attack: '"You don\'t know your cow."', approach: "Position Purosatva as the opposite: you know your cow, you visit your cow, your cow has a name." },
    { competitor: "Two Brothers", weakness: "Not daily-use milk. Not habit forming. A specialty purchase, not a lifestyle.", attack: '"We are part of your daily life."', approach: "Show the daily ritual of Purosatva milk delivery. Make it a morning habit, not a special occasion." },
    { competitor: "Country Delight", weakness: "Transactional. Replaceable. Convenient but forgettable. No deeper meaning.", attack: '"We are not delivery. We are belonging."', approach: "Purosatva is not competing on convenience. It is replacing the entire mental model of what milk delivery means." }
  ],
  commonPillars: [
    { pillar: "Health", examples: "Organic, A2, Chemical-free, Antibiotic-free" },
    { pillar: "Supply Chain Story", examples: "Farm sourcing, Farmer empowerment, Transparent sourcing" },
    { pillar: "Freshness", examples: "Direct delivery, Minimal processing, Farm to home in 48 hours" }
  ],
  finalPositions: [
    { brand: "Akshayakalpa", position: "Trusted organic milk" },
    { brand: "Two Brothers", position: "Authentic organic food" },
    { brand: "Country Delight", position: "Convenient milk" },
    { brand: "Purosatva", position: "Emotional + ownership-based purity ecosystem" }
  ],
  brutalTruth: {
    willFailIf: ["Looks like just another organic milk brand", "Positions on health or freshness alone", "Leads with price or product features"],
    willWinIf: ['"I own something real"', '"This is my farm"', '"This is my cow"']
  }
};

export function renderCompetitorSection() {
  // This is used by the React component to render innerHTML
}
