import { Toaster } from "@/components/ui/sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { EmailAnalyzer } from "@/components/EmailAnalyzer";
import { motion } from "framer-motion";
import { Github, Shield, Terminal, Zap } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans">
      <CyberBackground />
      <Toaster position="top-center" theme="dark" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tighter text-lg uppercase">Phish<span className="text-cyan-500">Ghost</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Analyzer</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Heuristics</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Protocols</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 relative">
        <EmailAnalyzer />

        {/* Feature Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-500">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Header Inspection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our engine parses complex RFC 5322 headers to identify SPF, DKIM, and DMARC alignment failures in real-time.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Neural Linguistics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Advanced NLP patterns detect urgency, psychological manipulation, and fraudulent semantic structures.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Reputation Guard</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automatic cross-referencing against known phishing databases and suspicious sender reputation lists.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
              <Shield className="w-3 h-3 text-cyan-500" />
            </div>
            <span className="font-bold tracking-tighter text-sm uppercase">PhishGhost AI</span>
          </div>
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Ghost Phish Neural Defense Systems. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;