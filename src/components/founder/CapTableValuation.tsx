import React, { useState, useMemo } from 'react';
import { Shareholder, DamodaranValuationParams } from '../../types/esop';
import { computeDamodaranValuation } from '../../utils/valuationMath';
import {
  TrendingUp,
  Scale,
  BrainCircuit,
  Sliders,
  Sparkles,
  PieChart,
  ArrowRight,
  Calculator,
  RefreshCw,
} from 'lucide-react';

interface CapTableValuationProps {
  shareholders: Shareholder[];
  valuationParams: DamodaranValuationParams;
  onUpdateParams: (params: DamodaranValuationParams) => void;
}

export const CapTableValuation: React.FC<CapTableValuationProps> = ({
  shareholders,
  valuationParams,
  onUpdateParams,
}) => {
  const [params, setParams] = useState<DamodaranValuationParams>(valuationParams);
  const [targetPoolPercent, setTargetPoolPercent] = useState<number>(10);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiAdvice, setAiAdvice] = useState<any>(null);

  // Compute live Damodaran corporate finance math
  const valResult = useMemo(() => {
    return computeDamodaranValuation(params);
  }, [params]);

  // Handle local parameter slider/input updates
  const handleParamChange = (field: keyof DamodaranValuationParams, value: number) => {
    const updated = { ...params, [field]: value };
    setParams(updated);
    onUpdateParams(updated);
  };

  // Trigger Gemini Valuation Advisor
  const handleRequestAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/valuation-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enterpriseValue: params.enterpriseValue,
          totalCash: params.cash,
          totalDebt: params.debt,
          optionOverhangValue: valResult.totalOptionOverhangValue,
          totalShares: params.primarySharesOutstanding + params.totalPoolOptions,
          marketBeta: params.marketBeta,
          rMarket: params.rMarket,
          totalBeta: valResult.totalBeta,
          dlomPercentage: params.dlomPercent,
          intrinsicPerShare: valResult.intrinsicValuePerShare,
          failureProbability: params.failureProbabilityPercent,
        }),
      });
      const data = await response.json();
      setAiAdvice(data);
    } catch (err) {
      console.error('Failed to fetch valuation advice:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Total fully diluted shares
  const totalShares = shareholders.reduce((acc, s) => acc + s.shares, 0);

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>Corporate Finance Module</span>
            <span aria-hidden="true">·</span>
            <span>Aswath Damodaran Framework</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Cap Table & Damodaran Valuation Architecture
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Model multi-round share issuance, option overhang deduction, and private risk adjustments
            via Total Beta (<span className="font-mono text-slate-300">β / R_Market</span>) without spreadsheet errors.
          </p>
        </div>

        <button
          onClick={handleRequestAiAdvice}
          disabled={isAiLoading}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-50"
        >
          {isAiLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <BrainCircuit className="h-4 w-4" />
          )}
          {isAiLoading ? 'Analyzing Model...' : 'Consult Damodaran Copilot'}
        </button>
      </div>

      {/* Top 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Enterprise Value (EV)</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-2">
            ₹{(params.enterpriseValue / 10000000).toFixed(1)} Cr
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Cash: ₹{(params.cash / 10000000).toFixed(1)} Cr · Debt: ₹{(params.debt / 10000000).toFixed(1)} Cr
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Option Overhang Deduction</span>
            <Scale className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-2">
            -₹{(valResult.totalOptionOverhangValue / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Black-Scholes: <span className="font-mono text-slate-300">₹{valResult.blackScholesOptionValuePerOption}</span> / opt
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Intrinsic Value (Pre-DLOM)</span>
            <Calculator className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-2">
            ₹{valResult.intrinsicValuePerShare.toFixed(2)}
          </div>
          <div className="text-xs text-emerald-500/80 mt-1 font-mono">
            +₹{valResult.overhangSavingsDiff.toFixed(2)} vs Naive Dilution
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Private Total Beta (β_Total)</span>
            <PieChart className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400 font-mono tabular-nums mt-2">
            {valResult.totalBeta.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Cost of Equity (Ke): {(valResult.costOfEquity * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Main Split: Cap Table on Left (60%), Interactive Damodaran Engine on Right (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cap Table & Pool Sizing (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                Fully Diluted Capitalization Table
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Total Shares: <span className="text-white font-bold">{totalShares.toLocaleString()}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium">
                    <th className="py-2.5 px-3">Shareholder / Category</th>
                    <th className="py-2.5 px-3">Round</th>
                    <th className="py-2.5 px-3 text-right">Shares</th>
                    <th className="py-2.5 px-3 text-right">Diluted %</th>
                    <th className="py-2.5 px-3 text-right">Value (₹ Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {shareholders.map((holder) => {
                    const holderValue = (holder.shares * valResult.intrinsicValuePerShare) / 10000000;
                    return (
                      <tr key={holder.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3 font-sans font-medium text-slate-200">
                          {holder.name}
                          <div className="text-[11px] text-slate-500 font-mono">
                            {holder.category}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-400 font-sans">
                          {holder.round}
                        </td>
                        <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                          {holder.shares.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right tabular-nums font-semibold text-emerald-400">
                          {holder.percentage.toFixed(1)}%
                        </td>
                        <td className="py-3 px-3 text-right tabular-nums text-slate-100 font-semibold">
                          ₹{holderValue.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stage-wise Pool Sizing Benchmarks */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  ESOP Pool Sizing & Dilution Modeling
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  Target: {targetPoolPercent}% of Fully Diluted
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={targetPoolPercent}
                onChange={(e) => setTargetPoolPercent(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>Pre-Series A (10-15%)</span>
                <span>Series A (7.5-10%)</span>
                <span>Growth / Pre-IPO (2-5%)</span>
              </div>
            </div>
          </div>

          {/* Damodaran Theoretical Breakthrough Card: Overhang vs. Naive Dilution */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Scale className="h-4 w-4 text-emerald-400" />
              Damodaran Overhang vs. Naive Dilution Comparison
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard accounting naively adds unexercised options directly into share counts without accounting
              for exercise cash inflows or option volatility. Damodaran treats options as an explicit dollar liability on Enterprise Value.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[11px] text-slate-400">Naive Share-Count Dilution</div>
                <div className="text-lg font-bold font-mono text-slate-300 mt-1 tabular-nums">
                  ₹{valResult.naiveDilutionPerShare.toFixed(2)}
                </div>
                <div className="text-[10px] text-red-400/90 mt-1">
                  Artificially penalizes common equity
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3">
                <div className="text-[11px] text-emerald-400">Damodaran Intrinsic Value</div>
                <div className="text-lg font-bold font-mono text-emerald-300 mt-1 tabular-nums">
                  ₹{valResult.intrinsicValuePerShare.toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                  +₹{valResult.overhangSavingsDiff.toFixed(2)} fair value preserved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Damodaran Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Valuation Engine Controls</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Dynamic DCF</span>
            </div>

            {/* Slider 1: Enterprise Value */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Enterprise Value (EV)</span>
                <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                  ₹{(params.enterpriseValue / 10000000).toFixed(0)} Cr
                </span>
              </div>
              <input
                type="range"
                min="1000000000"
                max="8000000000"
                step="50000000"
                value={params.enterpriseValue}
                onChange={(e) => handleParamChange('enterpriseValue', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2: Sector Correlation R_Market (Total Beta Derivation) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Sector Correlation (R_Market)</span>
                <span className="font-mono text-blue-400 font-semibold tabular-nums">
                  {params.rMarket.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.25"
                max="0.95"
                step="0.05"
                value={params.rMarket}
                onChange={(e) => handleParamChange('rMarket', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="text-[10px] text-slate-500 mt-1">
                Total Beta = β_Market ({params.marketBeta}) / {params.rMarket.toFixed(2)} = <strong className="text-slate-300">{valResult.totalBeta.toFixed(2)}</strong> (Private Risk Adjusted)
              </div>
            </div>

            {/* Slider 3: Option Volatility (sigma) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Annualized Volatility (σ)</span>
                <span className="font-mono text-amber-400 font-semibold tabular-nums">
                  {(params.optionVolatility * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.20"
                max="0.80"
                step="0.02"
                value={params.optionVolatility}
                onChange={(e) => handleParamChange('optionVolatility', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Slider 4: Discount for Lack of Marketability (DLOM) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">DLOM (Illiquidity Haircut)</span>
                <span className="font-mono text-purple-400 font-semibold tabular-nums">
                  {params.dlomPercent}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={params.dlomPercent}
                onChange={(e) => handleParamChange('dlomPercent', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="text-[10px] text-slate-500 mt-1">
                Post-DLOM Value: <strong className="text-purple-300">₹{valResult.postDlomValuePerShare.toFixed(2)}</strong> / share
              </div>
            </div>

            {/* Slider 5: Probability of Failure Weighting */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Startup Failure Risk Weight (P_Fail)</span>
                <span className="font-mono text-slate-400 font-semibold tabular-nums">
                  {params.failureProbabilityPercent}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={params.failureProbabilityPercent}
                onChange={(e) => handleParamChange('failureProbabilityPercent', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <div className="text-[10px] text-slate-500 mt-1">
                Probability-Weighted Value: <strong className="text-slate-200">₹{valResult.finalProbabilityWeightedPerShare.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* AI Executive Advisory Output */}
          {aiAdvice && (
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>Damodaran Valuation Advisory Memo</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {aiAdvice.executiveSummary}
              </p>
              <div className="border-t border-slate-800 pt-3 space-y-2">
                <div className="text-[11px] font-semibold text-slate-300">CFO Action Items:</div>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {aiAdvice.cfoActionItems?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">0{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
