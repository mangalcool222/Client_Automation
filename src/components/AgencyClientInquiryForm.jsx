import React, { useState } from 'react';
import { Send, CheckCircle2, Building2, Phone, Mail, User, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgencyClientInquiryForm({ themeMode = 'light' }) {
  const isLight = themeMode === 'light';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    adSpend: '₹50,000 - ₹2,000,000 / month'
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your Name and WhatsApp Phone Number.');
      return;
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
          lead_phone: formData.phone,
          phone_number: formData.phone,
          lead_email: formData.email,
          email: formData.email,
          property_interest: `GTM AGENCY CLIENT SETUP: ${formData.company || 'Direct Inquiry'}`,
          budget: formData.adSpend,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
          locale: typeof navigator !== 'undefined' ? (navigator.language || 'en-IN') : 'en-IN',
          status: 'REAL_AGENCY_CLIENT_INQUIRY'
        })
      });

      if (response.ok) {
        setStatus('success');
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
            <span className="font-bold uppercase tracking-wider">BOOK GTM INFRASTRUCTURE SETUP</span>
          </div>

          <h3 className={`text-xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
            Ready to Automate Lead Conversion in Your Business?
          </h3>

          <p className={`text-xs sm:text-sm font-mono-telemetry max-w-xl mx-auto ${isLight ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
            Fill out your details below to discuss an instant lead response setup for your business.
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
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
              </div>

              {/* Company Name */}
              <div>
                <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                  <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Realty / Global SaaS"
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
                  type="text"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                    isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                  }`}
                />
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

            {/* Monthly Ad Spend / Requirement */}
            <div>
              <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
                Est. Monthly Ad Spend / Lead Volume
              </label>
              <select
                value={formData.adSpend}
                onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                className={`w-full border rounded px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                  isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] focus:border-[#0284C7]' : 'bg-[#08090C] border-[#1E222D] text-[#F1F3F7] focus:border-[#3B82F6]'
                }`}
              >
                <option value="₹50,000 - ₹200,000 / month">₹50,000 - ₹2,00,000 / month (Standard)</option>
                <option value="₹200,000 - ₹1,000,000 / month">₹2,00,000 - ₹10,00,000 / month (High Growth)</option>
                <option value="₹1,000,000+ / month">₹10,00,000+ / month (Enterprise Scale)</option>
                <option value="One-Time Setup Only">One-Time Infrastructure Setup ($1,500 - $2,000)</option>
              </select>
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
                    <span>Book Automation Setup</span>
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
