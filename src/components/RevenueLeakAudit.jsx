import React, { useState } from 'react';
import { Layers, AlertCircle, CheckCircle2, Info, Zap } from 'lucide-react';

export default function RevenueLeakAudit({ themeMode = 'dark' }) {
  const isLight = themeMode === 'light';
  const [mobileTab, setMobileTab] = useState('automated'); // 'automated' | 'manual'

  return (
    <div id="revenue-audit" className={`telemetry-card p-6 sm:p-8 space-y-6 mt-8 transition-all border rounded-xl scroll-mt-24 ${
      isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-[#0E1015] border-[#1E222D] shadow-xl'
    }`}>
      {/* Section Header */}
      <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isLight ? 'border-[#E2E8F0]' : 'border-[#1E222D]'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <Layers className={`w-4 h-4 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
            <h3 className={`text-lg sm:text-xl font-bold font-mono-telemetry ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
              Why Speed-to-Lead Matters
            </h3>
          </div>
          <p className={`text-xs sm:text-sm font-mono-telemetry mt-1.5 leading-relaxed ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
            Harvard Business Review research shows leads contacted in under 5 minutes are 21x more likely to qualify. After 30 minutes, 80%+ of high-ticket buyers go cold.
          </p>
        </div>
        <span className={`text-[10px] font-mono-telemetry px-2.5 py-1 rounded w-fit font-bold shrink-0 ${
          isLight 
            ? 'text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD]' 
            : 'text-[#3B82F6] bg-[#1E293B] border border-[#3B82F6]/30'
        }`}>
          WORKFLOW COMPARISON
        </span>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden p-1 rounded-lg border font-mono-telemetry text-xs font-bold bg-[#141720] border-[#1E222D]">
        <button
          onClick={() => setMobileTab('automated')}
          className={`flex-1 py-2 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'automated'
              ? 'bg-[#059669] text-white shadow-sm'
              : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Automated (15s)</span>
        </button>
        <button
          onClick={() => setMobileTab('manual')}
          className={`flex-1 py-2 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'manual'
              ? 'bg-[#DC2626] text-white shadow-sm'
              : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Manual Delay (2hr+)</span>
        </button>
      </div>

      {/* Comparison Matrix */}
      {/* Desktop: Side-by-Side (2 cols) */}
      <div className="hidden md:grid md:grid-cols-2 gap-5">
        {/* Left Side: The Manual Workflow */}
        <div className={`border rounded-lg p-5 space-y-3 font-mono-telemetry ${
          isLight ? 'bg-[#FEF2F2] border-[#FCA5A5]' : 'bg-[#1A1114] border-[#EF4444]/30'
        }`}>
          <div className="flex items-center gap-2 text-[#DC2626] font-bold text-xs sm:text-sm border-b border-[#FCA5A5]/40 pb-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>The Manual Workflow</span>
          </div>
          <ul className="space-y-2.5 text-xs text-[#991B1B] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#DC2626] font-bold shrink-0">•</span>
              <span>Leads arrive scattered across Meta Ad Manager, website inboxes, and Magicbricks/99acres notification emails.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DC2626] font-bold shrink-0">•</span>
              <span>Sitting unread for hours: Sales reps check manually without instant audio alerts or 1-click call prompts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#DC2626] font-bold shrink-0">•</span>
              <span>High-intent prospects slip away to competing brokers or providers who respond within minutes.</span>
            </li>
          </ul>
        </div>

        {/* Right Side: The Automated Workflow */}
        <div className={`border rounded-lg p-5 space-y-3 font-mono-telemetry ${
          isLight ? 'bg-[#ECFDF5] border-[#6EE7B7]' : 'bg-[#0D1914] border-[#10B981]/30'
        }`}>
          <div className="flex items-center gap-2 text-[#059669] font-bold text-xs sm:text-sm border-b border-[#6EE7B7]/40 pb-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>The Automated Workflow</span>
          </div>
          <ul className="space-y-2.5 text-xs text-[#065F46] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#059669] font-bold shrink-0">•</span>
              <span>One Centralized Ingestion Engine: Ad webhooks, landing page forms, and portal email parsers all funnel into 1 pipeline.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#059669] font-bold shrink-0">•</span>
              <span>Instant sales alerts with 1-click direct call buttons trigger to your team via Telegram in seconds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#059669] font-bold shrink-0">•</span>
              <span>Lead details auto-append into Google Sheets CRM alongside instant WhatsApp brochure confirmation to the buyer.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#059669] font-bold shrink-0">•</span>
              <span><strong>Zero Disruption to Existing Setup:</strong> Connects parallel alongside your current CRM (HubSpot, Salesforce, Zoho, or Excel) — nothing gets replaced or paused.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile: Single Active Card */}
      <div className="block md:hidden">
        {mobileTab === 'manual' ? (
          <div className={`border rounded-lg p-4 space-y-2.5 font-mono-telemetry ${
            isLight ? 'bg-[#FEF2F2] border-[#FCA5A5]' : 'bg-[#1A1114] border-[#EF4444]/30'
          }`}>
            <div className="flex items-center gap-2 text-[#DC2626] font-bold text-xs border-b border-[#FCA5A5]/40 pb-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>The Manual Workflow (Slow Follow-Up)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#991B1B] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold shrink-0">•</span>
                <span>Leads arrive scattered across Meta Ad Manager, website inboxes, and listing emails.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold shrink-0">•</span>
                <span>Sitting unread for hours: Sales reps check manually without audio alerts or 1-click dial.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold shrink-0">•</span>
                <span>High-intent prospects move on to competing brokers who respond immediately.</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className={`border rounded-lg p-4 space-y-2.5 font-mono-telemetry ${
            isLight ? 'bg-[#ECFDF5] border-[#6EE7B7]' : 'bg-[#0D1914] border-[#10B981]/30'
          }`}>
            <div className="flex items-center gap-2 text-[#059669] font-bold text-xs border-b border-[#6EE7B7]/40 pb-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>The Automated Workflow (15s Dispatch)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#065F46] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold shrink-0">•</span>
                <span><strong>Centralized Ingest:</strong> Ad webhooks & forms funnel into 1 single pipeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold shrink-0">•</span>
                <span><strong>Instant Sound Alerts:</strong> Telegram alerts with 1-click call links trigger in 15s.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold shrink-0">•</span>
                <span><strong>WhatsApp Asset Delivery:</strong> Lead gets brochure before closing Instagram.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold shrink-0">•</span>
                <span><strong>Zero Disruption:</strong> Connects parallel alongside your existing CRM.</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Transparent Disclaimer Box */}
      <div className={`border p-4 rounded-lg text-xs font-mono-telemetry flex items-start gap-3 ${
        isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#475569]' : 'bg-[#141720] border-[#2E3648] text-[#94A3B8]'
      }`}>
        <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
        <div className="leading-relaxed">
          <strong>Transparency Notice:</strong> Results depend on your lead sources, integrations, and sales team responsiveness. TrackKaro's interactive demo illustrates workflow mechanics; business outcomes must be measured after deployment for your specific sales process.
        </div>
      </div>
    </div>
  );
}
