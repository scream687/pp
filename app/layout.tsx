import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Nidhivan Property Linkers — Sacred Land, Premium Living | Vrindavan",
  description:
    "Premium properties in Vrindavan & Mathura. 16+ years of trusted real estate guidance for families seeking their sacred address. Villas, apartments, plots & NRI investments.",
  keywords: [
    "Vrindavan property",
    "Vrindavan real estate",
    "buy property in Vrindavan",
    "Mathura property",
    "spiritual real estate India",
    "NRI property Vrindavan",
    "luxury villa Vrindavan",
  ],
  authors: [{ name: "Nidhivan Property Linkers" }],
  openGraph: {
    title: "Nidhivan Property Linkers — Your Sacred Address in Vrindavan",
    description:
      "Where devotion becomes legacy. Premium RERA-verified properties in the land of Krishna.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050810",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
