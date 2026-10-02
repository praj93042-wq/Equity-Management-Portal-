export type Persona = 'founder' | 'employee';

export type FounderTab = 'captable' | 'scheme' | 'auditor' | 'vesting' | 'liquidity';
export type EmployeeTab = 'portfolio' | 'tax-sim' | 'post-ipo';

export interface Shareholder {
  id: string;
  name: string;
  category: 'Founder' | 'Investor' | 'Employee Pool' | 'Key Executive';
  round: 'Founding' | 'Seed' | 'Series A' | 'Series B';
  shares: number;
  percentage: number;
  votingPercentage: number;
  investmentAmount?: number;
}

export interface EmployeeGrant {
  id: string;
  employeeName: string;
  role: string;
  tier: 'Tier 1: Leadership' | 'Tier 2: Key Functional' | 'Tier 3: Broad Staff';
  totalGranted: number;
  vestedShares: number;
  exercisedShares: number;
  strikePrice: number;
  grantDate: string;
  vestingModel: 'swiggy-uniform' | 'zomato-backloaded' | 'milestone-hybrid';
  monthsCompleted: number;
}

export interface DamodaranValuationParams {
  enterpriseValue: number; // In INR
  cash: number;
  debt: number;
  marketBeta: number;
  rMarket: number; // correlation with market index
  riskFreeRate: number; // e.g. 0.07 (7%)
  equityRiskPremium: number; // e.g. 0.055 (5.5%)
  optionVolatility: number; // e.g. 0.45 (45%)
  optionAverageLifeYears: number; // e.g. 3.5 years
  weightedAverageStrike: number; // In INR
  totalPoolOptions: number;
  primarySharesOutstanding: number;
  dlomPercent: number; // e.g. 20%
  failureProbabilityPercent: number; // e.g. 10%
  liquidationValue: number;
}

export interface ValuationOutput {
  totalBeta: number;
  costOfEquity: number;
  blackScholesOptionValuePerOption: number;
  totalOptionOverhangValue: number;
  netEquityValueCommon: number;
  intrinsicValuePerShare: number;
  postDlomValuePerShare: number;
  finalProbabilityWeightedPerShare: number;
  naiveDilutionPerShare: number;
  overhangSavingsDiff: number;
}

export interface ThreeStageTaxResult {
  grantTax: number;
  exercisePerquisiteValue: number;
  exerciseTdsTax: number;
  capitalGain: number;
  capitalGainsTax: number;
  isLongTerm: boolean;
  totalTaxPaid: number;
  netProceeds: number;
  totalPreTaxValue: number;
}

export interface CashlessExerciseCalculation {
  sharesToExercise: number;
  strikePricePayable: number;
  perquisiteTdsPayable: number;
  totalFinancialObligation: number;
  sharesSoldToCover: number;
  netSharesRetained: number;
  netCashReceivedIf100PctSold: number;
  outOfPocketCashRequired: number;
}

export interface AuditIssue {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  clauseTitle: string;
  detectedTextSnippet: string;
  riskDescription: string;
  legalImplication: string;
  recommendedRedline: string;
}

export interface AuditResult {
  overallRiskScore: number;
  verdict: string;
  summary: string;
  issues: AuditIssue[];
  dpiitExemptionStatus: string;
  governanceChecklist: {
    item: string;
    status: 'PASS' | 'FAIL' | 'WARN';
    notes: string;
  }[];
}
