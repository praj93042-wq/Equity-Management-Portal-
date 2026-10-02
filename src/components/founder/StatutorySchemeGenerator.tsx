import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  Download,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface StatutorySchemeGeneratorProps {
  companyName: string;
  isDpiitStartup: boolean;
  onToggleDpiit: (val: boolean) => void;
}

export const StatutorySchemeGenerator: React.FC<StatutorySchemeGeneratorProps> = ({
  companyName,
  isDpiitStartup,
  onToggleDpiit,
}) => {
  const [poolSizeShares, setPoolSizeShares] = useState<number>(1000000);
  const [poolPercent, setPoolPercent] = useState<number>(10);
  const [vestingType, setVestingType] = useState<string>('Uniform 4-Year Graded with 1-Year Cliff');
  const [administrationRoute, setAdministrationRoute] = useState<'Direct' | 'Employee Welfare Trust'>('Employee Welfare Trust');
  const [strikePriceFormula, setStrikePriceFormula] = useState<string>('Face Value (₹10) to maximize talent incentive');
  const [activeTab, setActiveTab] = useState<'board' | 'special' | 's102' | 'mgt14'>('board');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPackage, setGeneratedPackage] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-scheme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          poolSizeShares,
          poolPercentage: poolPercent,
          vestingType,
          isDpiit: isDpiitStartup,
          administrationRoute,
          strikePriceFormula,
          authorizedCapital: '₹12,00,00,000 (1.2 Cr Equity Shares of ₹10 each)',
        }),
      });
      const data = await response.json();
      setGeneratedPackage(data);
    } catch (err) {
      console.error('Failed to generate scheme:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Default templates if not generated via API yet
  const boardResolution = generatedPackage?.boardResolutionText || `RESOLVED THAT pursuant to the provisions of Section 62(1)(b) and Rule 12 of the Companies (Share Capital and Debentures) Rules, 2014, and subject to the approval of shareholders in General Meeting, consent of the Board of Directors be and is hereby accorded to approve the draft "${companyName} Employee Stock Option Scheme 2026" creating an option pool of ${poolSizeShares.toLocaleString()} equity shares (${poolPercent}% of fully diluted capital).\n\nRESOLVED FURTHER THAT an Extraordinary General Meeting (EGM) of the Members be convened with at least 21 clear days' notice to pass the requisite Special Resolution, and the Company Secretary / Director be authorized to file Form MGT-14 with the Registrar of Companies within 30 days of passing said resolution.`;

  const specialResolution = generatedPackage?.specialResolutionText || `RESOLVED AS A SPECIAL RESOLUTION THAT pursuant to Section 62(1)(b) of the Companies Act, 2013, Rule 12 of Companies (Share Capital and Debentures) Rules, 2014, and the Articles of Association of the Company, the approval of the Members be and is hereby accorded to create, grant, offer and issue up to ${poolSizeShares.toLocaleString()} Employee Stock Options to eligible employees under the "${companyName} Employee Stock Option Scheme 2026" exercisable into equivalent equity shares of Face Value ₹10 each, through the ${administrationRoute} route.\n\nRESOLVED FURTHER THAT the Board of Directors / Compensation Committee be authorized to determine the terms of individual grants, subject to a mandatory statutory minimum cliff period of one (1) year from the grant date.`;

  const explanatoryStatement = generatedPackage?.section102ExplanatoryStatement || `ITEM NO. 1: APPROVAL OF ESOP SCHEME 2026\nUnder Section 62(1)(b) of the Companies Act, 2013, issue of shares to employees under Employee Stock Option Scheme requires approval of Members by Special Resolution (≥75% majority).\n\nMandatory Rule 12 Disclosures:\n1. Total Pool: ${poolSizeShares.toLocaleString()} equity shares (${poolPercent}% of issued capital).\n2. Eligibility Matrix: Permanent employees and executive directors (excluding independent directors).\n3. DPIIT Exemption: ${isDpiitStartup ? 'Active 10-year exemption applied under DPIIT Notification G.S.R. 127(E); promoters and >10% shareholders are eligible.' : 'Standard Rule 12 active; promoters and >10% shareholders strictly excluded.'}\n4. Vesting Schedule: ${vestingType}.\n5. Exercise Price: ${strikePriceFormula}.\n6. Administration: Administered via ${administrationRoute}.`;

  const mgt14Checklist = generatedPackage?.mgt14FilingChecklist || [
    { step: "Pass Special Resolution in EGM", timeline: "Day 0", requiredAttachment: "Minutes of General Meeting signed by Chairman", statutoryRule: "Section 114(2) Companies Act, 2013" },
    { step: "Draft Form MGT-14 in MCA21 V3 Portal", timeline: "Day 1 - Day 15", requiredAttachment: "Form MGT-14 e-form with DSC of Director & Practicing CS", statutoryRule: "Section 117(1) Companies Act, 2013" },
    { step: "Attach Certified Copy of Resolution", timeline: "Day 1 - Day 25", requiredAttachment: "True copy of Special Resolution with certified explanatory statement", statutoryRule: "Section 102 Companies Act, 2013" },
    { step: "Attach Approved Scheme Document & Valuation", timeline: "Day 1 - Day 25", requiredAttachment: "Complete scheme rules and Registered Valuer's Fair Market Value report", statutoryRule: "Rule 12(1) Share Capital & Debentures Rules" },
    { step: "Final ROC Submission & SRN Generation", timeline: "Within 30 Days (Mandatory)", requiredAttachment: "ROC filing fee receipt with MCA SRN confirmation", statutoryRule: "Section 117(2) penalty of ₹10,000 + ₹100/day for delay" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>Corporate Governance Module</span>
            <span aria-hidden="true">·</span>
            <span>Rule 12 Compliance & Secretarial Drafts</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Statutory Scheme & ROC Form MGT-14 Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Auto-generate Board minutes, EGM Special Resolutions (&ge;75%), Section 102 Explanatory Statements,
            and monitor the mandatory 30-day Form MGT-14 filing roadmap with the Registrar of Companies.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {isGenerating ? 'Compiling Package...' : 'Generate Legal Package'}
        </button>
      </div>

      {/* Configuration Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/70 border border-slate-800 rounded-xl p-5">
        <div>
          <label className="text-xs text-slate-400 font-medium block mb-1.5">
            Pool Sizing
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={poolSizeShares}
              onChange={(e) => setPoolSizeShares(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
            <span className="text-xs font-mono text-slate-400">shares</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-medium block mb-1.5">
            Administration Route
          </label>
          <select
            value={administrationRoute}
            onChange={(e) => setAdministrationRoute(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Employee Welfare Trust">Employee Welfare Trust (Cashless friendly)</option>
            <option value="Direct">Direct Company Issuance</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-medium block mb-1.5">
            Vesting Model Architecture
          </label>
          <select
            value={vestingType}
            onChange={(e) => setVestingType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Uniform 4-Year Graded (Swiggy Model: 25% annual)">Swiggy Model (25% uniform annual)</option>
            <option value="Back-Loaded 4-Year Graded (Zomato Model: 5/15/30/50%)">Zomato Model (5/15/30/50% back-loaded)</option>
            <option value="Hybrid (50% Tenure + 50% Milestone Performance)">Hybrid (50% Tenure + 50% KPI)</option>
          </select>
        </div>

        {/* DPIIT Startup Exemption Toggle */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">DPIIT 10-Yr Exemption</span>
            <input
              type="checkbox"
              checked={isDpiitStartup}
              onChange={(e) => onToggleDpiit(e.target.checked)}
              className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0 cursor-pointer"
            />
          </div>
          <div className="text-[11px] text-slate-400 leading-tight mt-1">
            {isDpiitStartup ? (
              <span className="text-emerald-400">Promoters & &gt;10% holders eligible for 10 yrs from incorporation.</span>
            ) : (
              <span className="text-amber-400">Standard Rule 12: Promoters strictly prohibited from ESOP grants.</span>
            )}
          </div>
        </div>
      </div>

      {/* Multi-Document Tabbed Viewer */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        {/* Document Switcher Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'board'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Board Resolution Draft
            </button>
            <button
              onClick={() => setActiveTab('special')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'special'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. EGM Special Resolution (&ge;75%)
            </button>
            <button
              onClick={() => setActiveTab('s102')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 's102'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Section 102 Explanatory Note
            </button>
            <button
              onClick={() => setActiveTab('mgt14')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'mgt14'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4. ROC Form MGT-14 Roadmap
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const textToCopy =
                  activeTab === 'board'
                    ? boardResolution
                    : activeTab === 'special'
                    ? specialResolution
                    : activeTab === 's102'
                    ? explanatoryStatement
                    : JSON.stringify(mgt14Checklist, null, 2);
                copyToClipboard(textToCopy);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 rounded border border-slate-700 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>

        {/* Document Content Viewport */}
        <div className="p-6">
          {activeTab === 'board' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE BOARD OF DIRECTORS</span>
                <span className="font-mono">Section 62(1)(b) Read with Rule 12</span>
              </div>
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                {boardResolution}
              </pre>
            </div>
          )}

          {activeTab === 'special' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>TEXT OF SPECIAL RESOLUTION TO BE PASSED AT EXTRAORDINARY GENERAL MEETING (EGM)</span>
                <span className="font-mono text-amber-400 font-semibold">&ge; 75% Majority Required</span>
              </div>
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                {specialResolution}
              </pre>
            </div>
          )}

          {activeTab === 's102' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>EXPLANATORY STATEMENT PURSUANT TO SECTION 102 OF THE COMPANIES ACT, 2013</span>
                <span className="font-mono">Statutory EGM Annexure</span>
              </div>
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                {explanatoryStatement}
              </pre>
            </div>
          )}

          {activeTab === 'mgt14' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>MANDATORY 30-DAY ROC FORM MGT-14 FILING CHECKLIST</span>
                <span className="font-mono text-red-400 font-semibold">Strict 30-Day Statutory Deadline</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-medium">
                      <th className="py-2.5 px-3">Stage / Step</th>
                      <th className="py-2.5 px-3">Timeline</th>
                      <th className="py-2.5 px-3">Required Statutory Attachment</th>
                      <th className="py-2.5 px-3">Governing Legal Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {mgt14Checklist.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3 font-sans font-medium text-slate-200">
                          {item.step}
                        </td>
                        <td className="py-3 px-3 text-emerald-400 font-semibold">
                          {item.timeline}
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-sans">
                          {item.requiredAttachment}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">
                          {item.statutoryRule}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-300/90 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Compliance Warning:</strong> Failure to file Form MGT-14 within 30 days of passing the Special Resolution incurs statutory penalties under Section 117(2) of ₹10,000 on the company, plus ₹100 per day of continuing failure, and renders subsequent option grants legally vulnerable.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
