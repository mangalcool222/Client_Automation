import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Bot, CheckCircle2, Clock, Cpu, MessageSquare, Play, Send, 
  ShieldCheck, Sparkles, UserCheck, Zap, Radio, Database, Layers, 
  LayoutTemplate, Smartphone, RefreshCw, AlertCircle, Mail, User, Check, Copy,
  FileText, ExternalLink, PhoneCall, CheckCheck, Building2, Building, Briefcase, Sun, Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import LinkedInIcon from './LinkedInIcon';
import N8nCanvasFlow from './N8nCanvasFlow';
import TelemetryDrawer from './TelemetryDrawer';
import RevenueLeakAudit from './RevenueLeakAudit';
import AgencyClientInquiryForm from './AgencyClientInquiryForm';
import CustomWorkflowCTA from './CustomWorkflowCTA';

export default function LeadSimulatorApp() {
  const templates = [
    {
      id: 'dubai-usd',
      name: 'Real Estate Lead ($ / ₹)',
      icon: Building2,
      currency: 'USD',
      data: {
        name: 'Alexander Wright (Sample Lead)',
        phone: '+971 50 000 9999',
        email: 'alexander.sample@example.com',
        project: 'Dubai Marina Luxury Off-Plan Penthouse',
        budgetUSD: '$1,250,000 Penthouse',
        budgetINR: '₹10.5 Crore Penthouse',
      }
    },
    {
      id: 'solar-us',
      name: 'Solar & Roofing ($ USD)',
      icon: Sun,
      currency: 'USD',
      data: {
        name: 'David Miller (Sample Lead)',
        phone: '+1 (555) 018-9472',
        email: 'david.miller@example.com',
        project: 'Single-Family Solar + Battery Quote (Austin, TX)',
        budgetUSD: '$28,500 System Contract',
        budgetINR: '₹23.5 Lakhs Contract',
      }
    },
    {
      id: 'clinic-high-ticket',
      name: 'Aesthetic Clinic & MedSpa',
      icon: Stethoscope,
      currency: 'USD',
      data: {
        name: 'Priya Sharma (Sample Lead)',
        phone: '+91 98000 11223',
        email: 'priya.clinic@example.com',
        project: 'FUE Hair Restoration & Density Consultation',
        budgetUSD: '$4,200 Procedure',
        budgetINR: '₹2,50,000 Procedure',
      }
    },
    {
      id: 'b2b-saas',
      name: 'Agency & B2B SaaS',
      icon: Briefcase,
      currency: 'USD',
      data: {
        name: 'Julian Thorne (Sample Lead)',
        phone: '+1 (555) 019-2831',
        email: 'julian.sample@example.com',
        project: 'Meta Ad Lead Ingestion & Webhook Pipeline Audit',
        budgetUSD: '$3,500 / month Retainer',
        budgetINR: '₹2.8 Lakh / month Retainer',
      }
    }
  ];

  const [activeTemplate, setActiveTemplate] = useState('dubai-usd');
  const [formData, setFormData] = useState(templates[0].data);
  const [currencyMode, setCurrencyMode] = useState('USD');
  const themeMode = 'light'; // Locked to Weekday warm cream aesthetic
  const [pipelineState, setPipelineState] = useState('idle'); // idle | processing | complete
  const [activeNodeStep, setActiveNodeStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileActiveChannel, setMobileActiveChannel] = useState('whatsapp'); // 'whatsapp' | 'telegram' | 'sheets'

  const handleCopyHeaderEmail = () => {
    try {
      navigator.clipboard.writeText('mangal@trackkaroai.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {}
  };

  // Lock to warm editorial Weekday light mode
  useEffect(() => {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
  }, []);

  const handleSelectTemplate = (template) => {
    setActiveTemplate(template.id);
    setFormData(template.data);
    setCurrencyMode(template.currency);
    setPipelineState('idle');
    setActiveNodeStep(0);
    setLogs([]);
    setMobileActiveChannel('whatsapp');
  };

  const handleClearForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      project: '',
      budgetUSD: '',
      budgetINR: '',
    });
    setPipelineState('idle');
    setActiveNodeStep(0);
    setLogs([]);
    setMobileActiveChannel('whatsapp');
  };

  const handleTriggerPipeline = async () => {
    if (!formData.name || !formData.phone) {
      alert('Please enter a Prospect Name and Phone Number to test the demo.');
      return;
    }

    setPipelineState('processing');
    setActiveNodeStep(1);
    setLogs([]);
    setMobileActiveChannel('whatsapp');

    // On mobile screen, smoothly scroll to output deck so user watches live dispatch
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('demo-outputs')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'test_simulator', {
        event_category: 'engagement',
        event_label: activeTemplate.name || 'Simulator Test',
        template_id: activeTemplate.id
      });
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    // Step 1: Webhook Ingest
    setTimeout(() => {
      setActiveNodeStep(1);
      setLogs((prev) => [...prev, `[${timestamp}] INGEST (SIMULATED): Inbound lead payload received (Meta Ads / Web Form / Portal Email Parser)`]);
    }, 200);

    // Step 2: Lead Validation
    setTimeout(() => {
      setActiveNodeStep(2);
      setLogs((prev) => [
        ...prev,
        `[${timestamp}] VALIDATION: Auto-formatted phone (+91/+971), cleaned region & generated timestamps`,
      ]);
    }, 600);

    // Step 3: WhatsApp Module
    setTimeout(() => {
      setActiveNodeStep(3);
      setMobileActiveChannel('whatsapp');
      setLogs((prev) => [
        ...prev,
        `[${timestamp}] WHATSAPP PREVIEW: Formatted auto-reply payload (requires provider configuration for Meta / AiSensy)`,
      ]);
    }, 1200);

    // Step 4: Telegram SLA Alert
    setTimeout(() => {
      setActiveNodeStep(4);
      setMobileActiveChannel('telegram');
      setLogs((prev) => [
        ...prev,
        `[${timestamp}] TELEGRAM ALERT: Generated instant notification layout for sales channel`,
      ]);
    }, 1700);

    // Step 5: CRM Sync
    setTimeout(() => {
      setActiveNodeStep(5);
      setMobileActiveChannel('sheets');
      setLogs((prev) => [
        ...prev,
        `[${timestamp}] GOOGLE SHEETS: Prepared structured 10-column CRM row data`,
      ]);
      setPipelineState('complete');

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }, 2100);
  };

  const handleReset = () => {
    setPipelineState('idle');
    setActiveNodeStep(0);
    setLogs([]);
  };

  const isLight = true;

  // Output Mockup Card Renderers (Polished Weekday & Real-World Aesthetics)
  const renderWhatsAppCard = () => (
    <div className="p-4 flex flex-col justify-between min-h-[380px] rounded-2xl border border-[#A7F3D0] bg-[#FAF8F5] shadow-sm relative overflow-hidden">
      {/* WhatsApp Header Bar */}
      <div className="bg-[#075E54] text-white rounded-xl p-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
            TK
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1">
              <span>TrackKaro AI</span>
              <span className="text-[10px] text-[#A7F3D0]">✓</span>
            </div>
            <div className="text-[9px] text-[#D1FAE5]">Verified WhatsApp Business</div>
          </div>
        </div>
        <span className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-mono-telemetry font-bold">
          ⚡ Auto-Reply
        </span>
      </div>

      {/* Chat Message Bubble */}
      <div className="space-y-2 py-3 flex-1 flex flex-col justify-end">
        <div className="bg-[#DCF8C6] border border-[#BBF7D0] rounded-2xl rounded-tl-sm p-3.5 text-xs text-[#18191B] shadow-xs space-y-2.5">
          <p className="leading-snug">
            Hello <span className="font-bold text-[#065F46]">{formData.name}</span>! Here is your requested luxury floorplan brochure 📄
          </p>

          {/* PDF Card */}
          <div className="bg-white border border-[#A7F3D0] rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#DC2626] font-bold text-xs shrink-0">
                PDF
              </div>
              <div className="truncate">
                <div className="text-[11px] font-bold text-[#18191B] truncate">
                  {(formData.project || '').includes('Solar') ? 'Solar_Assessment_Quote.pdf' : (formData.project || '').includes('Hair') || (formData.project || '').includes('Clinic') ? 'Aesthetic_Treatment_Guide.pdf' : (formData.project || '').includes('Agency') ? 'B2B_Automation_Deck.pdf' : 'Penthouse_Brochure_2026.pdf'}
                </div>
                <div className="text-[9px] text-[#7E8695]">
                  Digital Spec • 3.2 MB
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded-md font-bold font-mono-telemetry shrink-0">
              ✓ Ready
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#525866] pt-1">
            <span className="font-mono-telemetry text-[#059669] font-bold">Auto-dispatched via Meta Cloud API</span>
            <span className="font-mono-telemetry font-bold text-[#059669]">10:42 AM ✓✓</span>
          </div>
        </div>

        <div className="text-[10px] text-center font-mono-telemetry py-1 px-2 rounded-full bg-white border border-[#EBE3D5] text-[#7E8695]">
          ⚡ Buyer receives WhatsApp brochure immediately upon ad submission
        </div>
      </div>
    </div>
  );

  const renderTelegramCard = () => (
    <div className="p-4 flex flex-col justify-between min-h-[380px] rounded-2xl border border-[#BFDBFE] bg-[#FAF8F5] shadow-sm relative overflow-hidden">
      <div>
        {/* Telegram Header */}
        <div className="bg-[#0284C7] text-white rounded-xl p-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-sm">✈️</span>
            <div>
              <div className="text-xs font-bold">Telegram Sales Siren</div>
              <div className="text-[9px] text-[#BAE6FD]">Instant Audio Alert to Reps</div>
            </div>
          </div>
          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-mono-telemetry font-bold">
            🚨 SIREN LIVE
          </span>
        </div>

        {/* Telegram Inbound Lead Card */}
        <div className="mt-3 p-3.5 bg-white border border-[#DBEAFE] rounded-xl shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#EFF6FF] pb-1.5">
            <span className="text-[10px] font-bold text-[#2563EB] font-mono-telemetry uppercase tracking-wider flex items-center gap-1">
              <span>🔥</span> HIGH-INTENT LEAD INBOUND
            </span>
            <span className="text-[9px] text-[#7E8695] font-mono-telemetry">Just now</span>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="text-[#525866]">
              Name: <span className="font-bold text-[#18191B]">{formData.name}</span>
            </div>
            <div className="text-[#525866]">
              Phone: <span className="font-bold text-[#2563EB]">{formData.phone}</span>
            </div>
            <div className="text-[#525866]">
              Project: <span className="font-medium text-[#18191B]">{formData.project}</span>
            </div>
            <div className="text-[#525866]">
              Budget: <span className="font-bold text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded text-[11px]">{currencyMode === 'USD' ? formData.budgetUSD : formData.budgetINR}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <a
          href={`tel:${formData.phone.replace(/[^0-9+]/g, '')}`}
          className="w-full font-extrabold py-3 rounded-full text-xs font-mono-telemetry flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-white bg-[#059669] hover:bg-[#047857] hover:scale-[1.02]"
        >
          <PhoneCall className="w-3.5 h-3.5 fill-current" />
          <span>Call Lead (1-Click Direct Link)</span>
        </a>
        <div className="text-[10px] text-center font-mono-telemetry text-[#7E8695]">
          ⚡ Rep dials prospect immediately while intent is at peak
        </div>
      </div>
    </div>
  );

  const renderSheetsCard = () => (
    <div className="p-4 flex flex-col justify-between min-h-[380px] rounded-2xl border border-[#BBF7D0] bg-[#FAF8F5] shadow-sm relative overflow-hidden">
      <div>
        {/* Google Sheets Header */}
        <div className="bg-[#107C41] text-white rounded-xl p-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-white" />
            <div>
              <div className="text-xs font-bold">Google Sheets CRM</div>
              <div className="text-[9px] text-[#A7F3D0]">Auto 10-Column Append</div>
            </div>
          </div>
          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-mono-telemetry font-bold">
            📊 SHEET SYNC
          </span>
        </div>

        {/* Miniature Spreadsheet Table */}
        <div className="mt-3 bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
          <div className="grid grid-cols-4 bg-[#F0FDF4] border-b border-[#E5E7EB] text-[9px] font-mono-telemetry font-bold text-[#065F46] p-2">
            <span>TIME</span>
            <span>PROSPECT</span>
            <span>PHONE</span>
            <span>STATUS</span>
          </div>
          <div className="grid grid-cols-4 text-[10px] font-mono-telemetry p-2.5 items-center gap-1 border-b border-slate-100 bg-white">
            <span className="text-[#525866]">10:42 AM</span>
            <span className="font-bold text-[#18191B] truncate">{formData.name}</span>
            <span className="text-[#0284C7] truncate">{formData.phone}</span>
            <span className="text-[9px] font-bold text-[#059669] bg-[#DCFCE7] px-1 py-0.5 rounded text-center">
              QUALIFIED
            </span>
          </div>
          <div className="p-2 text-[9px] font-mono-telemetry text-[#7E8695] bg-[#FAF8F5]">
            Columns: Timestamp, Lead Source, Ad Campaign, Investment, Rep Assigned
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="p-2.5 rounded-xl text-[10px] font-mono-telemetry text-center bg-white border border-[#EBE3D5] text-[#525866]">
          Zero CRM disruption: Connects alongside HubSpot, Salesforce, Zoho or Excel
        </div>
        <div className="text-[10px] text-center font-mono-telemetry text-[#7E8695]">
          ⚡ Live row append with zero duplicate entries
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      
      {/* Systems Architect Header */}
      <header className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 telemetry-card p-4 transition-all ${
        isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E1015] border-[#1E222D]'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981]/20 via-[#0EA5E9]/10 to-transparent border border-[#10B981]/30 flex items-center justify-center text-[#10B981] font-bold text-base shadow-sm">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className={`font-extrabold text-base tracking-tight ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                TrackKaro AI
              </h1>
              <span className={`text-[10px] font-mono-telemetry px-2 py-0.5 rounded border uppercase tracking-wider font-bold ${
                isLight ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]' : 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
              }`}>
                Full-Stack Autonomous Revenue Engine
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono-telemetry flex items-center gap-1.5 mt-0.5">
              <span>Inbound Speed-to-Lead OS</span>
              <span>•</span>
              <span className={isLight ? 'text-[#0284C7]' : 'text-[#38BDF8]'}>Mangal Soren • TrackKaro AI</span>
            </p>
          </div>
        </div>

        {/* Currency Switcher & Direct Contact */}
        <div className="flex items-center gap-3">

          {/* Currency Switcher */}
          <div className={`flex items-center p-1 rounded border ${isLight ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#141720] border-[#1E222D]'}`}>
            <button
              onClick={() => setCurrencyMode('USD')}
              className={`px-3 py-1 rounded text-xs font-mono-telemetry font-bold transition-all cursor-pointer ${
                currencyMode === 'USD'
                  ? isLight ? 'bg-[#0284C7] text-white shadow-sm' : 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrencyMode('INR')}
              className={`px-3 py-1 rounded text-xs font-mono-telemetry font-bold transition-all cursor-pointer ${
                currencyMode === 'INR'
                  ? isLight ? 'bg-[#0284C7] text-white shadow-sm' : 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              INR (₹)
            </button>
          </div>

          <a
            href="https://wa.me/917979816557?text=Hi%20Mangal,%20I%20want%20to%20discuss%20a%20lead%20automation%20workflow%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-telemetry font-bold transition-all cursor-pointer bg-[#059669] hover:bg-[#047857] text-white shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex items-center gap-1.5 border px-3 py-1.5 rounded text-xs font-mono-telemetry cursor-pointer transition-all ${
              isLight 
                ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0A66C2] border-[#CBD5E1]' 
                : 'bg-[#141720] hover:bg-[#1E222D] text-[#0A66C2] border-[#2E3648]'
            }`}
            title="View Mangal Soren on LinkedIn"
          >
            <LinkedInIcon className="w-3.5 h-3.5 fill-[#0A66C2]" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:mangal@trackkaroai.com?subject=Inquiry%20about%20Lead%20Automation%20Workflows"
            onClick={handleCopyHeaderEmail}
            className={`hidden md:flex items-center gap-2 border px-3.5 py-1.5 rounded text-xs font-mono-telemetry cursor-pointer transition-all ${
              isLight 
                ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border-[#CBD5E1]' 
                : 'bg-[#141720] hover:bg-[#1E222D] text-[#F1F3F7] border-[#2E3648]'
            }`}
            title="Click to email or copy: mangal@trackkaroai.com"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold">mangal@trackkaroai.com (Copied!)</span>
              </>
            ) : (
              <>
                <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
                <span>mangal@trackkaroai.com</span>
                <Copy className="w-3 h-3 text-zinc-400 ml-0.5" />
              </>
            )}
          </a>
        </div>
      </header>

      {/* Weekday-Inspired Lively Jarvis Outbound Banner */}
      <a
        href="https://jarvis.trackkaroai.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`group p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 shadow-sm relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-r from-[#FFFDF7] via-[#FFFBEB] to-[#FEF3C7]/60 border-[#FDE68A] hover:border-[#F59E0B] hover:shadow-md'
            : 'bg-[#111827] border-[#1F2937] hover:border-[#38BDF8]'
        }`}
        title="Explore TrackKaro Jarvis Autonomous AI Outbound SDR"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-xs shrink-0 group-hover:scale-110 transition-transform">
            🤖
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-telemetry px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] font-bold uppercase tracking-wider">
                🎯 Autonomous B2B Outbound
              </span>
              <span className="text-[11px] text-[#92400E] font-bold hidden md:inline">•</span>
              <span className="text-[11px] text-[#92400E] font-bold hidden md:inline">Sister Engine</span>
            </div>
            <h3 className="text-base sm:text-lg font-serif-editorial font-bold text-[#18191B] mt-1 group-hover:text-[#D97706] transition-colors flex items-center gap-1.5">
              <span>Need to hunt high-ticket clients too? Meet Jarvis</span>
              <span className="text-[#D97706] text-sm">↗</span>
            </h3>
            <p className="text-xs text-[#525866] mt-0.5 max-w-xl leading-relaxed">
              While TrackKaro connects incoming leads in real-time, Jarvis autonomously finds verified decision-makers &amp; books qualified calls on autopilot.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <span className="px-5 py-2.5 rounded-full bg-[#18191B] hover:bg-black text-white font-mono-telemetry text-xs font-bold transition-all shadow-md group-hover:scale-105 flex items-center gap-2 cursor-pointer">
            <span>Launch Jarvis OS</span>
            <span>🚀</span>
          </span>
        </div>
      </a>

      {/* Hero Container with Weekday-Inspired Lively Visuals */}
      <div className={`relative p-8 sm:p-14 text-center space-y-6 transition-all border rounded-3xl overflow-hidden ${
        isLight 
          ? 'bg-white border-[#EBE3D5] shadow-lg shadow-amber-900/5' 
          : 'bg-[#0E1015] border-[#1E222D] shadow-xl'
      }`}>

        {/* Floating WhatsApp Card Sticker (Left Side) */}
        <div className="hidden xl:flex flex-col items-start p-3.5 bg-[#FAF8F5] border border-[#E5E7EB] rounded-2xl shadow-xl -rotate-6 animate-float-slow absolute left-4 top-14 z-10 max-w-[210px] text-left pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#059669] uppercase font-mono-telemetry">Instant WhatsApp</span>
            <span className="text-xs">✨</span>
          </div>
          <p className="text-[11px] font-medium text-[#18191B] leading-snug">
            "Hello Alexander! Here is your requested luxury penthouse brochure 📄"
          </p>
          <div className="flex items-center justify-between w-full mt-2 pt-1 border-t border-slate-200">
            <span className="text-[9px] font-bold text-[#059669] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
              ⚡ Instant Delivery
            </span>
            <span className="text-xs">💬</span>
          </div>
        </div>

        {/* Floating Telegram Siren Card Sticker (Right Side) */}
        <div className="hidden xl:flex flex-col items-start p-3.5 bg-[#FAF8F5] border border-[#E5E7EB] rounded-2xl shadow-xl rotate-6 animate-float-reverse absolute right-4 top-14 z-10 max-w-[210px] text-left pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm">🚨</span>
            <span className="text-[10px] font-bold text-[#2563EB] uppercase font-mono-telemetry">Telegram Siren</span>
          </div>
          <p className="text-[11px] font-medium text-[#18191B] leading-snug">
            "🔥 New $1.25M Penthouse Lead from Meta Ads!"
          </p>
          <div className="flex items-center justify-between w-full mt-2 pt-1 border-t border-slate-200">
            <span className="text-[9px] font-bold text-[#2563EB] bg-[#DBEAFE] px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>📞 1-Click Dial</span>
            </span>
            <span className="text-xs">⚡</span>
          </div>
        </div>

        {/* Positioning Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-mono-telemetry font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="uppercase tracking-wider">REAL-TIME SPEED-TO-LEAD</span>
          <span>•</span>
          <span>INSTANT DISPATCH</span>
        </div>

        {/* Big Bold Editorial Serif Headline (Weekday Style) */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-editorial font-extrabold tracking-tight leading-[1.12] text-[#18191B] max-w-4xl mx-auto">
          Respond pro-actively. <br />
          <span className="text-[#D97706] underline decoration-[#FDE68A] decoration-wavy decoration-2">
            Don't let high-ticket leads go cold.
          </span>
        </h1>

        {/* Friendly Hero Subtitle */}
        <p className="text-sm sm:text-base text-[#525866] max-w-2xl mx-auto leading-relaxed">
          Connect your paid ads, website forms, and listing portals directly to your sales reps' phones in real-time. Instant WhatsApp brochure delivery, Telegram audio sirens with 1-click calls, and automatic CRM sync.
        </p>

        {/* Lively Weekday-Style Action CTAs */}
        <div className="pt-2 space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#demo-section"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold transition-all cursor-pointer shadow-md bg-[#18191B] hover:bg-black text-white flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>⚡ Test Live Simulation</span>
            </a>

            <a
              href="https://wa.me/917979816557?text=Hi%20Mangal,%20I%20want%20to%20discuss%20a%20lead%20automation%20workflow%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-bold transition-all cursor-pointer border border-[#DFD5C0] bg-white hover:bg-[#FAF8F5] text-[#18191B] shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>💬 Chat on WhatsApp</span>
            </a>
          </div>

          {/* Social Proof Badges Bar (Weekday Backed By / Award Bar Style) */}
          <div className="pt-4 border-t border-[#F3EFE6] flex flex-wrap items-center justify-center gap-4 text-xs font-mono-telemetry text-[#7E8695]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE3D5]">
              <span>🏆</span>
              <span className="font-bold text-[#18191B]">#1 Speed-to-Lead</span>
              <span>Architecture</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE3D5]">
              <span>📈</span>
              <span className="font-bold text-[#18191B]">391% Higher Conversion</span>
              <span>(Harvard Study)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE3D5]">
              <span>🛡️</span>
              <span className="font-bold text-[#18191B]">Zero Disruption</span>
              <span>to Existing CRM</span>
            </div>
          </div>
        </div>

        {/* Sample Preset Selector */}
        <div className="pt-2 max-w-4xl mx-auto">
          <div className="text-[11px] font-mono-telemetry uppercase tracking-wider mb-2.5 text-[#7E8695] font-bold">
            Select Sample Preset Payload:
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {templates.map((tpl) => {
              const TplIcon = tpl.icon;
              const isActive = activeTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`px-3.5 py-3 rounded-xl text-xs font-mono-telemetry font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border shadow-xs ${
                    isActive
                      ? 'bg-[#18191B] text-white border-[#18191B] scale-[1.02]'
                      : 'bg-white text-[#525866] border-[#EBE3D5] hover:bg-[#FAF8F5] hover:border-[#DFD5C0] hover:text-[#18191B]'
                  }`}
                >
                  <TplIcon className={`w-4 h-4 ${isActive ? 'text-[#F59E0B]' : 'text-[#059669]'}`} />
                  <span className="truncate">{tpl.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive n8n Visual Flow Canvas */}
        <N8nCanvasFlow activeStep={activeNodeStep} isExecuting={pipelineState === 'processing'} themeMode={themeMode} />
      </div>

      {/* Main Grid: Form (4 cols) & 3 Output Channels + Telemetry Drawer (8 cols) */}
      <div id="demo-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 scroll-mt-24">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#EBE3D5] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm transition-all">
            <div className="flex items-center justify-between border-b border-[#F3EFE6] pb-3">
              <div>
                <span className="text-xs font-bold flex items-center gap-2 font-mono-telemetry text-[#18191B]">
                  <Zap className="w-4 h-4 text-[#D97706] fill-current" />
                  INTERACTIVE PIPELINE SIMULATION
                </span>
                <span className="text-[11px] text-[#525866] block mt-1 leading-snug">
                  Simulate lead routing live. See how incoming lead data triggers phone siren, WhatsApp brochure &amp; CRM sync.
                </span>
              </div>
              <button
                onClick={handleClearForm}
                className="text-[11px] font-mono-telemetry text-[#7E8695] hover:text-[#18191B] underline cursor-pointer shrink-0"
              >
                Reset
              </button>
            </div>

            <div className="space-y-3 font-mono-telemetry">
              <div>
                <label className="text-[11px] font-bold block mb-1 text-[#18191B]">Prospect Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 text-[#18191B]">WhatsApp Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +971 50 000 9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 text-[#18191B]">Project / Enquiry Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Dubai Marina Luxury Off-Plan Penthouse"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 text-[#18191B]">Stated Investment Range</label>
                <input
                  type="text"
                  placeholder="e.g. $850,000 - $1.5M"
                  value={currencyMode === 'USD' ? formData.budgetUSD : formData.budgetINR}
                  onChange={(e) =>
                    currencyMode === 'USD'
                      ? setFormData({ ...formData, budgetUSD: e.target.value })
                      : setFormData({ ...formData, budgetINR: e.target.value })
                  }
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Execute Button */}
            <div className="pt-2">
              {pipelineState === 'processing' ? (
                <button
                  disabled
                  className="w-full font-bold py-3.5 rounded-full text-xs font-mono-telemetry flex items-center justify-center gap-2 cursor-wait border border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] shadow-sm animate-pulse"
                >
                  <RefreshCw className="w-4 h-4 text-[#D97706] animate-spin" />
                  Simulating Real-Time Pipeline Flow...
                </button>
              ) : pipelineState === 'complete' ? (
                <button
                  onClick={handleReset}
                  className="w-full font-bold py-3.5 rounded-full text-xs font-mono-telemetry flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#DFD5C0] bg-white hover:bg-[#FAF8F5] text-[#18191B] shadow-sm"
                >
                  <span>🔄 Reset Simulation Session</span>
                </button>
              ) : (
                <button
                  onClick={handleTriggerPipeline}
                  className="w-full font-bold py-3.5 rounded-full text-xs font-mono-telemetry flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-white bg-[#18191B] hover:bg-black hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 fill-current text-[#F59E0B]" />
                  <span>⚡ Run Pipeline Simulation</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 3 Live Output Channels + Telemetry Drawer */}
        <div className="lg:col-span-8 space-y-6">
          {/* Desktop 3-Channel Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {renderWhatsAppCard()}
            {renderTelegramCard()}
            {renderSheetsCard()}
          </div>

          {/* Mobile Segmented Channel Deck */}
          <div id="demo-outputs" className="block md:hidden space-y-3 scroll-mt-24">
            {/* Segmented Switcher */}
            <div className={`flex items-center p-1 rounded-xl border font-mono-telemetry text-xs font-bold ${
              isLight ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#141720] border-[#1E222D]'
            }`}>
              <button
                onClick={() => setMobileActiveChannel('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg transition-all ${
                  mobileActiveChannel === 'whatsapp'
                    ? 'bg-[#059669] text-white shadow-sm'
                    : isLight ? 'text-[#64748B] hover:text-[#0F172A]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span className="truncate">WhatsApp</span>
              </button>
              <button
                onClick={() => setMobileActiveChannel('telegram')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg transition-all ${
                  mobileActiveChannel === 'telegram'
                    ? isLight ? 'bg-[#0284C7] text-white shadow-sm' : 'bg-[#3B82F6] text-white shadow-sm'
                    : isLight ? 'text-[#64748B] hover:text-[#0F172A]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span className="truncate">Telegram</span>
              </button>
              <button
                onClick={() => setMobileActiveChannel('sheets')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg transition-all ${
                  mobileActiveChannel === 'sheets'
                    ? isLight ? 'bg-[#0F172A] text-white shadow-sm' : 'bg-[#10B981] text-[#08090C] shadow-sm'
                    : isLight ? 'text-[#64748B] hover:text-[#0F172A]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span className="truncate">CRM Sheets</span>
              </button>
            </div>

            {/* Active Mobile Mockup Card */}
            <div>
              {mobileActiveChannel === 'whatsapp' && renderWhatsAppCard()}
              {mobileActiveChannel === 'telegram' && renderTelegramCard()}
              {mobileActiveChannel === 'sheets' && renderSheetsCard()}
            </div>

            {/* Micro Channel Indicator Dots */}
            <div className="flex items-center justify-center gap-2 pt-1 pb-1">
              {[
                { id: 'whatsapp', label: 'WhatsApp Delivery' },
                { id: 'telegram', label: 'Telegram Alert' },
                { id: 'sheets', label: 'Sheets CRM' }
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setMobileActiveChannel(ch.id)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    mobileActiveChannel === ch.id
                      ? 'w-7 bg-[#3B82F6]'
                      : isLight ? 'w-2 bg-[#CBD5E1]' : 'w-2 bg-[#2E3648]'
                  }`}
                  title={ch.label}
                />
              ))}
            </div>
          </div>

          {/* Dual Tab Telemetry Drawer */}
          <TelemetryDrawer logs={logs} formData={formData} currencyMode={currencyMode} themeMode={themeMode} />

        </div>

      </div>

      {/* Speed-to-Lead Revenue Leak Audit Section */}
      <RevenueLeakAudit themeMode={themeMode} />

      {/* Real Agency Client Booking Form */}
      <AgencyClientInquiryForm themeMode={themeMode} />

      {/* Personal & Professional Custom Workflow Consultation CTA */}
      <CustomWorkflowCTA themeMode={themeMode} />

    </div>
  );
}
