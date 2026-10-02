import { DamodaranValuationParams, ValuationOutput } from '../types/esop';

/**
 * Standard Cumulative Normal Distribution approximation (Abramowitz & Stegun formula)
 */
export function cumulativeNormal(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.sqrt(2.0);

  const t = 1.0 / (1.0 + p * absX);
  const erf = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-absX * absX);

  return 0.5 * (1.0 + sign * erf);
}

/**
 * Black-Scholes European Call Option Pricing Formula
 * S: Current Underlying Asset Price
 * K: Strike Price
 * t: Time to expiration in years
 * r: Risk-free interest rate (e.g. 0.07)
 * sigma: Volatility (standard deviation of asset returns, e.g. 0.45)
 */
export function calculateBlackScholesCall(
  S: number,
  K: number,
  t: number,
  r: number,
  sigma: number
): number {
  if (t <= 0) {
    return Math.max(0, S - K);
  }
  if (sigma <= 0) {
    return Math.max(0, S - K * Math.exp(-r * t));
  }

  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2.0) * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);

  const callPrice = S * cumulativeNormal(d1) - K * Math.exp(-r * t) * cumulativeNormal(d2);
  return Math.max(0, callPrice);
}

/**
 * Damodaran Private Company & Option Overhang Valuation Architecture
 * Iteratively solves for Intrinsic Share Value and Black-Scholes Option Overhang
 */
export function computeDamodaranValuation(params: DamodaranValuationParams): ValuationOutput {
  const {
    enterpriseValue,
    cash,
    debt,
    marketBeta,
    rMarket,
    riskFreeRate,
    equityRiskPremium,
    optionVolatility,
    optionAverageLifeYears,
    weightedAverageStrike,
    totalPoolOptions,
    primarySharesOutstanding,
    dlomPercent,
    failureProbabilityPercent,
    liquidationValue,
  } = params;

  // 1. Total Beta Adjustment for Undiversified Private Owners/Holders
  // Total Beta = Market Beta / R_Market (Correlation coefficient)
  const safeRMarket = Math.max(0.1, Math.min(1.0, rMarket || 0.55));
  const totalBeta = Number((marketBeta / safeRMarket).toFixed(3));
  const costOfEquity = Number((riskFreeRate + totalBeta * equityRiskPremium).toFixed(4));

  // 2. Base Unencumbered Equity Value before option overhang deduction
  const unencumberedEquityValue = Math.max(0, enterpriseValue + cash - debt);

  // 3. Iterative estimation of Per-Share Common Value and Option Value
  // Initial trial per share assuming no overhang
  let trialSharePrice = unencumberedEquityValue / (primarySharesOutstanding || 1);
  let optionValue = 0;
  let totalOptionOverhang = 0;
  let netEquityValueCommon = unencumberedEquityValue;

  // Perform 10 iterations to convergence
  for (let i = 0; i < 10; i++) {
    optionValue = calculateBlackScholesCall(
      trialSharePrice,
      weightedAverageStrike,
      optionAverageLifeYears,
      riskFreeRate,
      optionVolatility
    );

    totalOptionOverhang = optionValue * totalPoolOptions;
    netEquityValueCommon = Math.max(0, unencumberedEquityValue - totalOptionOverhang);
    trialSharePrice = netEquityValueCommon / (primarySharesOutstanding || 1);
  }

  const intrinsicValuePerShare = trialSharePrice;

  // 4. DLOM (Discount for Lack of Marketability)
  const dlomMultiplier = 1.0 - Math.min(0.5, Math.max(0, dlomPercent / 100));
  const postDlomValuePerShare = intrinsicValuePerShare * dlomMultiplier;

  // 5. Probability of Failure Weighting
  // Final = Going Concern * (1 - P_fail) + Liquidation * P_fail
  const pFail = Math.min(1.0, Math.max(0, failureProbabilityPercent / 100));
  const liquidationPerShare = liquidationValue / (primarySharesOutstanding || 1);
  const finalProbabilityWeightedPerShare =
    postDlomValuePerShare * (1 - pFail) + liquidationPerShare * pFail;

  // 6. Naive Dilution comparison (treating options as ordinary shares without cash inflows)
  const naiveShares = primarySharesOutstanding + totalPoolOptions;
  const naiveDilutionPerShare = unencumberedEquityValue / (naiveShares || 1);

  // Difference: Damodaran overhang vs Naive dilution
  const overhangSavingsDiff = intrinsicValuePerShare - naiveDilutionPerShare;

  return {
    totalBeta,
    costOfEquity,
    blackScholesOptionValuePerOption: Number(optionValue.toFixed(2)),
    totalOptionOverhangValue: Math.round(totalOptionOverhang),
    netEquityValueCommon: Math.round(netEquityValueCommon),
    intrinsicValuePerShare: Number(intrinsicValuePerShare.toFixed(2)),
    postDlomValuePerShare: Number(postDlomValuePerShare.toFixed(2)),
    finalProbabilityWeightedPerShare: Number(finalProbabilityWeightedPerShare.toFixed(2)),
    naiveDilutionPerShare: Number(naiveDilutionPerShare.toFixed(2)),
    overhangSavingsDiff: Number(overhangSavingsDiff.toFixed(2)),
  };
}
