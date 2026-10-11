import React, { useState } from 'react';
import { Terminal, Code, Check, Copy } from 'lucide-react';

export default function TelemetryDrawer({ logs = [], formData = {}, currencyMode = 'USD', themeMode = 'dark' }) {
  const [activeTab, setActiveTab] = useState('stdout');
  const [copied, setCopied] = useState(false);
  const isLight = themeMode === 'light';

  const rawJsonPayload = {
    event: "lead_inbound_simulation",
    timestamp: new Date().toISOString(),
    prospect: {
      name: formData.name || "Alexander Wright (Sample Lead)",
      phone: formData.phone || "+971 50 000 9999",
      email: formData.email || "alexander.sample@example.com",
      project_enquiry: formData.project || "Dubai Marina Luxury Off-Plan Penthouse",
      budget: currencyMode === 'USD' ? (formData.budgetUSD || "$850,000 - $1.5M") : (formData.budgetINR || "₹7.0 Cr - ₹12.5 Cr")
    },
    routing_architecture: {
      ingest_node: "n8n_webhook_receiver",
      sales_alert_target: "Telegram_Team_Channel",
      crm_destination: "Google_Sheets_CRM",
      messaging_module: "WhatsApp_Business_API (Configurable)"
    },
    simulation_status: {
      mode: "Interactive_On_Screen_Simulation",
      workflow_valid: true
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rawJsonPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`telemetry-card overflow-hidden transition-all ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E1015] border-[#1E222D]'}`}>
      {/* Drawer Header Bar */}
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#12151E] border-[#1E222D]'}`}>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('stdout')}
            className={`px-3 py-1 rounded text-xs font-mono-telemetry flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'stdout'
                ? isLight ? 'bg-white text-[#0F172A] font-bold border border-[#E2E8F0] shadow-sm' : 'bg-[#1E222D] text-[#F1F3F7] font-bold border border-[#2E3648]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Terminal className={`w-3.5 h-3.5 ${isLight ? 'text-[#059669]' : 'text-[#10B981]'}`} />
            <span>Live Lead Activity Stream</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isLight ? 'bg-[#059669]/15 text-[#059669]' : 'bg-[#10B981]/20 text-[#10B981]'}`}>REAL-TIME</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1 rounded text-xs font-mono-telemetry flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'json'
                ? isLight ? 'bg-white text-[#0F172A] font-bold border border-[#E2E8F0] shadow-sm' : 'bg-[#1E222D] text-[#F1F3F7] font-bold border border-[#2E3648]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Code className={`w-3.5 h-3.5 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
            <span>Developer View (Raw Payload Data)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'json' && (
            <button
              onClick={handleCopyJson}
              className={`text-[10px] font-mono-telemetry flex items-center gap-1 px-2.5 py-1 rounded border cursor-pointer ${
                isLight ? 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]' : 'bg-[#1E222D] text-[#94A3B8] border-[#2E3648] hover:text-white'
              }`}
            >
              {copied ? <Check className={`w-3 h-3 ${isLight ? 'text-[#059669]' : 'text-[#10B981]'}`} /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          )}
          <span className="font-mono-telemetry text-[10px] text-[#64748B] hidden sm:inline">Real-Time Ingest Engine</span>
        </div>
      </div>

      {/* Tab Content Body */}
      <div className={`p-4 font-mono-telemetry text-xs min-h-[160px] max-h-[220px] overflow-y-auto ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#08090C]'}`}>
        {activeTab === 'stdout' ? (
          <div className="space-y-1.5">
            {logs.length === 0 ? (
              <div className="text-[#64748B] text-center py-10 font-mono-telemetry">
                Ready for ingest. Click "Run Sample Demo" above to capture live lead activity stream...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`leading-relaxed flex items-start gap-2 ${isLight ? 'text-[#059669]' : 'text-[#10B981]'}`}>
                  <span className="text-[#64748B] shrink-0">$</span>
                  <span>{log}</span>
                </div>
              ))
            )}
          </div>
        ) : (
          <pre className={`text-[11px] leading-relaxed whitespace-pre-wrap select-all ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`}>
            {JSON.stringify(rawJsonPayload, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
