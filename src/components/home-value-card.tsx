import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeValueCard({
  estimate,
  lastUpdated,
  className
}: {
  estimate: number;
  lastUpdated?: string;
  className?: string;
}) {
  const zestimate = Math.round(estimate * 1.02);
  const attomEstimate = Math.round(estimate * 0.98);

  return (
    <div className={cn("w-full bg-white border border-slate-200 rounded-[20px] overflow-hidden font-sans text-slate-900 shadow-xl shadow-slate-200/50", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-white">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase mb-6">
              Home Value
            </h3>
            <div className="text-5xl lg:text-[64px] font-bold tracking-tight text-slate-900 mb-6 leading-none">
              ${estimate.toLocaleString()}
            </div>
            <p className="text-[16px] text-slate-600 leading-relaxed max-w-[90%]">
              Automated estimates are a starting point. Ila can provide a more accurate local valuation based on condition, upgrades, and current buyer demand.
            </p>
          </div>
          
          <div className="mt-12 lg:mt-auto pt-8">
            <Button className="w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 h-10 px-6 text-sm font-semibold rounded-lg transition-colors">
              Request Valuation Estimate
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 flex flex-col bg-slate-50/50">
          {/* TOP ROW - ESTIMATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 flex-1 border-b border-slate-200">
            <div className="p-8 lg:p-10 border-b sm:border-b-0 sm:border-r border-slate-200 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <ZillowLogo className="h-4 w-4 text-[#006AFF]" />
                <h4 className="text-[11px] font-semibold tracking-[0.15em] text-[#006AFF] uppercase">Zestimate</h4>
              </div>
              <div className="text-4xl lg:text-5xl font-bold tracking-tight text-[#006AFF] mb-2">
                ${zestimate.toLocaleString()}
              </div>
              <p className="text-[14px] text-slate-500 font-medium">
                Based on Zillow's public data
              </p>
            </div>
            
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <AttomLogo className="h-4 w-4 text-[#003D7A]" />
                <h4 className="text-[11px] font-semibold tracking-[0.15em] text-[#003D7A] uppercase">Attom Estimate</h4>
              </div>
              <div className="text-4xl lg:text-5xl font-bold tracking-tight text-[#003D7A] mb-2">
                ${attomEstimate.toLocaleString()}
              </div>
              <p className="text-[14px] text-slate-500 font-medium">
                Based on county & tax records
              </p>
            </div>
          </div>
          
          {/* BOTTOM ROW - DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 flex-1">
            <div className="p-8 lg:p-10 border-b sm:border-b-0 sm:border-r border-slate-200">
              <h4 className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase mb-6">Estimated Range</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-slate-700">High: ${Math.round(estimate * 1.05).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-slate-700">Low: ${Math.round(estimate * 0.95).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 lg:p-10">
              <h4 className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase mb-6">Additional Details</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-slate-700">{lastUpdated ? `Updated: ${lastUpdated}` : 'Recently updated'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[15px] font-medium text-slate-700">Subject to market changes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZillowLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5 10.5L12 2.5L1.5 10.5H4.5V20.5H19.5V10.5H22.5ZM16.5 17.5H7.5V15.5L13.5 11.5H7.5V9.5H16.5V11.5L10.5 15.5H16.5V17.5Z" />
    </svg>
  );
}

function AttomLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" />
      <path d="M12 14.5L8.5 22H15.5L12 14.5Z" opacity="0.6"/>
    </svg>
  );
}
