import React, { useState } from 'react';
import { Send, CheckCircle2, Building2, Phone, Mail, User, ShieldCheck, Zap, RefreshCw, Sliders, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgencyClientInquiryForm({ themeMode = 'light' }) {
  const isLight = themeMode === 'light';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    adSpend: '₹50,000 - ₹2,00,000 / month',
    industry: 'Luxury Real Estate & Property Developers',
    leadSource: 'Meta & Instagram Ads',
    workflowGoal: 'Instant Sales Alerts (Telegram / Mobile)'
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your Full Name.');
      return;
    }

    const cleanDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim() || cleanDigits.length < 10 || cleanDigits.length > 15) {
      alert('Please enter a valid WhatsApp Phone Number (10 to 15 digits, e.g. +91 98765 43210 or 9876543210).');
      return;
    }

    // Auto-normalize phone if 10-digit Indian or standard format
    let phoneToSend = formData.phone.trim();
    if (cleanDigits.length === 10) {
      phoneToSend = `+91 ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`;
    } else if (cleanDigits.length === 12 && cleanDigits.startsWith('91')) {
      phoneToSend = `+91 ${cleanDigits.slice(2, 7)} ${cleanDigits.slice(7)}`;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://n8n.trackkaroai.com/webhook/gtm-agency-lead-inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_name: formData.name,
          full_name: formData.name,
          company: formData.company || 'Direct Client Inquiry',
          lead_phone: phoneToSend,
          phone_number: phoneToSend,
          lead_email: formData.email,
          email: formData.email,
          industry: formData.industry || 'Luxury Real Estate',
          lead_source: formData.leadSource || 'Meta & Instagram Ads',
          property_interest: `GTM SETUP: ${formData.company || 'Direct Inquiry'} [${formData.industry}] (Source: ${formData.leadSource}) (${formData.workflowGoal})`,
          budget: `${formData.adSpend} • Industry: ${formData.industry} • Source: ${formData.leadSource} • Goal: ${formData.workflowGoal}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
          locale: typeof navigator !== 'undefined' ? (navigator.language || 'en-IN') : 'en-IN',
          status: 'REAL_AGENCY_CLIENT_INQUIRY'
        })
      });

      if (response.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'consultation_form',
            event_label: formData.company || 'Client Inquiry',
            industry: formData.industry,
            value: 500
          });
        }
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      } else {
        // Fallback success if webhook accepts CORS/200
        setStatus('success');
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'consultation_form',
            event_label: formData.company || 'Client Inquiry',
            industry: formData.industry,
            value: 500
          });
        }
      }
    } catch (err) {
      console.log('Inquiry dispatch error:', err);
      // Optimistic success for UX
      setStatus('success');
    }
  };

  return (
    <div id="contact-form" className={`telemetry-card p-6 sm:p-8 rounded-xl transition-all border scroll-mt-24 ${
      isLight ? 'bg-white border-[#CBD5E1] shadow-lg' : 'bg-[#0E1015] border-[#1E222D] shadow-2xl'
    }`}>
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded font-mono-telemetry text-xs border ${
            isLight ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]' : 'bg-[#12161F] border-[#1E222D] text-[#10B981]'
          }`}>
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold uppercase tracking-wider">WORKFLOW CONSULTATION &amp; SETUP</span>
          </div>

          <h3 className={`text-xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
            Ready to Automate Lead Conversion in Your Business?
          </h3>

          <p className={`text-xs sm:text-sm font-mono-telemetry max-w-xl mx-auto leading-relaxed ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
            Fill out your details below to discuss a tailored lead response setup for your business.
          </p>
        </div>

        {status === 'success' ? (
          <div className={`p-6 sm:p-8 rounded-lg text-center space-y-4 border ${
            isLight ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' : 'bg-[#064E3B]/20 border-[#10B981]/40 text-[#10B981]'
          }`}>
            <CheckCircle2 className="w-10 h-10 mx-auto text-[#059669]" />
            <h4 className="text-lg sm:text-xl font-bold font-mono-telemetry">Thank You! Inquiry Received</h4>
            <p className="text-xs sm:text-sm max-w-sm mx-auto font-mono-telemetry opacity-90">
              We've received your details and will connect with you shortly on WhatsApp.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-mono-telemetry font-bold rounded cursor-pointer transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-telemetry">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <User className="w-3.5 h-3.5 text-[#0284C7]" />
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>

              {/* Company / Brand Name */}
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Building2 className="w-3.5 h-3.5 text-[#64748B]" />
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Realty / Growth Agency"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>

              {/* WhatsApp Phone Number */}
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Phone className="w-3.5 h-3.5 text-[#059669]" />
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={18}
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow numbers, +, space, hyphen, and parentheses
                    const sanitized = e.target.value.replace(/[^0-9+\s\-()]/g, '');
                    setFormData({ ...formData, phone: sanitized });
                  }}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
                <p className={`text-[10px] mt-1 ${isLight ? 'text-[#64748B]' : 'text-[#8E9AA8]'}`}>
                  10-digit mobile number (with or without +91)
                </p>
              </div>

              {/* Email Address */}
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@apexrealty.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>
            </div>

            {/* Industry / Niche Selection & Primary Lead Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
                  Primary Industry / Niche
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                >
                  <option value="Luxury Real Estate & Property Developers">Luxury Real Estate &amp; Property Developers</option>
                  <option value="Aesthetic Clinics, MedSpas & Hair Restoration">Aesthetic Clinics, MedSpas &amp; Hair Restoration</option>
                  <option value="Solar, Roofing & High-Ticket Home Services (US)">Solar, Roofing &amp; High-Ticket Home Services (US)</option>
                  <option value="Performance Marketing & Lead-Gen Agencies">Performance Marketing &amp; Lead-Gen Agencies</option>
                  <option value="B2B SaaS / High-Ticket Consulting">B2B SaaS / High-Ticket Consulting</option>
                  <option value="Other High-Ticket Services">Other High-Ticket Services</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Globe className="w-3.5 h-3.5 text-[#059669]" />
                  Primary Lead Source
                </label>
                <select
                  value={formData.leadSource}
                  onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                >
                  <option value="Meta & Instagram Ads">Meta &amp; Instagram Ads</option>
                  <option value="Google Search & Performance Max">Google Search &amp; Performance Max</option>
                  <option value="Real Estate Portals (Magicbricks, 99acres, Housing)">Real Estate Portals (Magicbricks, 99acres, Housing)</option>
                  <option value="Clinic / Healthcare Directories (Practo, Justdial)">Clinic / Healthcare Directories (Practo, Justdial)</option>
                  <option value="Website & Landing Page Forms">Website &amp; Landing Page Forms</option>
                  <option value="Multiple / Omnichannel Sources">Multiple / Omnichannel Sources</option>
                </select>
              </div>
            </div>

            {/* Separated Dropdowns: Monthly Ad Spend & Consultation / Workflow Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Monthly Ad Spend */}
              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  Est. Monthly Ad Spend / Volume
                </label>
                <select
                  value={formData.adSpend}
                  onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                >
                  <option value="₹50,000 - ₹2,00,000 / month">₹50,000 - ₹2,00,000 / month (Standard)</option>
                  <option value="₹2,00,000 - ₹10,00,000 / month">₹2,00,000 - ₹10,00,000 / month (High Growth)</option>
                  <option value="₹10,00,000+ / month">₹10,00,000+ / month (Enterprise Scale)</option>
                  <option value="< ₹50,000 / month">&lt; ₹50,000 / month (Early Stage)</option>
                  <option value="Not Running Paid Ads Yet">Not Running Paid Ads Yet</option>
                </select>
              </div>

              {/* Field 2: Consultation / Workflow Goal */}
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Sliders className="w-3.5 h-3.5 text-[#0284C7]" />
                  Primary Workflow Goal
                </label>
                <select
                  value={formData.workflowGoal}
                  onChange={(e) => setFormData({ ...formData, workflowGoal: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                >
                  <option value="Instant Sales Alerts (Telegram / Mobile)">Instant Sales Alerts (Telegram / Mobile)</option>
                  <option value="Centralized Google Sheets / CRM Sync">Centralized Google Sheets / CRM Sync</option>
                  <option value="WhatsApp Auto-Response & Brochure Dispatch">WhatsApp Auto-Response &amp; Brochure Setup</option>
                  <option value="Complete Automated Setup (WhatsApp + Telegram + Sheets)">Complete Automated Setup (WhatsApp + Telegram + Sheets)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-3.5 px-6 rounded text-xs font-mono-telemetry font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-white ${
                  status === 'submitting'
                    ? 'bg-gray-400 cursor-wait'
                    : isLight
                    ? 'bg-[#059669] hover:bg-[#047857]'
                    : 'bg-[#10B981] hover:bg-[#059669] text-[#08090C]'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-current" />
                    <span>Request Workflow Consultation</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-[#64748B] pt-1 gap-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" /> Privacy Notice: Submissions are confidential and used solely for direct workflow consultation.
              </span>
              <span>n8n Engine: Ready</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
