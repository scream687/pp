"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  isOverCanvas?: boolean;
}

const Navbar = memo(function Navbar({ isOverCanvas = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 30);
      if (y > lastScrollY.current + 8 && y > 100) setHidden(true);
      else if (y < lastScrollY.current - 4) setHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On canvas section: transparent with white text
  // Scrolled or off canvas: white frosted glass with dark text
  const onDark = isOverCanvas && !isScrolled;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%", opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ willChange: "transform, opacity" }}
      >
        <div
          style={{
            background: onDark
              ? "rgba(0,0,0,0)"
              : "rgba(255,255,255,0.85)",
            backdropFilter: onDark ? "none" : "blur(20px) saturate(180%)",
            WebkitBackdropFilter: onDark ? "none" : "blur(20px) saturate(180%)",
            borderBottom: onDark ? "1px solid transparent" : "1px solid rgba(0,0,0,0.08)",
            transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 md:px-10 lg:px-16"
            style={{ height: "52px", maxWidth: "var(--max-wide)", margin: "0 auto" }}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5" aria-label="Nidhivan Property Linkers">
              {/* Lotus mark */}
              <div
                className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  background: onDark ? "rgba(255,255,255,0.1)" : "rgba(184,134,11,0.08)",
                  border: `1px solid ${onDark ? "rgba(255,255,255,0.2)" : "rgba(184,134,11,0.2)"}`,
                }}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3C12 3 8 7 8 12C8 14.76 9.52 17.16 12 18C14.48 17.16 16 14.76 16 12C16 7 12 3 12 3Z"
                    fill={onDark ? "#E2C46B" : "#B8860B"} opacity="0.95" />
                  <path d="M3 12C3 12 7 8.5 12 8.5C12 8.5 8.5 12 8.5 17C8.5 17 5 15.5 3 12Z"
                    fill={onDark ? "#F4A520" : "#C67C11"} opacity="0.75" />
                  <path d="M21 12C21 12 17 8.5 12 8.5C12 8.5 15.5 12 15.5 17C15.5 17 19 15.5 21 12Z"
                    fill={onDark ? "#F4A520" : "#C67C11"} opacity="0.75" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: onDark ? "#F9F4EC" : "#1D1D1F",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  Nidhivan
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.5625rem",
                    color: onDark ? "rgba(249,244,236,0.55)" : "#86868B",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "1px",
                  }}
                >
                  Property Linkers
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: onDark ? "rgba(255,255,255,0.75)" : "#1D1D1F",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = onDark ? "#fff" : "#0071E3")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = onDark ? "rgba(255,255,255,0.75)" : "#1D1D1F")
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contact"
                className="btn-primary"
                style={{
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.875rem",
                  background: onDark ? "rgba(255,255,255,0.12)" : "#1D1D1F",
                  color: "#fff",
                  backdropFilter: onDark ? "blur(8px)" : "none",
                  border: onDark ? "1px solid rgba(255,255,255,0.2)" : "none",
                }}
              >
                Schedule a Visit
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="flex md:hidden flex-col justify-center gap-[5px] p-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px w-5 transition-all duration-300 origin-center"
                  style={{
                    background: onDark ? "#fff" : "#1D1D1F",
                    transform:
                      i === 0 && mobileOpen ? "rotate(45deg) translateY(6px)" :
                      i === 1 && mobileOpen ? "scaleX(0)" :
                      i === 2 && mobileOpen ? "rotate(-45deg) translateY(-6px)" :
                      "none",
                    opacity: i === 1 && mobileOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-9">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                    color: "#1D1D1F",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="btn-primary mt-2"
              >
                Schedule a Visit
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
