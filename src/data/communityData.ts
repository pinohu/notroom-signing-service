// Community-specific data for SEO optimization and localized content
export interface CommunityData {
  name: string;
  slug: string;
  county: string;
  zipCodes: string[];
  nearbyComm: string[];
  landmarks: string[];
  description: string;
  population?: string;
  uniqueTrait: string;
}

export const communityData: Record<string, CommunityData> = {
  // Erie County Communities
  erie: {
    name: "Erie",
    slug: "erie",
    county: "Erie County",
    zipCodes: ["16501", "16502", "16503", "16504", "16505", "16506", "16507", "16508", "16509", "16510", "16511", "16512", "16514", "16515", "16522", "16530", "16531", "16534", "16538", "16544", "16546", "16550", "16553", "16563"],
    nearbyComm: ["Millcreek", "Harborcreek", "Wesleyville", "Lawrence Park", "Fairview"],
    landmarks: ["Presque Isle State Park", "Erie Maritime Museum", "Bayfront Convention Center", "UPMC Park", "Waldameer Park"],
    description: "Pennsylvania's fourth-largest city and the Gem City of the Great Lakes",
    population: "~95,000",
    uniqueTrait: "Home to Presque Isle State Park and Lake Erie waterfront"
  },
  millcreek: {
    name: "Millcreek",
    slug: "millcreek",
    county: "Erie County",
    zipCodes: ["16509", "16565"],
    nearbyComm: ["Erie", "Fairview", "Edinboro", "Girard", "Lake City"],
    landmarks: ["Millcreek Mall", "Splash Lagoon", "LECOM Institute", "Asbury Woods Nature Center"],
    description: "Erie County's largest township with vibrant shopping and dining",
    population: "~55,000",
    uniqueTrait: "Home to the Millcreek Mall and major commercial district"
  },
  harborcreek: {
    name: "Harborcreek",
    slug: "harborcreek",
    county: "Erie County",
    zipCodes: ["16421", "16510"],
    nearbyComm: ["Erie", "North East", "Wesleyville", "Lawrence Park"],
    landmarks: ["Woodlands Golf Course", "Lake Erie Coastline", "Harborcreek Township Park"],
    description: "Peaceful lakeside township with scenic beauty",
    population: "~15,000",
    uniqueTrait: "Scenic Lake Erie coastline and award-winning schools"
  },
  fairview: {
    name: "Fairview",
    slug: "fairview",
    county: "Erie County",
    zipCodes: ["16415", "16428"],
    nearbyComm: ["Millcreek", "Girard", "Erie", "Lake City"],
    landmarks: ["Fairview Park", "West Ridge School District", "Lake Erie shoreline"],
    description: "Growing lakeside community with excellent schools",
    population: "~11,000",
    uniqueTrait: "Family-friendly community with Lake Erie access"
  },
  northEast: {
    name: "North East",
    slug: "north-east",
    county: "Erie County",
    zipCodes: ["16428"],
    nearbyComm: ["Harborcreek", "North East Township", "Erie"],
    landmarks: ["Wine Country Trail", "Gibson Park", "Lake Erie beaches"],
    description: "Charming borough in Pennsylvania's wine country",
    population: "~4,300",
    uniqueTrait: "Heart of Erie County's wine region with 20+ wineries"
  },
  edinboro: {
    name: "Edinboro",
    slug: "edinboro",
    county: "Erie County",
    zipCodes: ["16412", "16444"],
    nearbyComm: ["Millcreek", "Cambridge Springs", "Waterford", "Erie"],
    landmarks: ["Edinboro University", "Edinboro Lake", "Downtown Historic District"],
    description: "College town with lakeside charm",
    population: "~6,500",
    uniqueTrait: "Home to Edinboro University and beautiful Edinboro Lake"
  },
  wesleyville: {
    name: "Wesleyville",
    slug: "wesleyville",
    county: "Erie County",
    zipCodes: ["16510"],
    nearbyComm: ["Erie", "Harborcreek", "Lawrence Park"],
    landmarks: ["East Erie Commercial District", "Wesleyville Elementary"],
    description: "Small borough in eastern Erie County",
    population: "~3,300",
    uniqueTrait: "Close-knit community with convenient Erie access"
  },
  girard: {
    name: "Girard",
    slug: "girard",
    county: "Erie County",
    zipCodes: ["16417"],
    nearbyComm: ["Fairview", "Lake City", "Cranberry Township", "Millcreek"],
    landmarks: ["Girard Borough Park", "Dan Rice Days Festival", "Downtown Square"],
    description: "Historic borough with small-town charm",
    population: "~3,100",
    uniqueTrait: "Birthplace of circus clown Dan Rice"
  },
  waterford: {
    name: "Waterford",
    slug: "waterford",
    county: "Erie County",
    zipCodes: ["16441"],
    nearbyComm: ["Edinboro", "Union City", "Wattsburg", "Erie"],
    landmarks: ["Fort LeBoeuf Museum", "Eagle Historic District", "LeBoeuf Creek"],
    description: "Historic crossroads community",
    population: "~1,500",
    uniqueTrait: "Rich French colonial and Erie Canal history"
  },
  
  // Crawford County Communities
  meadville: {
    name: "Meadville",
    slug: "meadville",
    county: "Crawford County",
    zipCodes: ["16335", "16388"],
    nearbyComm: ["Cochranton", "Saegertown", "Cambridge Springs", "Conneaut Lake"],
    landmarks: ["Allegheny College", "Diamond Park", "Market House", "Baldwin Reynolds House"],
    description: "Crawford County seat and college town",
    population: "~13,000",
    uniqueTrait: "Home to Allegheny College and zipper manufacturing history"
  },
  conneautLake: {
    name: "Conneaut Lake",
    slug: "conneaut-lake",
    county: "Crawford County",
    zipCodes: ["16316"],
    nearbyComm: ["Meadville", "Harmonsburg", "Linesville", "Conneautville"],
    landmarks: ["Conneaut Lake", "Conneaut Lake Park", "Beach areas"],
    description: "Pennsylvania's largest natural lake resort community",
    population: "~700",
    uniqueTrait: "Pennsylvania's largest natural glacier-formed lake"
  },
  titusville: {
    name: "Titusville",
    slug: "titusville",
    county: "Crawford County",
    zipCodes: ["16354"],
    nearbyComm: ["Pleasantville", "Hydetown", "Oil City", "Spartansburg"],
    landmarks: ["Drake Well Museum", "Oil Creek State Park", "Downtown Historic District"],
    description: "Birthplace of the American oil industry",
    population: "~5,400",
    uniqueTrait: "Site of world's first commercial oil well (1859)"
  },
  
  // Mercer County Communities
  mercer: {
    name: "Mercer",
    slug: "mercer",
    county: "Mercer County",
    zipCodes: ["16137"],
    nearbyComm: ["Grove City", "Greenville", "Sharon", "Stoneboro"],
    landmarks: ["Mercer County Courthouse", "Magoffin House Museum", "Downtown Square"],
    description: "Charming county seat with historic downtown",
    population: "~2,000",
    uniqueTrait: "Home to beautiful Victorian-era courthouse"
  },
  groveCity: {
    name: "Grove City",
    slug: "grove-city",
    county: "Mercer County",
    zipCodes: ["16127"],
    nearbyComm: ["Mercer", "Slippery Rock", "Harrisville", "Clintonville"],
    landmarks: ["Grove City College", "Grove City Premium Outlets", "Downtown Grove City"],
    description: "College town with premier outlet shopping",
    population: "~8,100",
    uniqueTrait: "Home to Grove City College and premium outlet mall"
  },
  hermitage: {
    name: "Hermitage",
    slug: "hermitage",
    county: "Mercer County",
    zipCodes: ["16148"],
    nearbyComm: ["Sharon", "Farrell", "Sharpsville", "Greenville"],
    landmarks: ["Shenango River Lake", "Winner's Circle Golf Course", "Hermitage Stadium"],
    description: "Growing commercial hub of Mercer County",
    population: "~16,200",
    uniqueTrait: "Largest city in Mercer County with thriving retail"
  },
  sharon: {
    name: "Sharon",
    slug: "sharon",
    county: "Mercer County",
    zipCodes: ["16146"],
    nearbyComm: ["Hermitage", "Farrell", "Sharpsville", "West Middlesex"],
    landmarks: ["Daffin's Candies", "Buhl Park", "Downtown Sharon"],
    description: "Historic steel town with Victorian charm",
    population: "~13,100",
    uniqueTrait: "Home to world's largest chocolate kingdom at Daffin's"
  },
  greenville: {
    name: "Greenville",
    slug: "greenville",
    county: "Mercer County",
    zipCodes: ["16125"],
    nearbyComm: ["Mercer", "Hermitage", "Jamestown", "Sandy Lake"],
    landmarks: ["Greenville Railroad Park Museum", "Downtown Historic District"],
    description: "Railroad heritage town in northwestern Mercer County",
    population: "~5,900",
    uniqueTrait: "Preserved railroad history and museum"
  },
  
  // Venango County Communities
  franklin: {
    name: "Franklin",
    slug: "franklin",
    county: "Venango County",
    zipCodes: ["16323"],
    nearbyComm: ["Oil City", "Cooperstown", "Emlenton", "Clintonville"],
    landmarks: ["DeBence Antique Music World", "Allegheny River", "Franklin Area Historical Society"],
    description: "Historic river town in Venango County",
    population: "~6,500",
    uniqueTrait: "Confluence of French Creek and Allegheny River"
  },
  oilCity: {
    name: "Oil City",
    slug: "oil-city",
    county: "Venango County",
    zipCodes: ["16301"],
    nearbyComm: ["Franklin", "Titusville", "Rouseville", "Pleasantville"],
    landmarks: ["Oil Creek State Park", "Venango Museum", "Historic Downtown"],
    description: "Oil boom heritage city",
    population: "~10,000",
    uniqueTrait: "Center of Pennsylvania's oil boom history"
  },
  
  // Warren County Communities
  warren: {
    name: "Warren",
    slug: "warren",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["North Warren", "Youngsville", "Russell", "Tidioute"],
    landmarks: ["Allegheny National Forest", "Kinzua Bridge", "Warren County Courthouse"],
    description: "Gateway to Allegheny National Forest",
    population: "~9,400",
    uniqueTrait: "Gateway city to Pennsylvania's only national forest"
  }
};

export const getCommunityData = (slug: string): CommunityData | undefined => {
  return communityData[slug];
};

export const getNearbyLinks = (nearbyComm: string[]): Array<{ name: string; slug: string }> => {
  return nearbyComm.map(name => {
    const entry = Object.values(communityData).find(c => c.name === name);
    return entry ? { name: entry.name, slug: entry.slug } : { name, slug: name.toLowerCase().replace(/\s+/g, '-') };
  });
};
