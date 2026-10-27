import React from 'react';
import { Zap, Cpu, MessageSquare, Bell, Database, CheckCircle2 } from 'lucide-react';

const NODES = [
  { id: 'n1', num: '1', title: 'Ad Ingestion', subtitle: 'Meta / Google / Portal Webhook', icon: Zap, badge: '⚡ INSTANT' },
  { id: 'n2', num: '2', title: 'Lead Validation', subtitle: 'Auto-format (+91/+971) & Region', icon: Cpu, badge: 'AUTO CLEAN' },
  { id: 'n3', num: '3', title: 'WhatsApp Dispatch', subtitle: 'Instant Brochure Delivery', icon: MessageSquare, badge: 'AUTO REPLY' },
  { id: 'n4', num: '4', title: 'Telegram Siren', subtitle: 'Sound Alert + 1-Click Call', icon: Bell, badge: 'REP ALERT' },
  { id: 'n5', num: '5', title: 'Google Sheets CRM', subtitle: '10-Col Structured Row Sync', icon: Database, badge: 'AUTO SYNC' },
];

export default function N8nCanvasFlow({ activeStep = 0, isExecuting = false }) {
  return (
    <div className="bg-white border border-[#EBE3D5] rounded-2xl p-5 sm:p-6 shadow-sm my-6 transition-all relative overflow-hidden">
      
      {/* Top Topology Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F3EFE6] gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isExecuting ? 'bg-[#D97706] animate-ping' : 'bg-[#10B981]'}`} />
          <span className="font-mono-telemetry text-xs font-bold uppercase tracking-wider text-[#18191B]">
            Pipeline Execution Graph ({isExecuting ? 'Processing...' : 'Active & Ready'})
          </span>
          <span className="text-[11px] font-mono-telemetry px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-semibold">
            Meta Ads • Google Webhooks • 99acres Parsers
          </span>
        </div>
        <div className="font-mono-telemetry text-xs text-[#7E8695] flex items-center gap-1.5">
          <span>Engine:</span>
          <span className="font-bold text-[#18191B] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EBE3D5]">
            Managed n8n Cloud Runtime
          </span>
        </div>
      </div>

      {/* Visual Canvas Nodes (Desktop Grid) */}
      <div className="hidden md:grid md:grid-cols-5 gap-3 pt-6 items-center relative z-10">
        {NODES.map((node, index) => {
          const nodeNum = index + 1;
          const isDone = activeStep >= nodeNum;
          const isCurrent = activeStep === nodeNum && isExecuting;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              className={`p-3.5 rounded-xl border transition-all relative ${
                isCurrent
                  ? 'bg-[#FEF3C7] border-[#D97706] shadow-md scale-[1.03]'
                  : isDone
                  ? 'bg-[#ECFDF5] border-[#10B981] shadow-xs'
                  : 'bg-[#FAF8F5] border-[#EBE3D5] hover:border-[#DFD5C0]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isCurrent
                    ? 'bg-[#D97706] text-white animate-pulse'
                    : isDone
                    ? 'bg-[#059669] text-white'
                    : 'bg-white border border-[#EBE3D5] text-[#18191B]'
                }`}>
                  {isDone && !isCurrent ? <CheckCircle2 className="w-4 h-4 text-white" /> : node.num}
                </div>
                <span className={`font-mono-telemetry text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isCurrent 
                    ? 'bg-[#D97706]/15 text-[#92400E] animate-pulse' 
                    : isDone 
                    ? 'bg-[#059669]/15 text-[#065F46]' 
                    : 'bg-white text-[#7E8695] border border-[#EBE3D5]'
                }`}>
                  {isCurrent ? 'Running...' : isDone ? 'Done ✓' : node.badge}
                </span>
              </div>
              <div className="font-bold text-xs text-[#18191B] truncate">{node.title}</div>
              <div className="font-mono-telemetry text-[10px] text-[#525866] truncate mt-0.5">{node.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Visual Canvas Nodes (Mobile Compact Micro-Stepper) */}
      <div className="block md:hidden pt-3 relative z-10">
        <div className="flex items-center justify-between relative px-2">
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#EBE3D5] rounded-full" />
          <div
            className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-[#059669] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(((activeStep || 1) - 1) / 4 * 100, 100))}%` }}
          />
          {NODES.map((node, index) => {
            const nodeNum = index + 1;
            const isDone = activeStep >= nodeNum;
            const isCurrent = activeStep === nodeNum && isExecuting;
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold font-mono-telemetry transition-all ${
                  isCurrent
                    ? 'bg-[#FEF3C7] border-[#D97706] text-[#D97706] scale-110 shadow-sm animate-pulse'
                    : isDone
                    ? 'bg-[#ECFDF5] border-[#10B981] text-[#059669]'
                    : 'bg-white border-[#EBE3D5] text-[#7E8695]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            );
          })}
        </div>

        {/* Current Active Stage Description Badge */}
        {(() => {
          const currentNode = NODES[Math.max(0, Math.min(activeStep ? activeStep - 1 : 0, 4))];
          const CurrentIcon = currentNode.icon;
          return (
            <div className={`mt-3.5 p-3 rounded-xl border flex items-center justify-between font-mono-telemetry ${
              isExecuting
                ? 'bg-[#FEF3C7]/80 border-[#D97706]'
                : 'bg-[#FAF8F5] border-[#EBE3D5]'
            }`}>
              <div className="flex items-center gap-2.5 truncate">
                <CurrentIcon className={`w-4 h-4 shrink-0 ${
                  isExecuting ? 'text-[#D97706] animate-pulse' : activeStep > 0 ? 'text-[#059669]' : 'text-[#7E8695]'
                }`} />
                <div className="truncate">
                  <div className="text-xs font-bold text-[#18191B] truncate">
                    {activeStep > 0 ? `Stage ${activeStep}: ${currentNode.title}` : 'Pipeline Ready: Tap Run Below'}
                  </div>
                  <div className="text-[10px] text-[#525866] truncate">
                    {activeStep > 0 ? currentNode.subtitle : 'Instant Webhook ➔ Telegram & WhatsApp routing'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                isExecuting
                  ? 'bg-[#D97706]/20 text-[#92400E]'
                  : activeStep > 0
                  ? 'bg-[#059669]/15 text-[#065F46]'
                  : 'bg-white text-[#7E8695] border border-[#EBE3D5]'
              }`}>
                {isExecuting ? 'Running...' : activeStep === 5 ? 'Done ✓' : 'Stage ' + (activeStep || 1)}
              </span>
            </div>
          );
        })()}
      </div>

      {/* Background Track Line for Desktop */}
      <div className="hidden md:block absolute top-[58%] left-8 right-8 -translate-y-1/2 z-0 pointer-events-none">
        <div className="h-0.5 w-full bg-[#EBE3D5]" />
      </div>
    </div>
  );
}
