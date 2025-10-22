// Pennsylvania Law Compliant Pricing Structure
export const PRICING = {
  RON: {
    display: "$50",
    notaryFee: 5,
    technologyFee: 45,
    total: 50,
    description: "$5 PA notary fee + $45 technology fee"
  },
  MOBILE: {
    display: "$50 + mileage",
    notaryFee: 5,
    serviceFee: 45,
    baseTotal: 50,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "$5 PA notary + $45 service + $1.50/mile"
  },
  LOAN_SIGNING: {
    display: "$175",
    notaryFee: 5,
    agentFee: 170,
    total: 175,
    description: "$5 PA notary + $170 signing agent service"
  },
  APOSTILLE: {
    display: "$245+",
    notaryFee: 5,
    processingFee: 240,
    baseTotal: 245,
    description: "$5 PA notary + $240+ processing & coordination"
  },
  I9_VERIFICATION: {
    display: "$85+",
    inPerson: 85,
    remote: 125,
    description: "Employment verification services"
  },
  LLC_FORMATION: {
    display: "$149+",
    total: 149,
    description: "LLC formation and filing assistance"
  },
  BUSINESS_RETAINER: {
    display: "$399+",
    monthly: 399,
    description: "Monthly retainer plans for businesses"
  }
};

export const getServicePricing = (cityName: string) => ({
  RON: { ...PRICING.RON, description: `Online notarization 24/7 for ${cityName} residents` },
  MOBILE: { ...PRICING.MOBILE, description: `We come to your location in ${cityName}` },
  LOAN_SIGNING: { ...PRICING.LOAN_SIGNING, description: `Real estate closing services in ${cityName}` },
  APOSTILLE: { ...PRICING.APOSTILLE, description: "International document authentication" },
  I9: { ...PRICING.I9_VERIFICATION, description: `Employment verification for ${cityName} businesses` },
  LLC: { ...PRICING.LLC_FORMATION, description: `Start your ${cityName} business today` },
  RETAINER: { ...PRICING.BUSINESS_RETAINER, description: `Monthly plans for ${cityName} companies` }
});