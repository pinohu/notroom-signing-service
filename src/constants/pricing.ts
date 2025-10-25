// Pennsylvania Law Compliant Pricing Structure
export const PRICING = {
  RON: {
    display: "$60",
    notaryFee: 5,
    technologyFee: 55,
    total: 60,
    description: "$5 PA notary fee + $55 technology fee"
  },
  MOBILE: {
    display: "$125 + mileage",
    notaryFee: 5,
    serviceFee: 120,
    baseTotal: 125,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "$5 PA notary + $120 service + $1.50/mile"
  },
  LOAN_SIGNING: {
    display: "$175",
    notaryFee: 5,
    agentFee: 170,
    total: 175,
    description: "$5 PA notary + $170 signing agent service"
  },
  LOAN_SIGNING_MOBILE: {
    display: "$175 + mileage",
    notaryFee: 5,
    agentFee: 170,
    baseTotal: 175,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "$5 PA notary + $170 agent service + $1.50/mile"
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
  I9_VERIFICATION_MOBILE: {
    display: "$85 + mileage",
    baseFee: 85,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "In-person verification with travel"
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
  },
  CERTIFIED_COPIES: {
    display: "$20",
    perDocument: 20,
    office: 20,
    remote: 25,
    description: "At office or by mail"
  },
  CERTIFIED_COPIES_MOBILE: {
    display: "$20 + mileage",
    perDocument: 20,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Mobile certified copy service with travel"
  },
  DOCUMENT_PREP: {
    display: "$100+",
    basePrice: 100,
    office: 100,
    remote: 100,
    description: "Professional document preparation services"
  },
  DOCUMENT_PREP_MOBILE: {
    display: "$100 + mileage",
    basePrice: 100,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Mobile document preparation with travel"
  },
  FINGERPRINTING: {
    display: "$35",
    inPerson: 35,
    description: "FBI-approved fingerprinting services"
  },
  FINGERPRINTING_MOBILE: {
    display: "$35 + mileage",
    baseFee: 35,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Mobile fingerprinting with travel"
  },
  WITNESS_SERVICE: {
    display: "$60",
    baseFee: 60,
    description: "Professional witness services"
  },
  WITNESS_SERVICE_MOBILE: {
    display: "$60 + mileage",
    baseFee: 60,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Mobile witness service with travel"
  },
  PASSPORT_PHOTOS: {
    display: "$15",
    perSession: 15,
    office: 15,
    description: "At our office location"
  },
  PASSPORT_PHOTOS_MOBILE: {
    display: "$15 + mileage",
    perSession: 15,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Mobile passport photo service with travel"
  },
  TRANSLATION_CERT: {
    display: "$35+",
    perPage: 35,
    remote: 35,
    description: "Remote service - mail or email"
  },
  VEHICLE_TITLE: {
    display: "$40",
    baseFee: 40,
    description: "Vehicle title transfer notarization"
  },
  VEHICLE_TITLE_MOBILE: {
    display: "$40 + mileage",
    baseFee: 40,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Mobile vehicle title service with travel"
  },
  WEDDING_OFFICIANT: {
    display: "$200",
    baseFee: 200,
    description: "Wedding ceremony officiant services"
  },
  PROCESS_SERVING: {
    display: "$75",
    perServe: 75,
    description: "Legal document process serving"
  },
  PROCESS_SERVING_MOBILE: {
    display: "$75 + mileage",
    baseFee: 75,
    mileageRate: 1.50,
    originAddress: "6238 Cobblestone Dr, Erie, PA 16509",
    description: "Process serving with travel"
  },
  VIRTUAL_MAILBOX: {
    display: "$50/mo",
    monthly: 50,
    description: "Virtual mailbox and mail forwarding"
  },
  UCC_FILING: {
    display: "$125",
    baseFee: 125,
    description: "UCC filing services"
  },
  DOCUMENT_RETRIEVAL: {
    display: "$75+",
    baseFee: 75,
    description: "Document retrieval from government offices"
  }
};

export const getServicePricing = (cityName: string) => ({
  RON: { ...PRICING.RON, description: `Online notarization 24/7 for ${cityName} residents` },
  MOBILE: { ...PRICING.MOBILE, description: `We come to your location in ${cityName}` },
  LOAN_SIGNING: { ...PRICING.LOAN_SIGNING, description: `Real estate closing services in ${cityName}` },
  APOSTILLE: { ...PRICING.APOSTILLE, description: "International document authentication" },
  I9: { ...PRICING.I9_VERIFICATION, description: `Employment verification for ${cityName} businesses` },
  LLC: { ...PRICING.LLC_FORMATION, description: `Start your ${cityName} business today` },
  RETAINER: { ...PRICING.BUSINESS_RETAINER, description: `Monthly plans for ${cityName} companies` },
  CERTIFIED_COPIES: { ...PRICING.CERTIFIED_COPIES, description: `Document certification in ${cityName}` },
  DOCUMENT_PREP: { ...PRICING.DOCUMENT_PREP, description: `Professional document services for ${cityName}` },
  FINGERPRINTING: { ...PRICING.FINGERPRINTING_MOBILE, description: `Mobile fingerprinting in ${cityName}` },
  WITNESS: { ...PRICING.WITNESS_SERVICE_MOBILE, description: `Professional witness service in ${cityName}` },
  PASSPORT_PHOTOS: { ...PRICING.PASSPORT_PHOTOS, description: `Passport photos in ${cityName}` },
  TRANSLATION_CERT: { ...PRICING.TRANSLATION_CERT, description: `Translation certification in ${cityName}` },
  VEHICLE_TITLE: { ...PRICING.VEHICLE_TITLE_MOBILE, description: `Vehicle title services in ${cityName}` },
  WEDDING: { ...PRICING.WEDDING_OFFICIANT, description: `Wedding officiant in ${cityName}` },
  PROCESS_SERVING: { ...PRICING.PROCESS_SERVING_MOBILE, description: `Process serving in ${cityName}` },
  VIRTUAL_MAILBOX: { ...PRICING.VIRTUAL_MAILBOX, description: `Virtual mailbox for ${cityName} businesses` },
  UCC_FILING: { ...PRICING.UCC_FILING, description: `UCC filing services in ${cityName}` },
  DOCUMENT_RETRIEVAL: { ...PRICING.DOCUMENT_RETRIEVAL, description: `Document retrieval in ${cityName}` }
});