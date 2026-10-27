import React, { useState } from 'react';
import { Terminal, Code, Check, Copy } from 'lucide-react';

export default function TelemetryDrawer({ logs = [], formData = {}, currencyMode = 'USD' }) {
  const [activeTab, setActiveTab] = useState('stdout');
  const [copied, setCopied] = useState(false);

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
    <div className="bg-white border border-[#EBE3D5] rounded-2xl overflow-hidden shadow-sm transition-all">
      {/* Drawer Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3EFE6] bg-[#FAF8F5]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('stdout')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-telemetry flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              activeTab === 'stdout'
                ? 'bg-white text-[#18191B] border border-[#EBE3D5] shadow-xs'
                : 'text-[#7E8695] hover:text-[#18191B]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#059669]" />
            <span>Live Pipeline Feed</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ECFDF5] text-[#065F46] font-mono font-bold">REAL-TIME</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-telemetry flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              activeTab === 'json'
                ? 'bg-white text-[#18191B] border border-[#EBE3D5] shadow-xs'
                : 'text-[#7E8695] hover:text-[#18191B]'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Payload Data</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === 'json' && (
            <button
              onClick={handleCopyJson}
              className="text-[11px] font-mono-telemetry flex items-center gap-1 px-3 py-1 rounded-full border border-[#DFD5C0] bg-white hover:bg-[#FAF8F5] text-[#18191B] cursor-pointer shadow-xs font-bold"
            >
              {copied ? <Check className="w-3 h-3 text-[#059669]" /> : <Copy className="w-3 h-3 text-[#7E8695]" />}
              <span>{copied ? 'Copied ✓' : 'Copy JSON'}</span>
            </button>
          )}
          <span className="font-mono-telemetry text-[11px] text-[#7E8695] hidden sm:inline font-semibold">
            ⚡ 15s Cloud Ingest
          </span>
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="p-4 font-mono-telemetry text-xs min-h-[160px] max-h-[220px] overflow-y-auto bg-white">
        {activeTab === 'stdout' ? (
          <div className="space-y-2">
            {logs.length === 0 ? (
              <div className="text-[#7E8695] text-center py-10 font-mono-telemetry flex flex-col items-center justify-center gap-2">
                <span className="text-xl">⚡</span>
                <span>Ready for ingest. Click <strong className="text-[#18191B]">"Run Pipeline Simulation"</strong> above to watch events stream in real-time.</span>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="leading-relaxed flex items-start gap-2.5 p-1.5 rounded-lg bg-[#FAF8F5] border border-[#F3EFE6] text-xs">
                  <span className="text-[#059669] font-bold shrink-0">✓</span>
                  <span className="text-[#18191B] font-medium">{log}</span>
                </div>
              ))
            )}
          </div>
        ) : (
          <pre className="text-[11px] text-[#18191B] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#F3EFE6] overflow-x-auto leading-relaxed">
            {JSON.stringify(rawJsonPayload, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
