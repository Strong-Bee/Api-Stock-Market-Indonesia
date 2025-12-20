import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "QuantumStock API | Platform Data Saham Terdepan",
  description:
    "API data saham real-time, historis, dan analisis teknikal untuk aplikasi keuangan modern. Enterprise-grade reliability.",
  keywords: [
    "saham",
    "API",
    "data finansial",
    "real-time",
    "analisis teknikal",
    "trading",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "QuantumStock API",
    description: "Platform API saham terdepan untuk aplikasi keuangan modern",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 -z-10" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />

        <Header />

        <main className="relative z-10">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
