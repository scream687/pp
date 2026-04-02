"use client";

import { useState, useEffect, useRef, memo } from "react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  /** Whether the canvas section is active (for transparent styling) */
  isOverCanvas?: boolean;
}

const Navbar = memo(function Navbar({ isOverCanvas = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      // Hide nav on scroll down, show on scroll up
      if (y > lastScrollY.current + 8 && y > 120) {
        setHidden(true);
      } else if (y < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg =
    isScrolled || !isOverCanvas
      ? "rgba(5,8,16,0.92)"
      : "transparent";

  const borderColor =
    isScrolled
      ? "rgba(201,168,76,0.1)"
      : "transparent";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          y: hidden ? "-100%" : "0%",
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ willChange: "transform, opacity" }}
      >
        <div
          className="transition-all duration-500"
          style={{
            background: navBg,
            borderBottom: `1px solid ${borderColor}`,
            backdropFilter: isScrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
          }}
        >
          <div
            className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-16"
            style={{ maxWidth: "var(--max-wide)", margin: "0 auto" }}
          >
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group"
              aria-label="Nidhivan Property Linkers"
            >
              {/* Lotus mark */}
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3C12 3 8 7 8 12C8 14.76 9.52 17.16 12 18C14.48 17.16 16 14.76 16 12C16 7 12 3 12 3Z"
                    fill="var(--color-gold)"
                    opacity="0.9"
                  />
                  <path
                    d="M3 12C3 12 7 8.5 12 8.5C12 8.5 8.5 12 8.5 17C8.5 17 5 15.5 3 12Z"
                    fill="var(--color-saffron)"
                    opacity="0.7"
                  />
                  <path
                    d="M21 12C21 12 17 8.5 12 8.5C12 8.5 15.5 12 15.5 17C15.5 17 19 15.5 21 12Z"
                    fill="var(--color-saffron)"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <div>
                <div
                  className="font-display font-semibold leading-none"
                  style={{
                    fontSize: "1.0625rem",
                    color: "var(--color-lotus)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Nidhivan
                </div>
                <div
                  className="font-body"
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--color-gold)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "1px",
                  }}
                >
                  Property Linkers
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body transition-colors duration-200"
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-secondary)",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "var(--color-gold-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "var(--color-text-secondary)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="font-body transition-colors duration-200"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.01em",
                }}
              >
                {BRAND.phone}
              </a>
              <a
                href="#contact"
                className="btn-primary"
              >
                <span>Schedule a Visit</span>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="flex md:hidden flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--color-lotus)",
                  transformOrigin: "center",
                  transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none",
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--color-lotus)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--color-lotus)",
                  transformOrigin: "center",
                  transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(5,8,16,0.97)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                    color: "var(--color-lotus)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="btn-primary mt-4"
              >
                <span>Schedule a Visit</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
