"use client";

import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 md:py-20"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-divider)",
      }}
      role="contentinfo"
    >
      <div
        className="px-6 md:px-12 lg:px-16"
        style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                  className="font-display font-semibold"
                  style={{ fontSize: "1rem", color: "var(--color-lotus)", letterSpacing: "-0.01em" }}
                >
                  Nidhivan
                </div>
                <div
                  className="font-body"
                  style={{ fontSize: "0.625rem", color: "var(--color-gold)", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Property Linkers
                </div>
              </div>
            </div>
            <p
              className="font-body mb-5"
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "var(--color-text-muted)",
                maxWidth: "28ch",
              }}
            >
              {BRAND.tagline} — premium real estate in the sacred land of Vrindavan since 2008.
            </p>
            <div
              className="font-body"
              style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}
            >
              {BRAND.address}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="font-body text-caption tracking-[0.1em] uppercase mb-5"
              style={{ color: "var(--color-gold)" }}
            >
              Navigate
            </div>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body transition-colors duration-200"
                      style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--color-gold-light)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div
              className="font-body text-caption tracking-[0.1em] uppercase mb-5"
              style={{ color: "var(--color-gold)" }}
            >
              Connect
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="font-body transition-colors duration-200"
                style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="font-body transition-colors duration-200"
                style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}
              >
                {BRAND.email}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body transition-colors duration-200"
                style={{ fontSize: "0.9375rem", color: "#25D366" }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--color-divider)" }}
        >
          <div
            className="font-body"
            style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}
          >
            © {currentYear} Nidhivan Property Linkers. All rights reserved.
          </div>
          <div
            className="font-body"
            style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}
          >
            RERA Registered · Legal · Privacy
          </div>
        </div>
      </div>
    </footer>
  );
}
