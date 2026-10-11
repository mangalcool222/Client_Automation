import React from 'react';
import LeadSimulatorApp from './components/LeadSimulatorApp';
import { Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen relative transition-colors duration-300">
      
      {/* Top Telemetry Header */}
      <div className="border-b border-[#1E222D] bg-[#0E1015] py-2 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono-telemetry">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[#10B981] font-bold uppercase tracking-wider">SYSTEM STATUS: SIMULATION ACTIVE</span>
            <span className="text-[#64748B] hidden sm:inline">•</span>
            <span className="text-[#767E8F] hidden sm:inline">FULLY MANAGED CLOUD ENGINE</span>
            <span className="text-[#64748B] hidden md:inline">•</span>
            <span className="text-[#3B82F6] hidden md:inline">SECURE DISPATCH PIPELINE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#94A3B8] font-bold hidden sm:inline">MANGAL SOREN</span>
            <a
              href="#demo-section"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold px-3 py-1 rounded text-[11px] transition-all cursor-pointer shadow-sm"
            >
              Test Pipeline Demo
            </a>
          </div>
        </div>
      </div>

      <main className="py-4">
        <LeadSimulatorApp />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#1E222D] py-6 text-center text-xs text-[#64748B] max-w-7xl mx-auto px-6 bg-[#0E1015] rounded">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-telemetry">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span className="font-bold text-[#F1F3F7]">MANGAL SOREN</span> • Lead Automation &amp; GTM Workflows
          </div>
          <div className="text-[#3B82F6] font-bold bg-[#141720] px-3 py-1 rounded border border-[#1E222D] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Automated Lead Dispatch Workflows</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
