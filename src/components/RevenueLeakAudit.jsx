import React, { useState } from 'react';
import { Layers, AlertCircle, CheckCircle2, Info, Zap, XCircle } from 'lucide-react';

export default function RevenueLeakAudit() {
  const [mobileTab, setMobileTab] = useState('automated'); // 'automated' | 'manual'

  return (
    <div id="revenue-audit" className="bg-white border border-[#EBE3D5] rounded-3xl p-6 sm:p-10 space-y-8 mt-10 transition-all shadow-sm scroll-mt-24">
      {/* Section Header */}
      <div className="border-b border-[#F3EFE6] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE3D5] text-xs font-mono-telemetry font-bold text-[#D97706] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">HBR SPEED-TO-LEAD BENCHMARK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-extrabold text-[#18191B] tracking-tight">
            Why Speed-to-Lead Matters.
          </h2>
          <p className="text-sm sm:text-base text-[#525866] mt-2 max-w-2xl leading-relaxed">
            Harvard Business Review research shows leads contacted in under 5 minutes are <strong className="text-[#18191B]">21x more likely to qualify</strong>. After 30 minutes, 80%+ of high-ticket buyers go cold.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono-telemetry px-3 py-1.5 rounded-full font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            ⚡ 21x Qualification Edge
          </span>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden p-1 rounded-full border border-[#EBE3D5] font-mono-telemetry text-xs font-bold bg-[#FAF8F5]">
        <button
          onClick={() => setMobileTab('automated')}
          className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'automated'
              ? 'bg-[#18191B] text-white shadow-xs'
              : 'text-[#525866] hover:text-[#18191B]'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-[#10B981]" />
          <span>TrackKaro (Instant Dispatch)</span>
        </button>
        <button
          onClick={() => setMobileTab('manual')}
          className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'manual'
              ? 'bg-[#DC2626] text-white shadow-xs'
              : 'text-[#525866] hover:text-[#18191B]'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Manual (2hr+ Delay)</span>
        </button>
      </div>

      {/* Comparison Matrix */}
      {/* Desktop: Side-by-Side (2 cols) */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        
        {/* Left Side: The Manual Workflow */}
        <div className="rounded-2xl p-6 sm:p-7 space-y-4 bg-[#FEF2F2] border border-[#FECACA] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#FCA5A5]/60 pb-3">
            <div className="flex items-center gap-2 text-[#DC2626] font-bold text-sm">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>The Old Way (Manual Lead Decay)</span>
            </div>
            <span className="text-[10px] font-mono-telemetry font-bold px-2 py-0.5 rounded-full bg-white text-[#DC2626] border border-[#FCA5A5]">
              ❌ 2-4 HOUR DELAY
            </span>
          </div>

          <ul className="space-y-3.5 text-xs text-[#991B1B] leading-relaxed font-mono-telemetry">
            <li className="flex items-start gap-2.5">
              <span className="text-[#DC2626] font-bold text-sm shrink-0">✕</span>
              <span><strong>Scattered Inboxes:</strong> Leads sit forgotten across Meta Ads Manager, Gmail inboxes, and portal emails.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#DC2626] font-bold text-sm shrink-0">✕</span>
              <span><strong>Slow Sales Response:</strong> Reps check manually hours later without instant audio sirens or 1-click dial prompts.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#DC2626] font-bold text-sm shrink-0">✕</span>
              <span><strong>Lost Revenue:</strong> By the time a sales rep finally calls, high-intent buyers have already booked with a competing provider.</span>
            </li>
          </ul>
        </div>

        {/* Right Side: The Automated Workflow */}
        <div className="rounded-2xl p-6 sm:p-7 space-y-4 bg-[#ECFDF5] border border-[#A7F3D0] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#6EE7B7]/60 pb-3">
            <div className="flex items-center gap-2 text-[#065F46] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
              <span>The TrackKaro Way (Instant Ingestion)</span>
            </div>
            <span className="text-[10px] font-mono-telemetry font-bold px-2 py-0.5 rounded-full bg-white text-[#059669] border border-[#A7F3D0]">
              ⚡ INSTANT DISPATCH
            </span>
          </div>

          <ul className="space-y-3.5 text-xs text-[#065F46] leading-relaxed font-mono-telemetry">
            <li className="flex items-start gap-2.5">
              <span className="text-[#059669] font-bold text-sm shrink-0">✓</span>
              <span><strong>Centralized Cloud Ingestion:</strong> Ad webhooks, landing page forms &amp; portal parsers all funnel into 1 unified pipeline.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#059669] font-bold text-sm shrink-0">✓</span>
              <span><strong>Instant Telegram Siren:</strong> Sales team gets immediate sound alerts with 1-click call links in real-time.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#059669] font-bold text-sm shrink-0">✓</span>
              <span><strong>Instant WhatsApp Asset Delivery:</strong> Prospect receives PDF brochure &amp; confirmation while their buying interest is at absolute peak.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#059669] font-bold text-sm shrink-0">✓</span>
              <span><strong>Zero Disruption to Existing CRM:</strong> Runs parallel alongside HubSpot, Salesforce, Zoho or Excel — nothing gets replaced.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile: Single Active Card */}
      <div className="block md:hidden">
        {mobileTab === 'manual' ? (
          <div className="rounded-2xl p-5 space-y-3 bg-[#FEF2F2] border border-[#FECACA] font-mono-telemetry">
            <div className="flex items-center gap-2 text-[#DC2626] font-bold text-xs border-b border-[#FCA5A5]/60 pb-2">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>The Old Way (Slow Follow-Up)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#991B1B] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold">✕</span>
                <span>Leads arrive scattered across Meta Ad Manager &amp; email notifications.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold">✕</span>
                <span>Sitting unread for hours: Reps check manually without instant audio sirens.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold">✕</span>
                <span>High-intent buyers slip away to competitors who respond in minutes.</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl p-5 space-y-3 bg-[#ECFDF5] border border-[#A7F3D0] font-mono-telemetry">
            <div className="flex items-center gap-2 text-[#065F46] font-bold text-xs border-b border-[#6EE7B7]/60 pb-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
              <span>The TrackKaro Way (Instant Dispatch)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#065F46] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span><strong>Centralized Ingest:</strong> Ad webhooks funnel into 1 single pipeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span><strong>Telegram Siren:</strong> Sound alert with 1-click dial link instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span><strong>WhatsApp Asset:</strong> Buyer gets brochure before closing Instagram.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#059669] font-bold">✓</span>
                <span><strong>Zero Disruption:</strong> Connects alongside existing CRM.</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Transparent Disclaimer Box */}
      <div className="border border-[#EBE3D5] p-4 sm:p-5 rounded-2xl text-xs font-mono-telemetry flex items-start gap-3 bg-[#FAF8F5] text-[#525866]">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#059669]" />
        <div className="leading-relaxed">
          <strong className="text-[#18191B]">Transparency Notice:</strong> Results depend on your lead sources, integrations, and sales team responsiveness. TrackKaro's interactive demo illustrates workflow mechanics; business outcomes must be measured after deployment for your specific sales process.
        </div>
      </div>
    </div>
  );
}
