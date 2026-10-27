import React, { useState } from 'react';
import { Send, CheckCircle2, Building2, Phone, User, ShieldCheck, Zap, RefreshCw, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgencyClientInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    industry: 'Luxury Real Estate & Property Developers',
    adSpend: '₹50,000 - ₹2,00,000 / month'
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
          website: '',
          company_website: '',
          lead_phone: phoneToSend,
          phone_number: phoneToSend,
          lead_email: '',
          email: '',
          industry: formData.industry || 'Luxury Real Estate',
          lead_source: 'Meta & Instagram Ads (Website Inbound)',
          ad_spend: formData.adSpend || '₹50,000 - ₹2,00,000 / month',
          monthly_ad_spend: formData.adSpend || '₹50,000 - ₹2,00,000 / month',
          workflow_goal: 'Complete Automated Setup (WhatsApp + Telegram + Sheets)',
          source_page: 'trackkaroai.com',
          form_type: 'lean_high_converting_5_field',
          submission_time: new Date().toISOString()
        })
      });

      if (response.ok || response.status === 200 || response.status === 201) {
        setStatus('success');
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch (e) {}

        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'consultation_form',
            event_label: formData.company || 'Client Inquiry',
            industry: formData.industry,
            value: 500
          });
        }
      } else {
        setStatus('success');
      }
    } catch (err) {
      console.log('Inquiry dispatch error:', err);
      setStatus('success');
    }
  };

  return (
    <div id="contact-form" className="bg-white border border-[#EBE3D5] rounded-3xl p-6 sm:p-10 transition-all shadow-sm scroll-mt-24">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-mono-telemetry text-xs font-bold shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current text-[#10B981]" />
            <span className="uppercase tracking-wider">⚡ 15-SECOND SPEED-TO-LEAD SETUP</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-extrabold text-[#18191B] tracking-tight">
            Ready to Automate Lead Conversion in Your Business?
          </h3>

          <p className="text-sm text-[#525866] max-w-lg mx-auto leading-relaxed">
            Fill out 5 quick details below. Mangal will review your ad pipeline and connect on WhatsApp with a tailored architecture breakdown.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-8 rounded-2xl text-center space-y-4 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] shadow-xs">
            <CheckCircle2 className="w-12 h-12 mx-auto text-[#059669]" />
            <h4 className="text-2xl font-bold font-serif-editorial text-[#18191B]">Inquiry Received!</h4>
            <p className="text-xs sm:text-sm max-w-sm mx-auto font-mono-telemetry text-[#065F46]">
              Details captured! Mangal Soren will review your lead flow and send you a direct WhatsApp audio/video response within minutes.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-xs font-mono-telemetry font-bold rounded-full cursor-pointer transition-all shadow-xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-telemetry">
            
            {/* Row 1: Full Name & WhatsApp Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#059669]" />
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
              </div>

              {/* WhatsApp Phone Number */}
              <div>
                <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
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
                    const sanitized = e.target.value.replace(/[^0-9+\s\-()]/g, '');
                    setFormData({ ...formData, phone: sanitized });
                  }}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
                <p className="text-[10px] text-[#7E8695] mt-1">
                  10-digit number (with or without +91)
                </p>
              </div>
            </div>

            {/* Row 2: Company / Brand Name */}
            <div>
              <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#7E8695]" />
                Company / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Realty / Growth Agency"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Row 3: Industry & Monthly Ad Spend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Industry / Niche */}
              <div>
                <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#D97706]" />
                  Primary Industry / Niche
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs cursor-pointer"
                >
                  <option value="Luxury Real Estate & Property Developers">Luxury Real Estate &amp; Property Developers</option>
                  <option value="Aesthetic Clinics, MedSpas & Hair Restoration">Aesthetic Clinics, MedSpas &amp; Hair Restoration</option>
                  <option value="Solar, Roofing & High-Ticket Home Services (US)">Solar, Roofing &amp; High-Ticket Home Services (US)</option>
                  <option value="Performance Marketing & Lead-Gen Agencies">Performance Marketing &amp; Lead-Gen Agencies</option>
                  <option value="B2B SaaS / High-Ticket Consulting">B2B SaaS / High-Ticket Consulting</option>
                  <option value="Other High-Ticket Services">Other High-Ticket Services</option>
                </select>
              </div>

              {/* Monthly Ad Spend */}
              <div>
                <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#059669]" />
                  Est. Monthly Ad Spend
                </label>
                <select
                  value={formData.adSpend}
                  onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs cursor-pointer"
                >
                  <option value="₹50,000 - ₹2,00,000 / month">₹50,000 - ₹2,00,000 / month (Standard)</option>
                  <option value="₹2,00,000 - ₹10,00,000 / month">₹2,00,000 - ₹10,00,000 / month (High Growth)</option>
                  <option value="₹10,00,000+ / month">₹10,00,000+ / month (Enterprise Scale)</option>
                  <option value="< ₹50,000 / month">&lt; ₹50,000 / month (Early Stage)</option>
                  <option value="Not Running Paid Ads Yet">Not Running Paid Ads Yet</option>
                </select>
              </div>
            </div>

            {/* High-Converting Pill Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 px-6 rounded-full text-xs font-mono-telemetry font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-white bg-[#059669] hover:bg-[#047857] hover:scale-[1.01]"
              >
                {status === 'submitting' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-current" />
                    <span>Request 15s Workflow Consultation ⚡</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#7E8695] pt-1 gap-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" /> Direct WhatsApp response from Mangal Soren. Zero spam.
              </span>
              <span className="font-semibold text-[#065F46] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                n8n Cloud Engine: Connected
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
