"use client";

import { Code2, Terminal, Cpu, Zap, GitBranch, Cloud } from "lucide-react";

const IntegrationShowcase = () => {
  const technologies = [
    {
      name: "Python",
      icon: "🐍",
      color: "from-amber-500/20 to-yellow-500/20",
      border: "border-amber-500/30",
    },
    {
      name: "JavaScript",
      icon: "⚡",
      color: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/30",
    },
    {
      name: "Node.js",
      icon: "🟢",
      color: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/30",
    },
    {
      name: "Go",
      icon: "🚀",
      color: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/30",
    },
    {
      name: "Java",
      icon: "☕",
      color: "from-red-500/20 to-orange-500/20",
      border: "border-red-500/30",
    },
    {
      name: "Rust",
      icon: "🦀",
      color: "from-orange-500/20 to-amber-500/20",
      border: "border-orange-500/30",
    },
  ];

  const codeSamples = [
    {
      language: "python",
      title: "Real-time Streaming",
      code: `from quantumstock import QuantumStock

client = QuantumStock(api_key="your_key")
stream = client.websocket.subscribe(["BBCA.JK", "TLKM.JK"])

async for quote in stream:
    print(f"{quote.symbol}: {quote.price}")
    # Process real-time data`,
    },
    {
      language: "javascript",
      title: "Historical Data",
      code: `import { QuantumStock } from '@quantumstock/sdk';

const client = new QuantumStock({ apiKey: 'your_key' });

const historical = await client.historical.get({
  symbol: 'BBCA.JK',
  interval: '1d',
  start: '2024-01-01',
  end: '2024-03-15'
});

console.log(historical);`,
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Easy <span className="gradient-text">Integration</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Dengan SDK untuk berbagai bahasa pemrograman dan dokumentasi yang
          lengkap, integrasi API kami hanya membutuhkan beberapa menit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Code Samples */}
        <div className="space-y-6">
          {codeSamples.map((sample, idx) => (
            <div key={idx} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{sample.title}</h3>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-sm font-mono">
                  {sample.language}
                </span>
              </div>
              <div className="code-block">
                <pre className="text-sm font-mono">{sample.code}</pre>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">
              Supported Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl bg-gradient-to-br ${tech.color} border ${tech.border} text-center group hover:scale-105 transition-transform duration-300`}
                >
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className="font-semibold">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">Developer Tools</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <Terminal className="h-8 w-8 text-cyan-400 mr-4" />
                <div>
                  <div className="font-semibold">API Playground</div>
                  <div className="text-sm text-slate-400">
                    Test endpoints directly in browser
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <GitBranch className="h-8 w-8 text-emerald-400 mr-4" />
                <div>
                  <div className="font-semibold">Postman Collection</div>
                  <div className="text-sm text-slate-400">
                    Ready-to-use API collection
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <Cloud className="h-8 w-8 text-purple-400 mr-4" />
                <div>
                  <div className="font-semibold">Webhook Builder</div>
                  <div className="text-sm text-slate-400">
                    Configure real-time notifications
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationShowcase;
