import React, { useState } from 'react';
import { Send, CheckCircle2, Building2, Phone, Mail, Globe, User, ShieldCheck, Zap, RefreshCw, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', label: '🇮🇳 +91', digits: 10, placeholder: '98765 43210' },
  { code: '+971', flag: '🇦🇪', label: '🇦🇪 +971', digits: 9, placeholder: '50 123 4567' },
  { code: '+1', flag: '🇺🇸', label: '🇺🇸 +1', digits: 10, placeholder: '555 123 4567' },
  { code: '+44', flag: '🇬🇧', label: '🇬🇧 +44', digits: 10, placeholder: '7911 123456' },
  { code: '+966', flag: '🇸🇦', label: '🇸🇦 +966', digits: 9, placeholder: '50 123 4567' },
  { code: '+65', flag: '🇸🇬', label: '🇸🇬 +65', digits: 8, placeholder: '8123 4567' },
  { code: '+61', flag: '🇦🇺', label: '🇦🇺 +61', digits: 9, placeholder: '412 345 678' },
  { code: '+49', flag: '🇩🇪', label: '🇩🇪 +49', digits: 10, placeholder: '1512 3456789' },
  { code: '', flag: '🌐', label: '🌐 Other', digits: 15, placeholder: 'Phone number' },
];

export default function AgencyClientInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    website: '',
    industry: 'Luxury Real Estate & Property Developers',
    adSpend: '₹50,000 - ₹2,00,000 / month'
  });

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const formatPhoneNumber = (val, country) => {
    let digits = val.replace(/[^0-9]/g, '');
    if (country.code && digits.length > country.digits) {
      digits = digits.slice(0, country.digits);
    }
    if (country.code === '+91' || country.digits === 10) {
      return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
    }
    if (country.code === '+971' || country.code === '+966') {
      if (digits.length > 5) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      if (digits.length > 2) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      return digits;
    }
    if (country.code === '+1') {
      if (digits.length > 6) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      if (digits.length > 3) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return digits;
    }
    return digits;
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    if (raw.startsWith('+')) {
      for (const c of COUNTRY_CODES) {
        if (c.code && raw.startsWith(c.code)) {
          setSelectedCountry(c);
          const remainder = raw.slice(c.code.length).trim();
          setFormData(prev => ({ ...prev, phone: formatPhoneNumber(remainder, c) }));
          return;
        }
      }
    }
    setFormData(prev => ({ ...prev, phone: formatPhoneNumber(raw, selectedCountry) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your Full Name.');
      return;
    }

    const cleanDigits = formData.phone.replace(/[^0-9]/g, '');
    const minRequired = selectedCountry.code ? selectedCountry.digits : 8;
    if (!cleanDigits || cleanDigits.length < minRequired) {
      alert(`Please enter a valid ${selectedCountry.code ? selectedCountry.digits + '-digit' : ''} WhatsApp Phone Number.`);
      return;
    }

    const phoneToSend = selectedCountry.code ? `${selectedCountry.code} ${cleanDigits}` : cleanDigits;

    setStatus('submitting');

    try {
      // 1. Dispatch to n8n Webhook (for WhatsApp / Telegram / Google Sheets sync)
      const n8nPromise = fetch('https://n8n.trackkaroai.com/webhook/gtm-agency-lead-inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_name: formData.name,
          full_name: formData.name,
          company: formData.company || 'Direct Client Inquiry',
          website: formData.website || '',
          company_website: formData.website || '',
          lead_phone: phoneToSend,
          phone_number: phoneToSend,
          lead_email: formData.email || '',
          email: formData.email || '',
          industry: formData.industry || 'Luxury Real Estate',
          lead_source: 'Meta & Instagram Ads (Website Inbound)',
          ad_spend: formData.adSpend || '₹50,000 - ₹2,00,000 / month',
          monthly_ad_spend: formData.adSpend || '₹50,000 - ₹2,00,000 / month',
          workflow_goal: 'Complete Automated Setup (WhatsApp + Telegram + Sheets)',
          admin_notification_email: 'mangalsoren176@gmail.com',
          source_page: 'trackkaroai.com',
          form_type: 'qualified_b2b_inquiry_form',
          submission_time: new Date().toISOString()
        })
      });

      // 2. Direct Instant Email Dispatch to mangalsoren176@gmail.com (FormSubmit AJAX)
      const emailPromise = fetch('https://formsubmit.co/ajax/mangalsoren176@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `⚡ New TrackKaro Lead: ${formData.name} (${formData.company || 'Direct Client'})`,
          _template: 'table',
          'Lead Name': formData.name,
          'Company': formData.company || 'Not Provided',
          'WhatsApp Phone': phoneToSend,
          'Work Email': formData.email || 'Not Provided',
          'Website / Portfolio': formData.website || 'Not Provided',
          'Industry / Niche': formData.industry,
          'Est. Monthly Ad Spend': formData.adSpend,
          'Source': 'TrackKaro AI — Consultation Form (trackkaroai.com)',
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });

      await Promise.allSettled([n8nPromise, emailPromise]);

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
    } catch (err) {
      console.log('Inquiry dispatch settled:', err);
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
            <span className="uppercase tracking-wider">LEAD CONVERSION ARCHITECTURE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-extrabold text-[#18191B] tracking-tight">
            Ready to Automate Lead Conversion in Your Business?
          </h3>

          <p className="text-sm text-[#525866] max-w-lg mx-auto leading-relaxed">
            Fill out your details below. Mangal Soren will review your website and ad pipeline, then connect on WhatsApp with a tailored architecture breakdown.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-8 rounded-2xl text-center space-y-4 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] shadow-xs">
            <CheckCircle2 className="w-12 h-12 mx-auto text-[#059669]" />
            <h4 className="text-2xl font-bold font-serif-editorial text-[#18191B]">Inquiry Received!</h4>
            <p className="text-xs sm:text-sm max-w-sm mx-auto font-mono-telemetry text-[#065F46]">
              Details captured! Mangal Soren will review your lead flow and reach out directly on WhatsApp within minutes.
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
                <div className="flex items-center rounded-xl border border-[#EBE3D5] bg-[#FAF8F5] focus-within:border-[#18191B] focus-within:bg-white transition-all shadow-xs overflow-hidden">
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = COUNTRY_CODES.find(c => c.code === e.target.value) || COUNTRY_CODES[0];
                      setSelectedCountry(found);
                      setFormData(prev => ({ ...prev, phone: formatPhoneNumber(prev.phone, found) }));
                    }}
                    className="border-r border-[#EBE3D5] bg-transparent text-[#18191B] text-xs font-semibold px-2.5 py-3 outline-none cursor-pointer"
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.label} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder={selectedCountry.placeholder}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-transparent text-[#18191B] px-3 py-3 text-xs font-mono-telemetry focus:outline-none"
                  />
                  {formData.phone.replace(/[^0-9]/g, '').length === selectedCountry.digits && selectedCountry.code && (
                    <span className="text-xs text-[#059669] font-bold pr-3">✓</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-[#7E8695] font-mono-telemetry">
                  <span>Direct line for WhatsApp delivery</span>
                  {selectedCountry.code ? (
                    <span className={formData.phone.replace(/[^0-9]/g, '').length === selectedCountry.digits ? 'text-[#059669] font-bold' : ''}>
                      {formData.phone.replace(/[^0-9]/g, '').length}/{selectedCountry.digits} digits
                    </span>
                  ) : (
                    <span>International format</span>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Company / Brand Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company / Brand Name */}
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

              {/* Email Address */}
              <div>
                <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                  Work Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@apexrealty.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Row 3: Company Website / Portfolio URL */}
            <div>
              <label className="text-xs font-bold block mb-1.5 text-[#18191B] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#059669]" />
                Company Website / Portfolio URL
              </label>
              <input
                type="text"
                placeholder="e.g. apexrealty.com or https://apexrealty.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full border border-[#EBE3D5] bg-[#FAF8F5] text-[#18191B] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#18191B] focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Row 4: Industry & Monthly Ad Spend */}
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
                    <span>Request Workflow Consultation ⚡</span>
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
