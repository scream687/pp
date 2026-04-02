"use client";

import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "var(--color-bg-primary)", borderTop: "1px solid var(--color-border-subtle)", padding: "56px 0 40px" }}
      role="contentinfo"
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto", padding: "0 24px" }}>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3C12 3 8 7 8 12C8 14.76 9.52 17.16 12 18C14.48 17.16 16 14.76 16 12C16 7 12 3 12 3Z" fill="#B8860B" opacity="0.9"/>
                  <path d="M3 12C3 12 7 8.5 12 8.5C12 8.5 8.5 12 8.5 17C8.5 17 5 15.5 3 12Z" fill="#C67C11" opacity="0.7"/>
                  <path d="M21 12C21 12 17 8.5 12 8.5C12 8.5 15.5 12 15.5 17C15.5 17 19 15.5 21 12Z" fill="#C67C11" opacity="0.7"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-text-primary)", letterSpacing: "-0.01em", lineHeight: 1 }}>Nidhivan</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.5625rem", color: "var(--color-text-tertiary)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>Property Linkers</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.65, color: "var(--color-text-secondary)", maxWidth: "28ch", marginBottom: "12px" }}>
              {BRAND.tagline} — premium real estate in the sacred land of Vrindavan since 2008.
            </p>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-tertiary)", lineHeight: 1.55 }}>
              {BRAND.address}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
              Navigate
            </div>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3" style={{ listStyle: "none" }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-text-secondary)", textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#0071E3")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")}
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
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
              Connect
            </div>
            <div className="flex flex-col gap-3">
              {[
                { href: `tel:${BRAND.phone}`, label: BRAND.phone },
                { href: `mailto:${BRAND.email}`, label: BRAND.email },
                { href: `https://wa.me/${BRAND.whatsapp}`, label: "WhatsApp", external: true },
              ].map(({ href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: external ? "#25D366" : "var(--color-text-secondary)", textDecoration: "none", transition: "color 0.2s ease" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--color-border-subtle)" }}
        >
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
            © {year} Nidhivan Property Linkers. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {["RERA Registered", "Privacy Policy", "Legal"].map((item) => (
              <span key={item} style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-muted)", cursor: "default" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
