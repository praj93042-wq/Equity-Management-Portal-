import React, { useState } from 'react';
import { EmployeeGrant } from '../../types/esop';
import { calculateThreeStageTax, calculateCashlessExercise } from '../../utils/taxMath';
import {
  Wallet,
  TrendingUp,
  Coins,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PieChart,
  HelpCircle,
} from 'lucide-react';

interface EmployeeWealthPortalProps {
  grant: EmployeeGrant;
  currentFmv: number;
}

export const EmployeeWealthPortal: React.FC<EmployeeWealthPortalProps> = ({
  grant,
  currentFmv,
}) => {
  const [sharesToSimulate, setSharesToSimulate] = useState<number>(grant.vestedShares - grant.exercisedShares);
  const [projectedSalePrice, setProjectedSalePrice] = useState<number>(650); // ₹650 future exit
  const [holdingMonths, setHoldingMonths] = useState<number>(26); // 26 months (LTCG)
  const [taxSlabRate, setTaxSlabRate] = useState<number>(0.312); // 30% + 4% cess
  const [isPostIpo, setIsPostIpo] = useState<boolean>(false);
  const [isCashlessModalOpen, setIsCashlessModalOpen] = useState<boolean>(false);

  const exercisableShares = Math.max(0, grant.vestedShares - grant.exercisedShares);

  // Live 3-Stage Tax Math
  const taxResult = calculateThreeStageTax(
    sharesToSimulate,
    grant.strikePrice,
    currentFmv,
    projectedSalePrice,
    taxSlabRate,
    holdingMonths,
    isPostIpo
  );

  // Live Cashless Exercise Settlement Math
  const cashlessResult = calculateCashlessExercise(
    sharesToSimulate,
    grant.strikePrice,
    currentFmv,
    taxSlabRate
  );

  const totalPortfolioValue = grant.totalGranted * currentFmv;
  const vestedPortfolioValue = grant.vestedShares * currentFmv;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span>Employee Equity Dashboard</span>
            <span aria-hidden="true">·</span>
            <span>{grant.employeeName} ({grant.role})</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Equity Wealth Portfolio & Three-Stage Tax Simulator
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Track your vesting progress, simulate Stage 2 perquisite TDS liabilities, model capital gains
            timing (24-month rule), and execute cashless trust settlements with ₹0 out-of-pocket cash.
          </p>
        </div>

        <button
          onClick={() => setIsCashlessModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Coins className="h-4 w-4" />
          Model Cashless Trust Exercise
        </button>
      </div>

      {/* Top Portfolio Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Options Granted</span>
            <Wallet className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-2">
            {grant.totalGranted.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Strike Price: ₹{grant.strikePrice} · Value: ₹{(totalPortfolioValue / 100000).toFixed(1)} Lakhs
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Vested Options</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-2">
            {grant.vestedShares.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Vested Value: <span className="font-mono text-slate-300">₹{(vestedPortfolioValue / 100000).toFixed(1)} Lakhs</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Exercisable Today</span>
            <Coins className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400 font-mono tabular-nums mt-2">
            {exercisableShares.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            Already Exercised: {grant.exercisedShares.toLocaleString()}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Current FMV</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums mt-2">
            ₹{currentFmv} <span className="text-xs text-slate-400 font-normal">/ share</span>
          </div>
          <div className="text-xs text-emerald-400/80 mt-1 font-mono">
            +₹{currentFmv - grant.strikePrice} intrinsic spread / opt
          </div>
        </div>
      </div>

      {/* Main Split: Simulator Controls on Left, 3-Stage Tax Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Simulation Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-5">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">
              Tax & Exercise Simulation Parameters
            </h3>

            {/* Slider 1: Shares to Exercise */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Shares to Exercise</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  {sharesToSimulate.toLocaleString()} shares
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max={exercisableShares || 50000}
                step="500"
                value={sharesToSimulate}
                onChange={(e) => setSharesToSimulate(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2: Projected Exit / Sale Price */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Future Sale / Exit Price</span>
                <span className="font-mono text-blue-400 font-bold tabular-nums">
                  ₹{projectedSalePrice} / share
                </span>
              </div>
              <input
                type="range"
                min={currentFmv}
                max={1500}
                step="25"
                value={projectedSalePrice}
                onChange={(e) => setProjectedSalePrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Slider 3: Holding Period (Months from Exercise) */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Holding Period Post-Exercise</span>
                <span className="font-mono text-purple-400 font-bold tabular-nums">
                  {holdingMonths} Months
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                step="1"
                value={holdingMonths}
                onChange={(e) => setHoldingMonths(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                {holdingMonths > 24 ? (
                  <span className="text-emerald-400 font-semibold">
                    LTCG Qualified (&gt;24 Months unlisted) &rarr; 12.5% Flat Tax Rate
                  </span>
                ) : (
                  <span className="text-amber-400">
                    STCG (&le;24 Months unlisted) &rarr; Taxed at personal slab rate ({(taxSlabRate * 100).toFixed(1)}%)
                  </span>
                )}
              </div>
            </div>

            {/* Selector: Tax Slab Rate */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">
                Applicable Income Tax Slab
              </label>
              <select
                value={taxSlabRate}
                onChange={(e) => setTaxSlabRate(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              >
                <option value={0.312}>30% Slab + 4% Cess (31.2% Standard Executive)</option>
                <option value={0.3588}>30% Slab + 15% Surcharge + Cess (35.88% &gt;₹1 Cr)</option>
                <option value={0.39}>30% Slab + 25% Surcharge + Cess (39.0% &gt;₹2 Cr)</option>
                <option value={0.208}>20% Slab + 4% Cess (20.8% Mid-Tier)</option>
              </select>
            </div>

            {/* Post-IPO Window Switch */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <div>
                <span className="text-xs font-semibold text-slate-300">Swiggy 1-Month Post-IPO Rule</span>
                <div className="text-[11px] text-slate-500">Apply listed capital gains tax rules</div>
              </div>
              <input
                type="checkbox"
                checked={isPostIpo}
                onChange={(e) => setIsPostIpo(e.target.checked)}
                className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Three-Stage Indian Taxation Visual Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                Three-Stage Taxation Lifecycle
              </h3>
              <span className="text-xs font-mono text-emerald-400">
                Income Tax Act Architecture
              </span>
            </div>

            {/* Stage 1: Grant */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400">STAGE 1: GRANT DATE</div>
                <div className="text-sm font-semibold text-white mt-1">Allocation of Options</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Options granted at ₹{grant.strikePrice} strike price. No immediate ownership transfer.
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Tax Liability</div>
                <div className="text-lg font-bold text-emerald-400">₹0.00</div>
                <div className="text-[10px] text-slate-500">Tax Free Event</div>
              </div>
            </div>

            {/* Stage 2: Exercise */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-amber-500/20 flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-amber-400">STAGE 2: EXERCISE DATE (PERQUISITE)</div>
                <div className="text-sm font-semibold text-white mt-1">Conversion to Equity Shares</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Perquisite Value: (₹{currentFmv} - ₹{grant.strikePrice}) &times; {sharesToSimulate.toLocaleString()} = <strong className="text-slate-200">₹{(taxResult.exercisePerquisiteValue / 100000).toFixed(2)}L</strong>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">TDS Perquisite Tax</div>
                <div className="text-lg font-bold text-amber-400 tabular-nums">
                  ₹{taxResult.exerciseTdsTax.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Deducted at source by Employer</div>
              </div>
            </div>

            {/* Stage 3: Sale */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-blue-500/20 flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-blue-400">STAGE 3: LIQUIDITY / SALE DATE</div>
                <div className="text-sm font-semibold text-white mt-1">
                  Capital Gains Realization ({taxResult.isLongTerm ? 'LTCG' : 'STCG'})
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Capital Gain: (₹{projectedSalePrice} - ₹{currentFmv}) &times; {sharesToSimulate.toLocaleString()} = <strong className="text-slate-200">₹{(taxResult.capitalGain / 100000).toFixed(2)}L</strong>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Capital Gains Tax</div>
                <div className="text-lg font-bold text-blue-400 tabular-nums">
                  ₹{taxResult.capitalGainsTax.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {taxResult.isLongTerm ? '12.5% Flat Rate' : `${(taxSlabRate * 100).toFixed(1)}% Slab Rate`}
                </div>
              </div>
            </div>

            {/* Final Wealth Summary Card */}
            <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-emerald-400 font-mono">Net Realized Employee Wealth</div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                  ₹{(taxResult.netProceeds / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Pre-Tax Upside: ₹{(taxResult.totalPreTaxValue / 100000).toFixed(2)}L · Total Tax: ₹{(taxResult.totalTaxPaid / 100000).toFixed(2)}L
                </div>
              </div>

              <div className="bg-slate-950/80 px-4 py-2.5 rounded-lg border border-slate-800 text-right font-mono">
                <div className="text-[10px] text-slate-400">Effective Tax Rate</div>
                <div className="text-base font-bold text-emerald-400 tabular-nums">
                  {taxResult.totalPreTaxValue > 0
                    ? ((taxResult.totalTaxPaid / taxResult.totalPreTaxValue) * 100).toFixed(1)
                    : '0.0'}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cashless Exercise Settlement Modal */}
      {isCashlessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Employee Welfare Trust Cashless Exercise
                </h3>
              </div>
              <button
                onClick={() => setIsCashlessModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Close &times;
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Under the Trust route, you do not pay any money upfront. The Trust sells a calculated fraction
              of your exercised options at current FMV (₹{currentFmv}) to cover the Strike Price and government TDS liability,
              delivering the remaining net shares debt-free to your account.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Options Being Exercised:</span>
                <span className="text-white font-bold">{cashlessResult.sharesToExercise.toLocaleString()} shares</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Strike Price Payable to Co:</span>
                <span className="text-slate-200">₹{cashlessResult.strikePricePayable.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>TDS Perquisite Tax to Govt:</span>
                <span className="text-amber-400">₹{cashlessResult.perquisiteTdsPayable.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between text-slate-300 font-semibold">
                <span>Total Cash Obligation:</span>
                <span className="text-white">₹{cashlessResult.totalFinancialObligation.toLocaleString()}</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded border border-slate-800 space-y-1 mt-2">
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Shares Sold to Cover Obligation:</span>
                  <span>{cashlessResult.sharesSoldToCover.toLocaleString()} shares</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
                  <span>Net Shares Retained in Demat:</span>
                  <span className="text-emerald-400">{cashlessResult.netSharesRetained.toLocaleString()} shares</span>
                </div>
              </div>

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Your Out-of-Pocket Payment:</span>
                <span className="text-emerald-400 font-bold text-sm">₹0.00 (Zero Cash Required)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCashlessModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all"
              >
                Confirm Cashless Exercise Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
