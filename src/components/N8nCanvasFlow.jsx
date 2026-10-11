import React from 'react';
import { Zap, Cpu, MessageSquare, Bell, Database } from 'lucide-react';

const NODES = [
  { id: 'n1', title: 'Webhook Ingest', subtitle: 'HTTP Inbound Endpoint', icon: Zap, time: 'STAGE 1' },
  { id: 'n2', title: 'Lead Validation', subtitle: 'Auto-format Phone (+91/+971) & Region', icon: Cpu, time: 'STAGE 2' },
  { id: 'n3', title: 'WhatsApp Integration', subtitle: 'Brochure Auto-Reply (Configurable)', icon: MessageSquare, time: 'STAGE 3' },
  { id: 'n4', title: 'Telegram Alert', subtitle: 'Instant Team Sound Alert', icon: Bell, time: 'STAGE 4' },
  { id: 'n5', title: 'Google Sheets CRM', subtitle: 'Structured Lead Row Append', icon: Database, time: 'STAGE 5' },
];

export default function N8nCanvasFlow({ activeStep = 0, isExecuting = false, themeMode = 'dark' }) {
  const isLight = themeMode === 'light';

  return (
    <div className={`telemetry-card p-5 relative overflow-hidden my-6 transition-all ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E1015] border-[#1E222D]'}`}>
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-2 ${isLight ? 'border-[#E2E8F0]' : 'border-[#1E222D]'}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-[#F59E0B] animate-ping' : 'bg-[#059669]'}`}></span>
          <span className={`font-mono-telemetry text-xs uppercase tracking-wider ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            Topology: Pipeline Execution Graph ({isExecuting ? 'Processing' : 'Active'})
          </span>
        </div>
        <div className={`font-mono-telemetry text-[11px] ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
          Engine: Managed Cloud Workflow Runtime
        </div>
      </div>

      {/* Visual Canvas Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-6 items-center relative z-10">
        {NODES.map((node, index) => {
          const nodeNum = index + 1;
          const isDone = activeStep >= nodeNum;
          const isCurrent = activeStep === nodeNum && isExecuting;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              className={`p-3 rounded border transition-all ${
                isCurrent
                  ? isLight ? 'bg-[#FEF3C7] border-[#D97706] shadow-sm' : 'bg-[#181510] border-[#F59E0B] shadow-md'
                  : isDone
                  ? isLight ? 'bg-[#ECFDF5] border-[#10B981]' : 'bg-[#12161F] border-[#10B981]/50'
                  : isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0E1015] border-[#1E222D]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#D97706] animate-pulse' : isDone ? 'text-[#059669]' : 'text-[#64748B]'}`} />
                <span className={`font-mono-telemetry text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isCurrent 
                    ? isLight ? 'bg-[#D97706]/15 text-[#D97706] animate-pulse' : 'bg-[#F59E0B]/20 text-[#F59E0B] animate-pulse' 
                    : isDone 
                    ? isLight ? 'bg-[#059669]/15 text-[#059669]' : 'bg-[#10B981]/15 text-[#10B981]' 
                    : isLight ? 'bg-[#E2E8F0] text-[#64748B]' : 'bg-[#1E222D] text-[#64748B]'
                }`}>
                  {isCurrent ? 'BUS ACTIVE' : isDone ? node.time : 'IDLE'}
                </span>
              </div>
              <div className={`font-semibold text-xs truncate ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>{node.title}</div>
              <div className={`font-mono-telemetry text-[10px] truncate mt-0.5 ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>{node.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* SVG Circuit Connectors */}
      <div className="hidden md:block absolute top-[62%] left-0 right-0 -translate-y-1/2 z-0 px-10 pointer-events-none">
        <svg className="w-full h-4" preserveAspectRatio="none">
          <line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke={isLight ? "#E2E8F0" : "#1E222D"}
            strokeWidth="2"
          />
          {(isExecuting || activeStep > 0) && (
            <line
              x1="0%"
              y1="50%"
              x2={isExecuting ? `${Math.min(activeStep * 20, 100)}%` : "100%"}
              y2="50%"
              stroke={isLight ? "#0284C7" : "#3B82F6"}
              strokeWidth="2"
              className="active-data-bus"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
