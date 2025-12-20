import {
  Terminal,
  Twitter,
  Github,
  Linkedin,
  MessageSquare,
} from "lucide-react";

const Footer = () => {
  const links = {
    Product: [
      "API Documentation",
      "Features",
      "Pricing",
      "Changelog",
      "Status",
    ],
    Developers: [
      "Getting Started",
      "API Reference",
      "SDKs & Libraries",
      "Examples",
      "Support",
    ],
    Company: ["About", "Blog", "Careers", "Security", "Contact"],
    Legal: [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Policy",
      "Acceptable Use",
      "Compliance",
    ],
  };

  return (
    <footer className="relative border-t border-slate-800 mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  QuantumStock
                </div>
                <div className="text-sm text-slate-400 font-mono">API v2.1</div>
              </div>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Enterprise-grade stock data API for modern financial applications.
              Real-time, historical, and analytical data for traders, fintech,
              and investors.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Twitter className="h-5 w-5 text-slate-400" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Github className="h-5 w-5 text-slate-400" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Linkedin className="h-5 w-5 text-slate-400" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-sm text-slate-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} QuantumStock API. All rights
              reserved.
              <span className="ml-4 text-slate-500">
                Data provided by IDX, NYSE, NASDAQ, and other major exchanges.
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                All systems operational
              </span>
              <span className="text-slate-500">•</span>
              <a href="#" className="hover:text-cyan-400">
                Security
              </a>
              <span className="text-slate-500">•</span>
              <a href="#" className="hover:text-cyan-400">
                Privacy
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            <p className="mb-2">
              Disclaimer: Market data is provided for informational purposes
              only. Past performance is not indicative of future results.
              Trading involves risk including the potential loss of principal.
            </p>
            <p>
              QuantumStock API is not a broker-dealer, investment advisor, or
              exchange. We provide technology infrastructure for accessing
              market data.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
