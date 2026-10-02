import { ThreeStageTaxResult, CashlessExerciseCalculation } from '../types/esop';

/**
 * Calculates Three-Stage Tax obligations under the Indian Income Tax Act:
 * Stage 1: Grant (Nil)
 * Stage 2: Exercise (Perquisite Tax via TDS)
 * Stage 3: Sale (Capital Gains: STCG vs LTCG based on 24-month unlisted threshold)
 */
export function calculateThreeStageTax(
  shares: number,
  strikePrice: number,
  exerciseFmv: number,
  salePrice: number,
  taxSlabRate: number = 0.312, // 30% base + 4% cess = 31.2%
  holdingMonths: number = 36,
  isPostIpoListed: boolean = false
): ThreeStageTaxResult {
  // Stage 1: Grant
  const grantTax = 0;

  // Stage 2: Exercise Perquisite Tax
  // Perquisite Value = (FMV on Exercise Date - Strike Price) * Shares
  const perSharePerquisite = Math.max(0, exerciseFmv - strikePrice);
  const exercisePerquisiteValue = perSharePerquisite * shares;
  const exerciseTdsTax = exercisePerquisiteValue * taxSlabRate;

  // Stage 3: Capital Gains Tax
  // Capital Gain = (Sale Price - FMV on Exercise Date) * Shares
  const perShareGain = Math.max(0, salePrice - exerciseFmv);
  const capitalGain = perShareGain * shares;

  // Unlisted equity holding period threshold is 24 months
  // Listed equity holding period threshold is 12 months
  const isLongTerm = isPostIpoListed ? holdingMonths > 12 : holdingMonths > 24;

  let capitalGainsTaxRate = 0;
  if (isPostIpoListed) {
    // Listed rules post-2024 Budget:
    // STCG under 111A: 20%
    // LTCG under 112A: 12.5% (with exemption up to 1.25 Lakhs)
    capitalGainsTaxRate = isLongTerm ? 0.125 : 0.20;
  } else {
    // Unlisted rules:
    // STCG: Taxed at normal individual slab rate
    // LTCG: 12.5% flat (post-Budget 2024 without indexation)
    capitalGainsTaxRate = isLongTerm ? 0.125 : taxSlabRate;
  }

  // Calculate LTCG exemption if listed
  let taxableCapitalGain = capitalGain;
  if (isPostIpoListed && isLongTerm) {
    taxableCapitalGain = Math.max(0, capitalGain - 125000);
  }

  const capitalGainsTax = taxableCapitalGain * capitalGainsTaxRate;
  const totalTaxPaid = exerciseTdsTax + capitalGainsTax;
  const totalPreTaxValue = salePrice * shares - strikePrice * shares;
  const netProceeds = totalPreTaxValue - totalTaxPaid;

  return {
    grantTax,
    exercisePerquisiteValue: Math.round(exercisePerquisiteValue),
    exerciseTdsTax: Math.round(exerciseTdsTax),
    capitalGain: Math.round(capitalGain),
    capitalGainsTax: Math.round(capitalGainsTax),
    isLongTerm,
    totalTaxPaid: Math.round(totalTaxPaid),
    netProceeds: Math.round(netProceeds),
    totalPreTaxValue: Math.round(totalPreTaxValue),
  };
}

/**
 * Calculates Cashless Exercise Settlement through an Employee Welfare Trust
 * The Trust sells only enough shares to cover:
 * 1. Strike Price payable to Company (to discharge trust funding loan)
 * 2. Stage 2 TDS Perquisite Tax liability remitted to government
 * Delivers remaining net shares (or net cash) to the employee with ₹0 out-of-pocket cash required!
 */
export function calculateCashlessExercise(
  sharesToExercise: number,
  strikePrice: number,
  currentFmv: number,
  employeeTaxSlab: number = 0.312
): CashlessExerciseCalculation {
  const strikePricePayable = sharesToExercise * strikePrice;
  const perSharePerquisite = Math.max(0, currentFmv - strikePrice);
  const perquisiteTdsPayable = Math.round(perSharePerquisite * sharesToExercise * employeeTaxSlab);

  const totalFinancialObligation = strikePricePayable + perquisiteTdsPayable;

  // Number of shares sold in secondary / buyback at current FMV to cover total obligation
  const sharesSoldToCover = Math.min(
    sharesToExercise,
    Math.ceil(totalFinancialObligation / (currentFmv || 1))
  );

  const netSharesRetained = Math.max(0, sharesToExercise - sharesSoldToCover);
  const totalGrossSaleProceeds = sharesToExercise * currentFmv;
  const netCashReceivedIf100PctSold = Math.max(
    0,
    totalGrossSaleProceeds - strikePricePayable - perquisiteTdsPayable
  );

  return {
    sharesToExercise,
    strikePricePayable,
    perquisiteTdsPayable,
    totalFinancialObligation,
    sharesSoldToCover,
    netSharesRetained,
    netCashReceivedIf100PctSold,
    outOfPocketCashRequired: 0, // Zero cash needed from employee!
  };
}

/**
 * Calculates vested shares based on months completed and vesting model
 */
export function calculateVestedPortion(
  totalGranted: number,
  monthsCompleted: number,
  model: 'swiggy-uniform' | 'zomato-backloaded' | 'milestone-hybrid'
): { vestedShares: number; vestingPercentage: number; isCliffSatisfied: boolean } {
  // Statutory 1-Year Cliff (12 months mandatory under Rule 12)
  if (monthsCompleted < 12) {
    return {
      vestedShares: 0,
      vestingPercentage: 0,
      isCliffSatisfied: false,
    };
  }

  let percentage = 0;

  if (model === 'swiggy-uniform') {
    // Swiggy Uniform: 25% each year (25% at 12m, 50% at 24m, 75% at 36m, 100% at 48m)
    const years = Math.min(4, Math.floor(monthsCompleted / 12));
    const extraMonths = Math.min(11, monthsCompleted % 12);
    // Smooth monthly accrual post cliff
    percentage = (years * 0.25) + (years < 4 ? (extraMonths / 12) * 0.25 : 0);
  } else if (model === 'zomato-backloaded') {
    // Zomato Back-Loaded: Year 1: 5%, Year 2: 15%, Year 3: 30%, Year 4: 50%
    if (monthsCompleted >= 48) {
      percentage = 1.0;
    } else if (monthsCompleted >= 36) {
      const fraction = (monthsCompleted - 36) / 12;
      percentage = 0.50 + fraction * 0.50;
    } else if (monthsCompleted >= 24) {
      const fraction = (monthsCompleted - 24) / 12;
      percentage = 0.20 + fraction * 0.30;
    } else if (monthsCompleted >= 12) {
      const fraction = (monthsCompleted - 12) / 12;
      percentage = 0.05 + fraction * 0.15;
    }
  } else if (model === 'milestone-hybrid') {
    // 50% uniform tenure (over 4 years) + 50% tied to company milestones
    const tenurePortion = Math.min(1.0, monthsCompleted / 48) * 0.5;
    // Assume milestones hit at 18m (20%) and 36m (30%)
    let milestonePortion = 0;
    if (monthsCompleted >= 36) milestonePortion = 0.5;
    else if (monthsCompleted >= 18) milestonePortion = 0.2;

    percentage = tenurePortion + milestonePortion;
  }

  const finalPercentage = Math.min(1.0, Math.max(0, percentage));
  const vestedShares = Math.round(totalGranted * finalPercentage);

  return {
    vestedShares,
    vestingPercentage: Number((finalPercentage * 100).toFixed(1)),
    isCliffSatisfied: true,
  };
}
