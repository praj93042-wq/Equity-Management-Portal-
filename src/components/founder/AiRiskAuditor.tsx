import React, { useState } from 'react';
import { SAMPLE_CONTRACTS } from '../../data/mockData';
import { AuditResult, AuditIssue } from '../../types/esop';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCheck,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Code,
} from 'lucide-react';

interface AiRiskAuditorProps {
  isDpiitStartup: boolean;
}

export const AiRiskAuditor: React.FC<AiRiskAuditorProps> = ({ isDpiitStartup }) => {
  const [contractText, setContractText] = useState<string>(SAMPLE_CONTRACTS.risky);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [hasTrust, setHasTrust] = useState<boolean>(true);

  const runAudit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/audit-grant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractText,
          companyType: 'Private Limited',
          hasTrust,
          isDpiitStartup,
        }),
      });
      const data = await response.json();
      setAuditResult(data);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSample = (type: 'risky' | 'compliant') => {
    setContractText(SAMPLE_CONTRACTS[type]);
    setAuditResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>AI Legal NLP Engine</span>
            <span aria-hidden="true">·</span>
            <span>Gemini 3.8 Flash Governance Copilot</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Fine-Print Legal & Governance Risk Auditor
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Audit grant agreements, scheme text, and offer letters for ambiguous cause clauses, statutory cliff
            violations, trustee disqualifications, and defective post-separation exercise windows.
          </p>
        </div>

        <button
          onClick={runAudit}
          disabled={isLoading || !contractText.trim()}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isLoading ? 'Scanning Agreement...' : 'Execute AI Governance Audit'}
        </button>
      </div>

      {/* Editor & Sample Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Text Input / Editor (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Grant Agreement / Scheme Document
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Load Benchmark:</span>
              <button
                onClick={() => loadSample('risky')}
                className="text-[11px] font-mono px-2 py-1 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/40 transition-colors"
              >
                Risky Draft (3 Traps)
              </button>
              <button
                onClick={() => loadSample('compliant')}
                className="text-[11px] font-mono px-2 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 transition-colors"
              >
                Rule 12 Standard
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={16}
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Paste grant agreement text or scheme clauses here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-mono">
            <span>Character count: {contractText.length}</span>
            <span>Trust Administration: {hasTrust ? 'Active' : 'Direct'}</span>
          </div>
        </div>

        {/* Right Column: Audit Results & Redline Fixes (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {!auditResult && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 text-center min-h-[380px]">
              <ShieldAlert className="h-10 w-10 text-slate-600 mb-3" />
              <h3 className="text-sm font-semibold text-slate-300">Ready for Document Analysis</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Click "Execute AI Governance Audit" to parse clauses against Companies Act Rule 12, statutory 1-year cliffs, and trustee conflict rules.
              </p>
            </div>
          ) : isLoading ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 text-center min-h-[380px]">
              <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin mb-3" />
              <div className="text-sm font-semibold text-slate-200">Parsing Legal Knowledge Graph...</div>
              <p className="text-xs text-slate-400 mt-1">
                Auditing statutory cliff compliance, Cause definition precision, and trustee independence.
              </p>
            </div>
          ) : auditResult ? (
            <div className="space-y-4">
              {/* Risk Score Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                auditResult.overallRiskScore > 50
                  ? 'bg-red-950/20 border-red-500/30'
                  : auditResult.overallRiskScore > 20
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-emerald-950/20 border-emerald-500/30'
              }`}>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Governance Audit Score</div>
                  <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                    <span>{auditResult.verdict}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {auditResult.summary}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-3xl font-bold font-mono tabular-nums ${
                    auditResult.overallRiskScore > 50 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {auditResult.overallRiskScore}
                    <span className="text-xs text-slate-500">/100</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Risk Index</div>
                </div>
              </div>

              {/* Governance Checklist */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-semibold text-slate-300 mb-3">
                  Statutory Rule 12 Checkpoint Matrix
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {auditResult.governanceChecklist?.map((chk, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      {chk.status === 'PASS' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : chk.status === 'WARN' ? (
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium text-slate-200">{chk.item}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{chk.notes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Clause Issues & Recommended Redlines */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300">
                  Detected Fine-Print Vulnerabilities ({auditResult.issues?.length || 0})
                </div>

                {auditResult.issues?.map((issue) => (
                  <div key={issue.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          issue.severity === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {issue.severity}
                        </span>
                        {issue.clauseTitle}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-[11px] font-mono text-red-300/90 italic">
                      "{issue.detectedTextSnippet}"
                    </div>

                    <div className="text-xs text-slate-400">
                      <strong className="text-slate-300">Legal Risk:</strong> {issue.riskDescription}
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 text-xs">
                      <div className="text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                        <FileCheck className="h-3.5 w-3.5" />
                        Recommended Legal Redline Fix:
                      </div>
                      <p className="font-mono text-slate-200 text-[11px] leading-relaxed">
                        {issue.recommendedRedline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
