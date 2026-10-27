import React from 'react';
import LeadSimulatorApp from './components/LeadSimulatorApp';
import LinkedInIcon from './components/LinkedInIcon';
import { Zap, Play, Layers, MessageSquare } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen relative transition-colors duration-300">
      
      {/* Top Telemetry Header */}
      <div className="border-b border-[#EBE3D5] bg-[#FAF8F5]/90 backdrop-blur-md py-2.5 px-6 shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono-telemetry">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[#059669] font-bold uppercase tracking-wider text-[11px]">⚡ SYSTEM ACTIVE</span>
            <span className="text-[#CBD5E1] hidden sm:inline">•</span>
            <span className="text-[#64748B] hidden sm:inline text-[11px]">15s SPEED-TO-LEAD ENGINE</span>
            <span className="text-[#CBD5E1] hidden md:inline">•</span>
            <span className="text-[#0284C7] hidden md:inline text-[11px]">WHATSAPP &amp; TELEGRAM DISPATCH</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://jarvis.trackkaroai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#92400E] hover:text-[#78350F] font-bold flex items-center gap-1.5 transition-all px-3 py-1 rounded-full bg-amber-100/80 hover:bg-amber-200 border border-amber-300 text-[11px] shadow-xs"
              title="Launch TrackKaro Jarvis Autonomous AI Outbound SDR"
            >
              <Zap className="w-3 h-3 text-amber-600 fill-current" />
              <span>Jarvis AI SDR ↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#0A66C2] font-bold hidden sm:flex items-center gap-1.5 transition-colors text-[11px]"
              title="Mangal Soren on LinkedIn"
            >
              <LinkedInIcon className="w-3.5 h-3.5 fill-[#0A66C2]" />
              <span>MANGAL SOREN</span>
            </a>
            <a
              href="#demo-section"
              className="bg-[#18191B] hover:bg-black text-white font-bold px-3.5 py-1.5 rounded-full text-[11px] transition-all cursor-pointer shadow-xs"
            >
              Test Demo
            </a>
          </div>
        </div>
      </div>

      <main className="py-4 pb-24 md:pb-6">
        <LeadSimulatorApp />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#EBE3D5] py-8 text-center text-xs text-[#64748B] max-w-7xl mx-auto px-6 bg-[#FAF8F5]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-telemetry">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            <a
              href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#18191B] hover:text-[#0A66C2] flex items-center gap-1.5 transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5 fill-[#0A66C2]" />
              <span>MANGAL SOREN</span>
            </a>
            <span>• Lead Automation &amp; GTM Workflows</span>
          </div>
          <div className="text-[#18191B] font-bold bg-white px-3.5 py-1.5 rounded-full border border-[#DFD5C0] shadow-xs flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Automated 15s Lead Dispatch Workflows</span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Navigation Dock */}
      <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0E1015]/95 backdrop-blur-md border-t border-[#1E222D] px-4 py-2.5 shadow-2xl">
        <div className="flex items-center justify-between max-w-sm mx-auto font-mono-telemetry">
          <a
            href="#demo-section"
            className="flex flex-col items-center gap-1 text-[#3B82F6] hover:text-[#60A5FA] px-2 py-0.5 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold">Simulator</span>
          </a>

          <a
            href="#revenue-audit"
            className="flex flex-col items-center gap-1 text-[#94A3B8] hover:text-white px-2 py-0.5 transition-all"
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px] font-bold">Speed ROI</span>
          </a>

          <a
            href="#contact-form"
            className="flex flex-col items-center gap-1 text-[#94A3B8] hover:text-white px-2 py-0.5 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold">Book GTM</span>
          </a>

          <a
            href="https://wa.me/917979816557?text=Hi%20Mangal,%20I%20want%20to%20discuss%20a%20lead%20automation%20workflow%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
