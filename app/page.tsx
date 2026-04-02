import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

/**
 * ScrollContainer is lazily loaded — it contains canvas + framer-motion logic
 * that requires client-side APIs. SSR renders nothing for this component.
 * This prevents hydration mismatches and improves initial page load.
 */
const ScrollContainer = dynamic(
  () => import("@/components/ScrollContainer"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          background: "radial-gradient(ellipse 120% 80% at 50% 60%, #1C2848 0%, #0A0E1A 45%, #050810 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Loading experience"
      >
        <div
          style={{
            width: "2px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--color-gold), transparent)",
            animation: "float 1.5s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      </div>
    ),
  }
);

/**
 * Root page — the complete Nidhivan Property Linkers experience.
 *
 * Scroll narrative:
 *   1. ScrollContainer (500vh) — cinematic canvas + overlay sections
 *   2. Stats — credibility + trust numbers
 *   3. Projects — property listings grid
 *   4. Testimonials — social proof
 *   5. CTASection — conversion layer (form + contact)
 *   6. Footer
 */
export default function Home() {
  return (
    <main>
      {/* Navigation — always on top */}
      <Navbar isOverCanvas={true} />

      {/* ── ACT 1: The Cinematic Scroll Experience ── */}
      <ScrollContainer />

      {/* ── ACT 2: Trust & Credibility ── */}
      <Stats />

      {/* ── ACT 3: The Portfolio ── */}
      <Projects />

      {/* ── ACT 4: Social Proof ── */}
      <Testimonials />

      {/* ── ACT 5: Conversion ── */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
