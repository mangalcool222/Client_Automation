import React, { useState } from 'react';
import { MessageSquare, Mail, Sparkles, ArrowRight, UserCheck, Copy, Check } from 'lucide-react';
import LinkedInIcon from './LinkedInIcon';

export default function CustomWorkflowCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    try {
      navigator.clipboard.writeText('mangal@trackkaroai.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {}
  };

  return (
    <div className="bg-white border border-[#EBE3D5] rounded-3xl p-8 sm:p-12 transition-all shadow-sm">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EBE3D5] font-mono-telemetry text-xs font-bold text-[#D97706] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-current text-[#D97706]" />
          <span className="uppercase tracking-wider">TAILORED GTM ARCHITECTURE</span>
        </div>

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-extrabold text-[#18191B] tracking-tight">
          Need a Similar Workflow for Your Business?
        </h3>

        {/* Personal Quote */}
        <blockquote className="text-sm sm:text-base font-serif-editorial italic leading-relaxed max-w-2xl mx-auto p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5] text-[#18191B]">
          “Tell me how your leads arrive today and what happens after someone submits an enquiry. I will help map out a practical speed-to-lead automation tailored for your exact sales process.”
        </blockquote>

        {/* Engineer Identity & CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="https://wa.me/917979816557?text=Hi%20Mangal,%20I%20want%20to%20discuss%20mapping%20out%20a%20custom%20lead%20automation%20workflow%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-mono-telemetry font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md bg-[#059669] hover:bg-[#047857] text-white hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Discuss on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-mono-telemetry font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#EBE3D5] bg-white hover:bg-[#FAF8F5] text-[#0A66C2] shadow-xs hover:scale-[1.02]"
          >
            <LinkedInIcon className="w-4 h-4 fill-[#0A66C2]" />
            <span>Connect on LinkedIn</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-mono-telemetry font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#EBE3D5] bg-white hover:bg-[#FAF8F5] text-[#18191B] shadow-xs hover:scale-[1.02]"
            title="Click to copy: mangal@trackkaroai.com"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#059669]" />
                <span className="text-[#059669] font-bold">mangal@trackkaroai.com (Copied!)</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>mangal@trackkaroai.com</span>
                <Copy className="w-3.5 h-3.5 text-[#7E8695] ml-0.5" />
              </>
            )}
          </button>
        </div>

        {/* Founder Bio Line */}
        <div className="text-xs text-[#7E8695] font-mono-telemetry flex items-center justify-center gap-2 pt-2">
          <UserCheck className="w-4 h-4 text-[#059669]" />
          <a
            href="https://www.linkedin.com/in/mangal-soren-1312ba31a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#0A66C2] font-bold text-[#18191B]"
          >
            Mangal Soren
          </a>
          <span>• Founder &amp; GTM Automation Architect | TrackKaro AI</span>
        </div>

      </div>
    </div>
  );
}
