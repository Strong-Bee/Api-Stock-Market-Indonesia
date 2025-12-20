import HeroSection from "@/components/HeroSection";
import MarketOverview from "@/components/MarketOverview";
import ApiFeatures from "@/components/ApiFeatures";
import ApiList from "@/components/ApiList";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-72 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <HeroSection />
        <MarketOverview />
        <ApiFeatures />
        <ApiList />
        <IntegrationShowcase />
        <CTA />
      </div>
    </div>
  );
}
