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
    landmarks: ["Presque Isle State Park", "Erie Maritime Museum", "Bayfront Convention Center", "UPMC Park", "Waldameer Park", "Erie Insurance Arena", "Blasco Library", "Downtown Erie"],
    description: "Pennsylvania's fourth-largest city and the Gem City of the Great Lakes, Erie is a vibrant waterfront community with rich history and modern amenities",
    population: "~95,000",
    uniqueTrait: "Home to Presque Isle State Park, one of PA's most visited attractions, and Lake Erie's stunning waterfront with beaches, marinas, and year-round activities"
  },
  millcreek: {
    name: "Millcreek",
    slug: "millcreek",
    county: "Erie County",
    zipCodes: ["16509", "16565"],
    nearbyComm: ["Erie", "Fairview", "Edinboro", "Girard", "Lake City"],
    landmarks: ["Millcreek Mall Complex", "Splash Lagoon Indoor Waterpark", "LECOM Institute", "Asbury Woods Nature Center", "I-79 Commercial District", "Millcreek Township Building"],
    description: "Erie County's largest and most populous township, featuring major commercial centers, family entertainment, healthcare facilities, and excellent schools",
    population: "~55,000",
    uniqueTrait: "Pennsylvania's largest township by population, home to Millcreek Mall (one of PA's largest shopping centers), Splash Lagoon waterpark resort, and thriving business community"
  },
  harborcreek: {
    name: "Harborcreek",
    slug: "harborcreek",
    county: "Erie County",
    zipCodes: ["16421", "16510"],
    nearbyComm: ["Erie", "North East", "Wesleyville", "Lawrence Park"],
    landmarks: ["Woodlands Golf Course", "Lake Erie Coastline", "Harborcreek Township Park", "Route 5 (Lake Road)", "Harborcreek Youth Services", "Harborcreek School District"],
    description: "Premier lakeside township in eastern Erie County offering beautiful Lake Erie views, top-rated schools, and quiet residential neighborhoods",
    population: "~15,000",
    uniqueTrait: "Boasts scenic Lake Erie shoreline, award-winning Harborcreek School District consistently ranked among PA's best, and peaceful suburban living with easy access to Erie"
  },
  fairview: {
    name: "Fairview",
    slug: "fairview",
    county: "Erie County",
    zipCodes: ["16415", "16428"],
    nearbyComm: ["Millcreek", "Girard", "Erie", "Lake City"],
    landmarks: ["Fairview Township Park", "West Ridge School District", "Lake Erie shoreline", "Route 20 Commercial Corridor", "Avonia Beach", "Fairview Fire Department"],
    description: "Fast-growing lakeside township in western Erie County, known for excellent schools, family-friendly atmosphere, and Lake Erie beach access",
    population: "~11,000",
    uniqueTrait: "One of Erie County's fastest-growing communities, featuring top-rated Fairview School District, direct Lake Erie beach access at Avonia, and strong sense of community"
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
    landmarks: ["Edinboro University (PennWest Edinboro)", "Edinboro Lake", "Downtown Historic District", "Porreco College Center", "Route 6N", "Edinboro Borough Hall"],
    description: "Vibrant college town in southern Erie County, centered around PennWest Edinboro campus and the scenic natural Edinboro Lake",
    population: "~6,500",
    uniqueTrait: "Home to PennWest Edinboro University with 5,000+ students, and Edinboro Lake - Pennsylvania's largest natural lake. Offers unique college-town culture with small-town charm"
  },
  wesleyville: {
    name: "Wesleyville",
    slug: "wesleyville",
    county: "Erie County",
    zipCodes: ["16510"],
    nearbyComm: ["Erie", "Harborcreek", "Lawrence Park"],
    landmarks: ["East Erie Commercial District", "Wesleyville Elementary School", "Buffalo Road (Route 20)", "Wesleyville Borough Building", "Lake Erie shoreline"],
    description: "Compact, close-knit borough in eastern Erie County along Lake Erie, offering easy access to Erie city amenities",
    population: "~3,300",
    uniqueTrait: "Small but strategic location on Buffalo Road corridor between Erie and Harborcreek, providing residents with hometown feel and big-city convenience"
  },
  girard: {
    name: "Girard",
    slug: "girard",
    county: "Erie County",
    zipCodes: ["16417"],
    nearbyComm: ["Fairview", "Lake City", "Cranberry Township", "Millcreek"],
    landmarks: ["Girard Borough Park", "Dan Rice Days Festival", "Historic Downtown Square", "Girard High School", "Route 20 Main Street", "Battles Museums of Rural Life"],
    description: "Historic borough in southwestern Erie County, celebrating its Victorian heritage and famous resident Dan Rice with annual festival",
    population: "~3,100",
    uniqueTrait: "Birthplace of Dan Rice, 19th century circus performer who inspired Uncle Sam. Annual Dan Rice Days celebrates local history with parades and festivities"
  },
  waterford: {
    name: "Waterford",
    slug: "waterford",
    county: "Erie County",
    zipCodes: ["16441"],
    nearbyComm: ["Edinboro", "Union City", "Wattsburg", "Erie"],
    landmarks: ["Fort LeBoeuf Museum", "Eagle Historic District", "LeBoeuf Creek", "Waterford Community Park", "Route 19 & Route 97 Junction", "Historic Downtown Waterford"],
    description: "Historic borough at the crossroads of southern Erie County, featuring French & Indian War heritage and small-town Pennsylvania charm",
    population: "~1,500",
    uniqueTrait: "Home to Fort LeBoeuf, a strategic French fort during French & Indian War (1753). George Washington visited here on his first military mission. Rich Erie Canal and early American history"
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
  },
  northWarren: {
    name: "North Warren",
    slug: "north-warren",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["Warren", "Youngsville", "Sugar Grove"],
    landmarks: ["Allegheny River", "Warren area"],
    description: "Northern Warren County community",
    uniqueTrait: "Residential community near Allegheny National Forest"
  },
  youngsville: {
    name: "Youngsville",
    slug: "youngsville",
    county: "Warren County",
    zipCodes: ["16371"],
    nearbyComm: ["Warren", "Sugar Grove", "Pittsfield"],
    landmarks: ["Brokenstraw Creek", "Downtown Youngsville"],
    description: "Small borough in Warren County",
    population: "~1,700",
    uniqueTrait: "Quiet community along Brokenstraw Creek"
  },
  russell: {
    name: "Russell",
    slug: "russell",
    county: "Warren County",
    zipCodes: ["16345"],
    nearbyComm: ["Warren", "Clarendon", "Tidioute"],
    landmarks: ["Allegheny River", "Russell area"],
    description: "Small Warren County community",
    population: "~350",
    uniqueTrait: "Rural community near Allegheny River"
  },
  tidioute: {
    name: "Tidioute",
    slug: "tidioute",
    county: "Warren County",
    zipCodes: ["16351"],
    nearbyComm: ["Warren", "Irvine", "Tionesta"],
    landmarks: ["Allegheny River", "Historic downtown"],
    description: "Scenic river borough",
    population: "~680",
    uniqueTrait: "Picturesque Allegheny River location"
  },
  sugarGrove: {
    name: "Sugar Grove",
    slug: "sugar-grove",
    county: "Warren County",
    zipCodes: ["16350"],
    nearbyComm: ["Youngsville", "Bear Lake", "Warren"],
    landmarks: ["Sugar Grove area", "Agricultural lands"],
    description: "Rural Warren County township",
    population: "~700",
    uniqueTrait: "Agricultural community in Warren County"
  },
  sheffield: {
    name: "Sheffield",
    slug: "sheffield",
    county: "Warren County",
    zipCodes: ["16347"],
    nearbyComm: ["Clarendon", "Warren", "Kinzua"],
    landmarks: ["Allegheny National Forest access", "Sheffield area"],
    description: "Forest township community",
    population: "~1,100",
    uniqueTrait: "Located in heart of Allegheny National Forest region"
  },
  clarendon: {
    name: "Clarendon",
    slug: "clarendon",
    county: "Warren County",
    zipCodes: ["16313"],
    nearbyComm: ["Warren", "Sheffield", "Russell"],
    landmarks: ["Allegheny River", "Forest lands"],
    description: "Rural Warren County borough",
    population: "~475",
    uniqueTrait: "Small community near Allegheny Reservoir"
  },
  kinzua: {
    name: "Kinzua",
    slug: "kinzua",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["Warren", "Sheffield", "Mount Jewett"],
    landmarks: ["Kinzua Bridge State Park", "Allegheny National Forest"],
    description: "Forest community near historic bridge",
    population: "~300",
    uniqueTrait: "Home to world-famous Kinzua Bridge skywalk"
  },
  
  // More Erie County
  lakeCity: {
    name: "Lake City",
    slug: "lake-city",
    county: "Erie County",
    zipCodes: ["16423"],
    nearbyComm: ["Girard", "Fairview", "Edinboro"],
    landmarks: ["Lake City area", "Historic downtown"],
    description: "Small borough in southern Erie County",
    population: "~2,900",
    uniqueTrait: "Charming small town atmosphere"
  },
  wattsburg: {
    name: "Wattsburg",
    slug: "wattsburg",
    county: "Erie County",
    zipCodes: ["16442"],
    nearbyComm: ["Erie", "Edinboro", "Union City"],
    landmarks: ["Wattsburg Area School District", "Downtown square"],
    description: "Rural borough in Erie County",
    population: "~380",
    uniqueTrait: "Small-town charm in rural Erie County"
  },
  unionCity: {
    name: "Union City",
    slug: "union-city",
    county: "Erie County",
    zipCodes: ["16438"],
    nearbyComm: ["Waterford", "Edinboro", "Corry"],
    landmarks: ["Union City Dam", "Downtown Union City"],
    description: "Borough straddling Erie and Crawford counties",
    population: "~3,300",
    uniqueTrait: "Located in both Erie and Crawford counties"
  },
  corry: {
    name: "Corry",
    slug: "corry",
    county: "Erie County",
    zipCodes: ["16407"],
    nearbyComm: ["Union City", "Columbus", "Spartansburg"],
    landmarks: ["Corry Area Historical Society", "Downtown Corry"],
    description: "City in southeastern Erie County",
    population: "~6,600",
    uniqueTrait: "Industrial heritage city in southeast Erie County"
  },
  albion: {
    name: "Albion",
    slug: "albion",
    county: "Erie County",
    zipCodes: ["16401"],
    nearbyComm: ["Cranberry Township", "Girard", "Conneaut OH"],
    landmarks: ["Downtown Albion Square", "Albion Borough Hall", "Route 18", "Northwestern School District", "Albion Area Fair Grounds"],
    description: "Quiet borough in western Erie County near the Ohio border, offering small-town living with agricultural heritage",
    population: "~1,500",
    uniqueTrait: "Westernmost borough in Erie County, serving as a local hub for surrounding farming communities and close to Ohio border shopping"
  },
  cranberryTownship: {
    name: "Cranberry Township",
    slug: "cranberry-township",
    county: "Erie County",
    zipCodes: ["16319"],
    nearbyComm: ["Albion", "Girard", "Meadville"],
    landmarks: ["Cranberry Mall area", "Township parks"],
    description: "Township in western Erie County",
    population: "~7,000",
    uniqueTrait: "Growing township in western Erie County"
  },
  springCreek: {
    name: "Spring Creek",
    slug: "spring-creek",
    county: "Erie County",
    zipCodes: ["16436"],
    nearbyComm: ["Waterford", "Union City", "Edinboro"],
    landmarks: ["Spring Creek Township", "Rural lands"],
    description: "Rural township in Erie County",
    population: "~1,100",
    uniqueTrait: "Peaceful rural community"
  },
  lawrencePark: {
    name: "Lawrence Park",
    slug: "lawrence-park",
    county: "Erie County",
    zipCodes: ["16511"],
    nearbyComm: ["Erie", "Wesleyville", "Harborcreek"],
    landmarks: ["General Electric plant area", "Residential neighborhoods"],
    description: "Small borough in eastern Erie",
    population: "~3,900",
    uniqueTrait: "Historic GE employee community"
  },
  bearLake: {
    name: "Bear Lake",
    slug: "bear-lake",
    county: "Warren County",
    zipCodes: ["16402"],
    nearbyComm: ["North East", "Sugar Grove", "Youngsville"],
    landmarks: ["Bear Lake", "Rural farmland"],
    description: "Small borough near lake",
    population: "~200",
    uniqueTrait: "Tiny community near scenic Bear Lake"
  },
  
  // More Crawford County
  cochranton: {
    name: "Cochranton",
    slug: "cochranton",
    county: "Crawford County",
    zipCodes: ["16314"],
    nearbyComm: ["Meadville", "Conneaut Lake", "Saegertown"],
    landmarks: ["French Creek", "Downtown Cochranton"],
    description: "Small borough along French Creek",
    population: "~1,150",
    uniqueTrait: "French Creek community"
  },
  saegertown: {
    name: "Saegertown",
    slug: "saegertown",
    county: "Crawford County",
    zipCodes: ["16433"],
    nearbyComm: ["Meadville", "Edinboro", "Cambridge Springs"],
    landmarks: ["Woodcock Creek", "Saegertown schools"],
    description: "Borough in eastern Crawford County",
    population: "~1,050",
    uniqueTrait: "Small town along Woodcock Creek"
  },
  cambridgeSprings: {
    name: "Cambridge Springs",
    slug: "cambridge-springs",
    county: "Crawford County",
    zipCodes: ["16403"],
    nearbyComm: ["Edinboro", "Meadville", "Saegertown"],
    landmarks: ["Riverside Inn", "French Creek", "Historic spa town"],
    description: "Historic spa and resort town",
    population: "~2,600",
    uniqueTrait: "Historic mineral springs resort town"
  },
  conneautville: {
    name: "Conneautville",
    slug: "conneautville",
    county: "Crawford County",
    zipCodes: ["16406"],
    nearbyComm: ["Conneaut Lake", "Meadville", "Harmonsburg"],
    landmarks: ["Conneaut Marsh", "Downtown square"],
    description: "Small borough in Crawford County",
    population: "~750",
    uniqueTrait: "Gateway to Conneaut Lake region"
  },
  linesville: {
    name: "Linesville",
    slug: "linesville",
    county: "Crawford County",
    zipCodes: ["16424"],
    nearbyComm: ["Conneaut Lake", "Harmonsburg", "Jamestown"],
    landmarks: ["Pymatuning Reservoir", "Linesville Spillway"],
    description: "Borough on Pymatuning Lake",
    population: "~1,000",
    uniqueTrait: "Home to famous 'where ducks walk on fish' spillway"
  },
  harmonsburg: {
    name: "Harmonsburg",
    slug: "harmonsburg",
    county: "Crawford County",
    zipCodes: ["16422"],
    nearbyComm: ["Conneaut Lake", "Linesville", "Conneautville"],
    landmarks: ["Pymatuning State Park", "Lake area"],
    description: "Small borough near Pymatuning",
    population: "~600",
    uniqueTrait: "Pymatuning lake community"
  },
  spartansburg: {
    name: "Spartansburg",
    slug: "spartansburg",
    county: "Crawford County",
    zipCodes: ["16434"],
    nearbyComm: ["Corry", "Union City", "Centerville"],
    landmarks: ["Spartansburg area", "Agricultural lands"],
    description: "Rural borough in Crawford County",
    population: "~300",
    uniqueTrait: "Small agricultural community"
  },
  bloomingValley: {
    name: "Blooming Valley",
    slug: "blooming-valley",
    county: "Crawford County",
    zipCodes: ["16509"],
    nearbyComm: ["Meadville", "Cochranton", "Cambridge Springs"],
    landmarks: ["Rural farmland", "Small community"],
    description: "Tiny rural community",
    population: "~400",
    uniqueTrait: "Quiet rural farming area"
  },
  guysMills: {
    name: "Guys Mills",
    slug: "guys-mills",
    county: "Crawford County",
    zipCodes: ["16327"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Edinboro"],
    landmarks: ["Rural community", "Agricultural area"],
    description: "Small unincorporated community",
    population: "~100",
    uniqueTrait: "Historic rural crossroads"
  },
  hydetown: {
    name: "Hydetown",
    slug: "hydetown",
    county: "Crawford County",
    zipCodes: ["16328"],
    nearbyComm: ["Titusville", "Meadville", "Pleasantville"],
    landmarks: ["Oil Creek area", "Historic oil region"],
    description: "Oil region community",
    population: "~700",
    uniqueTrait: "Oil boom heritage village"
  },
  pleasantville: {
    name: "Pleasantville",
    slug: "pleasantville",
    county: "Venango County",
    zipCodes: ["16341"],
    nearbyComm: ["Titusville", "Oil City", "Hydetown"],
    landmarks: ["Oil Creek", "Rural area"],
    description: "Small borough in oil country",
    population: "~860",
    uniqueTrait: "Oil heritage community"
  },
  cooperstown: {
    name: "Cooperstown",
    slug: "cooperstown",
    county: "Venango County",
    zipCodes: ["16317"],
    nearbyComm: ["Franklin", "Oil City", "Polk"],
    landmarks: ["Allegheny River area", "Rural lands"],
    description: "Small Venango County borough",
    population: "~440",
    uniqueTrait: "Quiet Allegheny River community"
  },
  polk: {
    name: "Polk",
    slug: "polk",
    county: "Venango County",
    zipCodes: ["16342"],
    nearbyComm: ["Franklin", "Cooperstown", "Emlenton"],
    landmarks: ["Allegheny River", "Rural area"],
    description: "Small borough in Venango County",
    population: "~850",
    uniqueTrait: "Small-town Venango County charm"
  },
  emlenton: {
    name: "Emlenton",
    slug: "emlenton",
    county: "Venango County",
    zipCodes: ["16373"],
    nearbyComm: ["Franklin", "Clintonville", "Parker"],
    landmarks: ["Allegheny River", "Historic downtown"],
    description: "River borough in Venango County",
    population: "~620",
    uniqueTrait: "Scenic Allegheny River location"
  },
  rouseville: {
    name: "Rouseville",
    slug: "rouseville",
    county: "Venango County",
    zipCodes: ["16344"],
    nearbyComm: ["Oil City", "Franklin", "Pleasantville"],
    landmarks: ["Oil Creek", "Oil heritage"],
    description: "Oil Creek community",
    population: "~510",
    uniqueTrait: "Historic oil industry village"
  },
  
  // More Mercer County
  farrell: {
    name: "Farrell",
    slug: "farrell",
    county: "Mercer County",
    zipCodes: ["16121"],
    nearbyComm: ["Sharon", "Hermitage", "Wheatland"],
    landmarks: ["Shenango River", "Downtown Farrell"],
    description: "Steel heritage city",
    population: "~4,900",
    uniqueTrait: "Steel industry heritage"
  },
  sharpsville: {
    name: "Sharpsville",
    slug: "sharpsville",
    county: "Mercer County",
    zipCodes: ["16150"],
    nearbyComm: ["Sharon", "Hermitage", "Clark"],
    landmarks: ["Shenango River", "Historic downtown"],
    description: "Borough in Mercer County",
    population: "~4,400",
    uniqueTrait: "Historic manufacturing community"
  },
  stoneboro: {
    name: "Stoneboro",
    slug: "stoneboro",
    county: "Mercer County",
    zipCodes: ["16153"],
    nearbyComm: ["Sandy Lake", "Mercer", "Jackson Center"],
    landmarks: ["Sandy Lake area", "Rural lands"],
    description: "Small rural borough",
    population: "~1,050",
    uniqueTrait: "Gateway to Sandy Lake"
  },
  sandyLake: {
    name: "Sandy Lake",
    slug: "sandy-lake",
    county: "Mercer County",
    zipCodes: ["16145"],
    nearbyComm: ["Stoneboro", "Greenville", "Mercer"],
    landmarks: ["Sandy Lake", "Lake community"],
    description: "Lake community borough",
    population: "~700",
    uniqueTrait: "Peaceful lake community"
  },
  clarkPa: {
    name: "Clark",
    slug: "clark",
    county: "Mercer County",
    zipCodes: ["16113"],
    nearbyComm: ["Sharon", "Sharpsville", "Greenville"],
    landmarks: ["Rural area", "Agricultural lands"],
    description: "Small Mercer County borough",
    population: "~620",
    uniqueTrait: "Small agricultural community"
  },
  clintonville: {
    name: "Clintonville",
    slug: "clintonville",
    county: "Venango County",
    zipCodes: ["16372"],
    nearbyComm: ["Franklin", "Emlenton", "Grove City"],
    landmarks: ["Allegheny River area", "Rural lands"],
    description: "Small borough on county line",
    population: "~470",
    uniqueTrait: "Quiet community near Venango-Mercer border"
  },
  townville: {
    name: "Townville",
    slug: "townville",
    county: "Crawford County",
    zipCodes: ["16360"],
    nearbyComm: ["Meadville", "Edinboro", "Cambridge Springs"],
    landmarks: ["Rural farmland", "Small community"],
    description: "Tiny Crawford County borough",
    population: "~320",
    uniqueTrait: "One of Pennsylvania's smallest boroughs"
  },
  riceville: {
    name: "Riceville",
    slug: "riceville",
    county: "Crawford County",
    zipCodes: ["16427"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Venango"],
    landmarks: ["Rural area", "Agricultural lands"],
    description: "Small rural community",
    population: "~150",
    uniqueTrait: "Tiny rural hamlet"
  },
  utica: {
    name: "Utica",
    slug: "utica",
    county: "Venango County",
    zipCodes: ["16362"],
    nearbyComm: ["Franklin", "Polk", "Cooperstown"],
    landmarks: ["Rural Venango County", "Agricultural area"],
    description: "Small rural borough",
    population: "~210",
    uniqueTrait: "Small Venango County community"
  },
  irvine: {
    name: "Irvine",
    slug: "irvine",
    county: "Warren County",
    zipCodes: ["16329"],
    nearbyComm: ["Warren", "Tidioute", "Sheffield"],
    landmarks: ["Allegheny River area", "Forest lands"],
    description: "Small Warren County borough",
    population: "~600",
    uniqueTrait: "Allegheny River community"
  },
  pittsfield: {
    name: "Pittsfield",
    slug: "pittsfield",
    county: "Warren County",
    zipCodes: ["16340"],
    nearbyComm: ["Youngsville", "Sugar Grove", "Columbus"],
    landmarks: ["Brokenstraw Creek", "Rural area"],
    description: "Small borough in Warren County",
    population: "~230",
    uniqueTrait: "Small rural Warren County community"
  },
  chandlersValley: {
    name: "Chandlers Valley",
    slug: "chandlers-valley",
    county: "Warren County",
    zipCodes: ["16312"],
    nearbyComm: ["Warren", "Clarendon", "Sugar Grove"],
    landmarks: ["Rural valley", "Forest area"],
    description: "Unincorporated community",
    population: "~100",
    uniqueTrait: "Remote forest community"
  },
  sugarcreek: {
    name: "Sugarcreek",
    slug: "sugarcreek",
    county: "Venango County",
    zipCodes: ["16323"],
    nearbyComm: ["Franklin", "Oil City", "Polk"],
    landmarks: ["Allegheny River area", "Rural lands"],
    description: "Small borough in Venango County",
    population: "~5,200",
    uniqueTrait: "Growing Venango County community"
  },
  venangoCounty: {
    name: "Venango Crawford",
    slug: "venango-crawford",
    county: "Venango County",
    zipCodes: ["16365"],
    nearbyComm: ["Franklin", "Meadville", "Oil City"],
    landmarks: ["County border area", "Rural region"],
    description: "County border region",
    uniqueTrait: "Border region between counties"
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
