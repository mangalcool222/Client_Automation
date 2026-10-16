import React from 'react';
import { MessageSquare, Mail, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import LinkedInIcon from './LinkedInIcon';

export default function CustomWorkflowCTA({ themeMode = 'light' }) {
  const isLight = themeMode === 'light';

  return (
    <div className={`telemetry-card p-6 sm:p-8 rounded-xl transition-all border ${
      isLight ? 'bg-[#F8FAFC] border-[#CBD5E1] shadow-sm' : 'bg-[#12161F] border-[#1E222D] shadow-xl'
    }`}>
      <div className="max-w-3xl mx-auto text-center space-y-5">
        
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded font-mono-telemetry text-xs border ${
          isLight ? 'bg-white border-[#CBD5E1] text-[#0284C7]' : 'bg-[#0E1015] border-[#2E3648] text-[#3B82F6]'
        }`}>
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span className="font-bold uppercase tracking-wider">TAILORED AUTOMATION CONSULTATION</span>
        </div>

        {/* Heading */}
        <h3 className={`text-xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-[#0F172A]' : 'text-[#F1F3F7]'}`}>
          Need a Similar Workflow for Your Business?
        </h3>

        {/* Personal Quote */}
        <blockquote className={`text-xs sm:text-sm font-mono-telemetry italic leading-relaxed max-w-2xl mx-auto p-4 rounded border ${
          isLight ? 'bg-white border-[#E2E8F0] text-[#334155]' : 'bg-[#08090C] border-[#1E222D] text-[#CBD5E1]'
        }`}>
          “Tell me how your leads arrive today and what happens after someone submits an enquiry. I can help map out a practical automation workflow tailored for your exact sales process.”
        </blockquote>

        {/* Engineer Identity & CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/917979816557?text=Hi%20Mangal,%20I%20want%20to%20discuss%20mapping%20out%20a%20custom%20lead%20automation%20workflow%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded text-xs font-mono-telemetry font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md bg-[#059669] hover:bg-[#047857] text-white"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Discuss on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-5 py-3 rounded text-xs font-mono-telemetry font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              isLight 
                ? 'bg-white hover:bg-[#F1F5F9] text-[#0A66C2] border-[#CBD5E1]' 
                : 'bg-[#0E1015] hover:bg-[#1E222D] text-[#0A66C2] border-[#2E3648]'
            }`}
          >
            <LinkedInIcon className="w-4 h-4 fill-[#0A66C2]" />
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href="mailto:mangal@trackkaroai.com?subject=Custom%20Workflow%20Consultation%20Inquiry"
            className={`w-full sm:w-auto px-5 py-3 rounded text-xs font-mono-telemetry font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
              isLight 
                ? 'bg-white hover:bg-[#F1F5F9] text-[#0F172A] border-[#CBD5E1]' 
                : 'bg-[#0E1015] hover:bg-[#1E222D] text-[#F1F3F7] border-[#2E3648]'
            }`}
          >
            <Mail className="w-4 h-4 text-[#0284C7]" />
            <span>Direct Email</span>
          </a>
        </div>

        <div className="text-[11px] text-[#64748B] font-mono-telemetry flex items-center justify-center gap-1.5 pt-1">
          <UserCheck className="w-3.5 h-3.5 text-[#059669]" />
          <a
            href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#0A66C2] font-semibold"
          >
            Mangal Soren
          </a>
          <span>• Lead Automation &amp; GTM Workflows</span>
        </div>

      </div>
    </div>
  );
}
