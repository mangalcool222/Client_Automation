import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Bot, CheckCircle2, Clock, Cpu, MessageSquare, Play, Send, 
  ShieldCheck, Sparkles, UserCheck, Zap, Radio, Database, Layers, 
  LayoutTemplate, Smartphone, RefreshCw, AlertCircle, Mail, User, Check, 
  FileText, ExternalLink, PhoneCall, CheckCheck, Building2, Building, Briefcase, Sun, Moon, Stethoscope
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
  const [themeMode, setThemeMode] = useState('light'); // 'light' (default for real estate/clinics) | 'dark'
  const [pipelineState, setPipelineState] = useState('idle'); // idle | processing | complete
  const [activeNodeStep, setActiveNodeStep] = useState(0);
  const [logs, setLogs] = useState([]);

  // Sync theme attribute to document body for global background transition
  useEffect(() => {
    if (themeMode === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [themeMode]);

  const handleSelectTemplate = (template) => {
    setActiveTemplate(template.id);
    setFormData(template.data);
    setCurrencyMode(template.currency);
    setPipelineState('idle');
    setActiveNodeStep(0);
    setLogs([]);
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
  };

  const handleTriggerPipeline = async () => {
    if (!formData.name || !formData.phone) {
      alert('Please enter a Prospect Name and Phone Number to test the demo.');
      return;
    }

    setPipelineState('processing');
    setActiveNodeStep(1);
    setLogs([]);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'test_simulator', {
        event_category: 'engagement',
        event_label: activeTemplate.name || 'Simulator Test',
        template_id: activeTemplate.id
      });
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    // Simulation purely executes on-screen visual telemetry (zero external webhook pings)

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
      setLogs((prev) => [
        ...prev,
        `[${timestamp}] WHATSAPP PREVIEW: Formatted auto-reply payload (requires provider configuration for Meta / AiSensy)`,
      ]);
    }, 1200);

    // Step 4: Telegram SLA Alert
    setTimeout(() => {
      setActiveNodeStep(4);
      setLogs((prev) => [
        ...prev,
        `[${timestamp}] TELEGRAM ALERT: Generated instant notification layout for sales channel`,
      ]);
    }, 1700);

    // Step 5: CRM Sync
    setTimeout(() => {
      setActiveNodeStep(5);
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

  const isLight = themeMode === 'light';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      
      {/* Systems Architect Header */}
      <header className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 telemetry-card p-4 transition-all ${
        isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E1015] border-[#1E222D]'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded border flex items-center justify-center font-bold text-sm font-mono-telemetry ${
            isLight ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#141720] border-[#2E3648] text-[#F1F3F7]'
          }`}>
            MS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-base tracking-tight ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                MANGAL SOREN
              </h1>
              <span className={`text-[10px] font-mono-telemetry px-2 py-0.5 rounded border uppercase tracking-wider ${
                isLight ? 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]' : 'bg-[#1E222D] text-[#94A3B8] border-[#2E3648]'
              }`}>
                Lead Automation &amp; GTM Workflows
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-mono-telemetry flex items-center gap-1.5 mt-0.5">
              <span>TrackKaro Lead Routing Console</span>
              <span>•</span>
              <span className={isLight ? 'text-[#059669]' : 'text-[#10B981]'}>Fully Managed Cloud Infrastructure</span>
            </p>
          </div>
        </div>

        {/* Currency Switcher, Theme Switcher & Direct Contact */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            className={`px-3 py-1 rounded text-xs font-mono-telemetry font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              isLight 
                ? 'bg-[#F1F5F9] text-[#0F172A] border-[#CBD5E1] hover:bg-[#E2E8F0]' 
                : 'bg-[#141720] text-[#F1F3F7] border-[#2E3648] hover:bg-[#1E222D]'
            }`}
            title="Toggle between Luxury Architectural Light Mode and Industrial Carbon Dark Mode"
          >
            {isLight ? <Sun className="w-3.5 h-3.5 text-[#D97706]" /> : <Moon className="w-3.5 h-3.5 text-[#3B82F6]" />}
            <span>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

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
            className={`hidden md:flex items-center gap-2 border px-3.5 py-1.5 rounded text-xs font-mono-telemetry cursor-pointer transition-all ${
              isLight 
                ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border-[#CBD5E1]' 
                : 'bg-[#141720] hover:bg-[#1E222D] text-[#F1F3F7] border-[#2E3648]'
            }`}
          >
            <User className={`w-3.5 h-3.5 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
            Direct Email
          </a>
        </div>
      </header>

      {/* Hero Container */}
      <div className={`telemetry-card p-6 sm:p-10 text-center space-y-6 transition-all border rounded-xl ${
        isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-[#0E1015] border-[#1E222D] shadow-xl'
      }`}>
        
        {/* Positioning Pill Tag */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded font-mono-telemetry text-xs border ${
          isLight 
            ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]' 
            : 'bg-[#12161F] border-[#1E222D] text-[#10B981]'
        }`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-[#059669]' : 'bg-[#10B981]'}`}></span>
          <span className="font-bold uppercase tracking-wider">OMNICHANNEL LEAD ROUTING &amp; INSTANT SALES DISPATCH</span>
        </div>

        {/* Problem-First Headline */}
        <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto ${
          isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'
        }`}>
          Stop Losing Inbound Leads to Slow Follow-Ups.
        </h2>

        {/* Punchy Client-First Hero Statement */}
        <p className={`text-xs sm:text-base font-mono-telemetry max-w-3xl mx-auto leading-relaxed ${
          isLight ? 'text-[#334155]' : 'text-[#CBD5E1]'
        }`}>
          Connect your paid ads, website forms, and listing portals directly to your sales reps' phones. Instant Telegram audio alerts with 1-click dial buttons, automated WhatsApp brochure delivery, and centralized Google Sheets sync. Zero spreadsheet checking.
        </p>

        {/* Simulation Callout & Action CTAs */}
        <div className="pt-2 space-y-4">
          <p className={`text-xs font-mono-telemetry ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`}>
            Start with a live pipeline simulation below to see how the workflow is structured.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#demo-section"
              className="w-full sm:w-auto px-6 py-3 rounded text-xs font-mono-telemetry font-bold transition-all cursor-pointer shadow-sm bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test the Demo</span>
            </a>

            <a
              href="#contact-form"
              className={`w-full sm:w-auto px-6 py-3 rounded text-xs font-mono-telemetry font-bold transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                isLight 
                  ? 'bg-white hover:bg-[#F1F5F9] text-[#0F172A] border-[#CBD5E1]' 
                  : 'bg-[#141720] hover:bg-[#1E222D] text-[#F1F3F7] border-[#2E3648]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
              <span>Discuss Your Lead Workflow</span>
            </a>
          </div>

          {/* Subtle Infrastructure Proof */}
          <div className={`text-[11px] font-mono-telemetry pt-2 flex items-center justify-center gap-1.5 ${isLight ? 'text-[#0369A1]' : 'text-[#38BDF8]'}`}>
            <span>🛡️ Non-Invasive Integration: Connects parallel to your existing CRM &amp; Ads · Zero downtime · Nothing replaced</span>
          </div>
        </div>

        {/* Sample Preset Selector */}
        <div className="pt-2 max-w-4xl mx-auto">
          <div className={`text-[10px] font-mono-telemetry uppercase tracking-wider mb-2 ${isLight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
            Select Sample Preset Payload:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {templates.map((tpl) => {
              const TplIcon = tpl.icon;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`px-3 py-2.5 rounded text-xs font-mono-telemetry font-bold transition-all border cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTemplate === tpl.id
                      ? isLight ? 'bg-[#F1F5F9] text-[#0F172A] border-[#0284C7]' : 'bg-[#141720] text-[#F1F3F7] border-[#3B82F6]'
                      : isLight ? 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:text-[#0F172A]' : 'bg-[#0E1015] text-[#64748B] border-[#1E222D] hover:border-[#2E3648] hover:text-[#F1F3F7]'
                  }`}
                >
                  <TplIcon className={`w-3.5 h-3.5 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
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
          <div className={`telemetry-card p-5 space-y-4 transition-all ${isLight ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E1015] border-[#1E222D]'}`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-[#E2E8F0]' : 'border-[#1E222D]'}`}>
              <div>
                <span className={`text-xs font-bold flex items-center gap-2 font-mono-telemetry ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Zap className={`w-4 h-4 ${isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}`} />
                  INTERACTIVE PIPELINE SIMULATION
                </span>
                <span className={`text-[10px] font-mono-telemetry block mt-0.5 leading-tight ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                  Simulate lead routing on-screen. See how incoming lead data triggers normalization, sales alerts, and CRM sync.
                </span>
              </div>
              <button
                onClick={handleClearForm}
                className={`text-[10px] font-mono-telemetry underline cursor-pointer ${isLight ? 'text-[#64748B] hover:text-[#0F172A]' : 'text-[#64748B] hover:text-[#F1F3F7]'}`}
              >
                Reset
              </button>
            </div>

            <div className="space-y-3 font-mono-telemetry">
              <div>
                <label className={`text-[11px] block mb-1 ${isLight ? 'text-[#475569]' : 'text-[#767E8F]'}`}>Prospect Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border rounded px-3 py-2 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[11px] block mb-1 ${isLight ? 'text-[#475569]' : 'text-[#767E8F]'}`}>WhatsApp Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. +971 50 000 9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full border rounded px-3 py-2 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[11px] block mb-1 ${isLight ? 'text-[#475569]' : 'text-[#767E8F]'}`}>Project / Enquiry Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Dubai Marina Luxury Off-Plan Penthouse"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className={`w-full border rounded px-3 py-2 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[11px] block mb-1 ${isLight ? 'text-[#475569]' : 'text-[#767E8F]'}`}>Stated Investment Range</label>
                <input
                  type="text"
                  placeholder="e.g. $850,000 - $1.5M"
                  value={currencyMode === 'USD' ? formData.budgetUSD : formData.budgetINR}
                  onChange={(e) =>
                    currencyMode === 'USD'
                      ? setFormData({ ...formData, budgetUSD: e.target.value })
                      : setFormData({ ...formData, budgetINR: e.target.value })
                  }
                  className={`w-full border rounded px-3 py-2 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>
            </div>

            {/* Execute Button */}
            <div className="pt-2">
              {pipelineState === 'processing' ? (
                <button
                  disabled
                  className={`w-full font-bold py-3 rounded text-xs font-mono-telemetry flex items-center justify-center gap-2 cursor-wait border ${
                    isLight ? 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]' : 'bg-[#141720] text-[#767E8F] border-[#1E222D]'
                  }`}
                >
                  <RefreshCw className="w-4 h-4 text-[#D97706] animate-spin" />
                  Simulating Pipeline Flow...
                </button>
              ) : pipelineState === 'complete' ? (
                <button
                  onClick={handleReset}
                  className={`w-full font-bold py-3 rounded text-xs font-mono-telemetry flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    isLight ? 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border-[#CBD5E1]' : 'bg-[#141720] hover:bg-[#1E222D] text-white border-[#2E3648]'
                  }`}
                >
                  Reset Simulation Session
                </button>
              ) : (
                <button
                  onClick={handleTriggerPipeline}
                  className={`w-full font-bold py-3 rounded text-xs font-mono-telemetry flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-white ${
                    isLight ? 'bg-[#0284C7] hover:bg-[#0369A1] border border-[#0284C7]' : 'bg-[#3B82F6] hover:bg-[#2563EB] border border-[#3B82F6]/50'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Run Pipeline Simulation
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 3 Live Output Channels + Telemetry Drawer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: WhatsApp Business Chat Mockup */}
            <div className={`p-3.5 space-y-2.5 flex flex-col justify-between min-h-[380px] rounded border ${
              isLight ? 'bg-[#E5DDD5] border-[#CBD5E1]' : 'phone-glass-frame'
            }`}>
              <div className={`rounded p-2 border flex items-center justify-between font-mono-telemetry ${
                isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'bg-[#0E1015] border-[#1E222D]'
              }`}>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded bg-[#059669]/20 border border-[#059669]/30 flex items-center justify-center text-[#059669] font-bold text-[10px]">
                    TK
                  </div>
                  <div>
                    <div className={`text-[11px] font-bold truncate max-w-[100px] ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>TrackKaro Systems</div>
                    <div className="text-[9px] text-[#059669]">WhatsApp Integration</div>
                  </div>
                </div>
                <span className={`text-[8px] px-1.5 py-0.5 rounded ${isLight ? 'bg-[#F1F5F9] text-[#64748B]' : 'bg-[#141720] text-[#767E8F]'}`}>Configurable Module</span>
              </div>

              <div className="space-y-2 py-1 flex-1 flex flex-col justify-end">
                <div className={`rounded p-2.5 text-[11px] space-y-2 shadow-sm ${
                  isLight ? 'bg-[#DCF8C6] border border-[#BBF7D0] text-[#0F172A]' : 'bg-[#0b141a] border border-[#10B981]/30 text-[#F1F3F7]'
                }`}>
                  <div className="leading-tight">
                    Hello <span className="font-bold text-[#059669]">{formData.name}</span>! Here is your requested brochure.
                  </div>

                  <div className={`rounded p-2 flex items-center justify-between gap-1.5 font-mono-telemetry ${
                    isLight ? 'bg-white border border-[#E2E8F0]' : 'bg-[#0E1015] border border-[#10B981]/40'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                      <div>
                        <div className={`text-[10px] font-bold truncate max-w-[90px] ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                          {(formData.project || '').includes('Solar') ? 'Solar_Quote.pdf' : (formData.project || '').includes('Hair') || (formData.project || '').includes('Clinic') ? 'Procedure_Guide.pdf' : (formData.project || '').includes('Audit') ? 'Pipeline_Spec.pdf' : 'Project_Brochure.pdf'}
                        </div>
                        <div className="text-[8px] text-[#64748B]">
                          {(formData.project || '').includes('Solar') ? 'System Assessment' : (formData.project || '').includes('Hair') || (formData.project || '').includes('Clinic') ? 'Treatment Pricing' : (formData.project || '').includes('Audit') ? 'Architecture Spec' : 'Digital Floorplan'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] text-[#059669] bg-[#059669]/15 px-1.5 py-0.5 rounded font-bold">PDF</span>
                  </div>

                  <div className="flex items-center justify-between text-[8px] text-[#64748B] font-mono-telemetry pt-0.5">
                    <span>Simulated Dispatch</span>
                    <span className="text-[#059669]">Configurable API</span>
                  </div>
                </div>

                <div className={`text-[9px] text-center font-mono-telemetry p-1.5 rounded ${
                  isLight ? 'bg-white/80 text-[#64748B]' : 'bg-[#0E1015]/80 text-[#94A3B8]'
                }`}>
                  Requires Meta / AiSensy WABA Setup
                </div>
              </div>
            </div>

            {/* Card 2: Desktop Telegram SLA Alert Mockup */}
            <div className={`p-3.5 space-y-2.5 flex flex-col justify-between rounded border ${
              isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'telegram-desktop-frame'
            }`}>
              <div>
                <div className={`flex items-center justify-between border-b pb-2 font-mono-telemetry ${isLight ? 'border-[#E2E8F0]' : 'border-[#1E222D]'}`}>
                  <div className="flex items-center gap-1.5">
                    <Radio className={`w-3.5 h-3.5 animate-pulse ${isLight ? 'text-[#D97706]' : 'text-[#F59E0B]'}`} />
                    <span className={`text-[11px] font-bold ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>Telegram Sales Alert</span>
                  </div>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${isLight ? 'bg-[#059669]/15 text-[#059669]' : 'bg-[#10B981]/15 text-[#10B981]'}`}>Sample Alert</span>
                </div>

                <div className={`mt-2.5 p-2.5 rounded border space-y-1 font-mono-telemetry text-[10px] ${
                  isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#08090C] border-[#1E222D]'
                }`}>
                  <div className={`font-bold border-b pb-1 ${isLight ? 'text-[#0284C7] border-[#E2E8F0]' : 'text-[#3B82F6] border-[#1E222D]'}`}>
                    NEW LEAD INBOUND
                  </div>
                  <div className={`space-y-0.5 ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                    <div>NAME: <span className={`font-bold truncate block ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>{formData.name}</span></div>
                    <div>PHONE: <span className={isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}>{formData.phone}</span></div>
                    <div>BUDGET: <span className={`font-bold ${isLight ? 'text-[#059669]' : 'text-[#10B981]'}`}>{currencyMode === 'USD' ? formData.budgetUSD : formData.budgetINR}</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <button className={`w-full font-extrabold py-2 rounded text-[11px] font-mono-telemetry flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm text-white ${
                  isLight ? 'bg-[#059669] hover:bg-[#047857]' : 'bg-[#10B981] hover:bg-[#059669] text-[#08090C]'
                }`}>
                  <PhoneCall className="w-3 h-3 fill-current" />
                  <span>Call Lead (1-Click Link)</span>
                </button>
                <div className={`text-[9px] text-center font-mono-telemetry ${isLight ? 'text-[#64748B]' : 'text-[#767E8F]'}`}>
                  Live alert verified in bottom form
                </div>
              </div>
            </div>

            {/* Card 3: Google Sheets Live CRM Auto-Sync Panel */}
            <div className={`p-3.5 space-y-2.5 flex flex-col justify-between rounded border ${
              isLight ? 'bg-white border-[#E2E8F0] shadow-sm' : 'telegram-desktop-frame'
            }`}>
              <div>
                <div className={`flex items-center justify-between border-b pb-2 font-mono-telemetry ${isLight ? 'border-[#E2E8F0]' : 'border-[#1E222D]'}`}>
                  <div className="flex items-center gap-1.5">
                    <Database className={`w-3.5 h-3.5 ${isLight ? 'text-[#059669]' : 'text-[#10B981]'}`} />
                    <span className={`text-[11px] font-bold ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>Google Sheets CRM</span>
                  </div>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${isLight ? 'bg-[#059669]/15 text-[#059669]' : 'bg-[#10B981]/15 text-[#10B981]'}`}>Structured Row</span>
                </div>

                <div className={`mt-2.5 p-2.5 rounded border space-y-1 font-mono-telemetry text-[10px] ${
                  isLight ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#08090C] border-[#1E222D]'
                }`}>
                  <div className={`font-bold border-b pb-1 flex items-center justify-between ${
                    isLight ? 'text-[#059669] border-[#E2E8F0]' : 'text-[#10B981] border-[#1E222D]'
                  }`}>
                    <span>SAMPLE 10-COLUMN ROW</span>
                    <span className="text-[8px] text-[#64748B]">Auto Fields</span>
                  </div>
                  <div className={`space-y-0.5 ${isLight ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                    <div>DATE / TIME: <span className={isLight ? 'text-[#0284C7]' : 'text-[#3B82F6]'}>Auto-formatted (IST)</span></div>
                    <div>NAME: <span className={`font-bold truncate block ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>{formData.name}</span></div>
                    <div>PHONE: <span className="text-[#64748B]">{formData.phone}</span></div>
                    <div>STATUS: <span className={`font-bold ${isLight ? 'text-[#059669]' : 'text-[#10B981]'}`}>NEW_INQUIRY</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className={`p-2 rounded text-[9px] font-mono-telemetry text-center ${
                  isLight ? 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B]' : 'bg-[#141720] border border-[#1E222D] text-[#94A3B8]'
                }`}>
                  10 Columns: Date, Day, Time, Contact &amp; Region
                </div>
                <div className={`text-[9px] text-center font-mono-telemetry ${isLight ? 'text-[#64748B]' : 'text-[#767E8F]'}`}>
                  Live Sheet sync verified in bottom form
                </div>
              </div>
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
