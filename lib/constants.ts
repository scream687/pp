// ═══════════════════════════════════════════════
// NIDHIVAN PROPERTY LINKERS — SITE CONSTANTS
// ═══════════════════════════════════════════════

// ── Canvas Sequence ──────────────────────────────
/**
 * Total frames in the scroll-driven image sequence.
 * Place frames as /public/sequence/frame-001.jpg through frame-XXX.jpg
 * Recommended: 120 frames at 1920×1080, JPEG quality 70–75%
 */
export const SEQUENCE_FRAME_COUNT = 120;

/**
 * URL pattern for sequence frames (1-indexed, zero-padded to 3 digits)
 */
export const getFrameUrl = (index: number): string => {
  const padded = String(index + 1).padStart(3, "0");
  return `/sequence/frame-${padded}.jpg`;
};

// ── Scroll Phases (0–1 normalized) ───────────────
/**
 * Defines when each overlay section is visible.
 * Each phase: { enter, peak, exit }
 * - enter: when opacity starts rising
 * - peak: when opacity is 1 (or element fully revealed)
 * - exit: when opacity starts falling
 */
export const SCROLL_PHASES = {
  hero: { enter: 0, peak: 0.02, exit: 0.15 },
  chapter1: { enter: 0.1, peak: 0.2, exit: 0.33 },
  chapter2: { enter: 0.28, peak: 0.38, exit: 0.52 },
  chapter3: { enter: 0.47, peak: 0.57, exit: 0.72 },
  chapter4: { enter: 0.67, peak: 0.77, exit: 0.9 },
  chapter5: { enter: 0.85, peak: 0.92, exit: 1.0 },
} as const;

// ── Brand Content ─────────────────────────────────
export const BRAND = {
  name: "Nidhivan Property Linkers",
  tagline: "Where Devotion Becomes Legacy",
  subTagline: "Premium Properties in the Sacred Land of Vrindavan",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "connect@nidhivanproperty.com",
  address: "Vrindavan, Mathura District, Uttar Pradesh – 281121",
  founded: "2008",
  yearsOfExperience: 16,
  propertiesSold: 847,
  totalCrores: "₹420+ Cr",
  clientSatisfaction: "98%",
} as const;

// ── Navigation ────────────────────────────────────
export const NAV_LINKS = [
  { label: "Properties", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Projects ──────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  area: string;
  status: "Available" | "Sold Out" | "Coming Soon";
  highlight: string;
  tag?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "vrindavan-villa-1",
    name: "Nidhivan Villa Estate",
    category: "Luxury Villa",
    location: "Parikrama Marg, Vrindavan",
    price: "₹2.8 Cr – ₹4.5 Cr",
    area: "2,400 – 3,800 sq.ft.",
    status: "Available",
    highlight: "240° view of Yamuna river with private puja room",
    tag: "Premium",
  },
  {
    id: "govardhan-retreat",
    name: "Govardhan Retreat",
    category: "Spiritual Farmhouse",
    location: "Govardhan, 15km from Vrindavan",
    price: "₹85 L – ₹1.6 Cr",
    area: "1,200 – 2,100 sq.ft.",
    status: "Available",
    highlight: "Adjacent to Govardhan Hill, ideal for retreat center",
    tag: "New Launch",
  },
  {
    id: "radha-kunj-apartments",
    name: "Radha Kunj Residences",
    category: "Premium Apartment",
    location: "Raman Reti, Vrindavan",
    price: "₹45 L – ₹90 L",
    area: "680 – 1,400 sq.ft.",
    status: "Available",
    highlight: "Temple-facing, 24/7 security, divine community living",
    tag: "High Demand",
  },
  {
    id: "vrindavan-plots",
    name: "Sacred Grove Plots",
    category: "Residential Plot",
    location: "Mathura–Vrindavan Corridor",
    price: "₹28 L – ₹75 L",
    area: "1,500 – 4,000 sq.yd.",
    status: "Available",
    highlight: "RERA approved, clear title, 12-year appreciation record",
    tag: "RERA Approved",
  },
  {
    id: "nri-investment",
    name: "NRI Investment Portfolio",
    category: "Investment Bundle",
    location: "Multiple Locations",
    price: "Starting $50,000",
    area: "Managed Portfolio",
    status: "Available",
    highlight: "Curated spiritual properties with 10–14% annual yield",
    tag: "NRI Special",
  },
  {
    id: "krishna-dham",
    name: "Krishna Dham Villas",
    category: "Luxury Villa",
    location: "Vrindavan – NH 2 Bypass",
    price: "₹3.2 Cr – ₹6 Cr",
    area: "3,200 – 5,500 sq.ft.",
    status: "Coming Soon",
    highlight: "Ultra-luxury gated community with vedic architecture",
    tag: "Pre-launch",
  },
];

// ── Testimonials ──────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  propertyBought: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Suresh Agarwal",
    location: "Ahmedabad, Gujarat",
    quote:
      "After years of searching, Nidhivan helped us find our dream home just 200 meters from the Banke Bihari temple. The process was completely transparent — title verification, legal checks, everything handled with utmost integrity.",
    propertyBought: "Radha Kunj Residence",
  },
  {
    id: "t2",
    name: "Dr. Kavita Sharma",
    location: "Chicago, USA (NRI)",
    quote:
      "As an NRI, trust was my biggest concern. Nidhivan's team managed every step remotely — from site visits to registration — and kept me updated throughout. My Vrindavan home is now my spiritual anchor.",
    propertyBought: "Nidhivan Villa Estate",
  },
  {
    id: "t3",
    name: "Ramesh & Sunita Joshi",
    location: "Jaipur, Rajasthan",
    quote:
      "We purchased a plot 6 years ago. Today its value has tripled. But more than the financial gain, having land in the land of Krishna gives us a peace that no investment can replicate.",
    propertyBought: "Sacred Grove Plot",
  },
  {
    id: "t4",
    name: "Vinod Bansal",
    location: "Mumbai, Maharashtra",
    quote:
      "The team genuinely cares. They guided us away from a problematic property and toward a better one — even when it was a lower-value deal for them. That kind of integrity is rare in real estate.",
    propertyBought: "Govardhan Retreat",
  },
];

// ── Stats ─────────────────────────────────────────
export const STATS = [
  { value: "16+", label: "Years in Vrindavan Real Estate" },
  { value: "847+", label: "Families Settled" },
  { value: "₹420 Cr+", label: "In Successful Transactions" },
  { value: "98%", label: "Client Satisfaction Score" },
] as const;

// ── Overlay Sections (Scroll Narrative) ───────────
export const OVERLAY_SECTIONS = [
  {
    id: "hero",
    phase: "hero",
    headline: "Your Eternal Address\nBegins Here",
    subtext: "Sacred land. Premium living. Timeless legacy.",
    alignment: "center" as const,
    badge: "VRINDAVAN · EST. 2008",
  },
  {
    id: "chapter1",
    phase: "chapter1",
    headline: "The Land That\nCalls You Home",
    subtext:
      "5,000 years of spiritual history meet modern sanctuary — where every sunrise is a blessing and every address is sacred.",
    alignment: "left" as const,
    badge: "SACRED GEOGRAPHY",
  },
  {
    id: "chapter2",
    phase: "chapter2",
    headline: "Curated for\nThose Who Know",
    subtext:
      "Not every property in Vrindavan is worthy of your family's legacy. We select only what meets our standard of sanctity, legality, and lasting value.",
    alignment: "right" as const,
    badge: "PREMIUM CURATION",
  },
  {
    id: "chapter3",
    phase: "chapter3",
    headline: "16 Years.\n847 Families.\nOne Promise.",
    subtext:
      "Full title verification. RERA compliance. Transparent pricing. We have never compromised on integrity — and never will.",
    alignment: "center" as const,
    badge: "TRUSTED SINCE 2008",
  },
  {
    id: "chapter4",
    phase: "chapter4",
    headline: "An Investment\nIn Two Lifetimes",
    subtext:
      "Vrindavan property has appreciated 12–18% annually for the past decade. Your spiritual home is also your most intelligent financial decision.",
    alignment: "left" as const,
    badge: "FINANCIAL WISDOM",
  },
  {
    id: "chapter5",
    phase: "chapter5",
    headline: "Your Journey\nStarts Today",
    subtext:
      "Speak with our advisors. No obligation. Pure guidance.",
    alignment: "center" as const,
    badge: "BEGIN YOUR SEARCH",
  },
] as const;
