import type { Metadata } from "next";
import { Inter, Cardo } from "next/font/google";
import "./globals.css";

// Living High brand fonts (from livinghigh.com.au): Inter for UI/body,
// Cardo (serif) for display headings.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cardo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Living High Inspections",
  description: "Property inspection reports for Living High managers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cardo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
