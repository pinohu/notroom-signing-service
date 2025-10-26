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
  historicalNarrative?: string;
  favoriteThings?: string[];
  imagePrompt?: string;
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
    uniqueTrait: "Home to Presque Isle State Park, one of PA's most visited attractions, and Lake Erie's stunning waterfront with beaches, marinas, and year-round activities",
    historicalNarrative: "Founded in 1795, Erie played a crucial role in the War of 1812 when Commodore Oliver Hazard Perry built his fleet here and defeated the British at the Battle of Lake Erie. The city's strategic location on Lake Erie made it a vital shipping hub during the canal era and later a manufacturing powerhouse. Today, Erie preserves its maritime heritage while embracing its role as northwestern Pennsylvania's cultural and economic center.",
    favoriteThings: [
      "Watching sunset over Lake Erie from Presque Isle State Park's beaches",
      "Summer concerts and festivals at Liberty Park on the bayfront",
      "Fresh perch and walleye at local waterfront restaurants",
      "Historic Perry's Monument and Maritime Museum",
      "Waldameer's iconic Ravine Flyer II wooden roller coaster",
      "Ice skating and hockey games at Erie Insurance Arena"
    ],
    imagePrompt: "Exact photorealistic view of Presque Isle State Park's Beach 6 at sunset with the distinctive Presque Isle Lighthouse (1872) visible, families walking the Sidewalk Trail, sailboats anchored at Presque Isle Bay, Perry Monument across the water, wooden boardwalk, actual sand dunes with beach grass. Iconic Erie scene residents recognize instantly."
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
    uniqueTrait: "Pennsylvania's largest township by population, home to Millcreek Mall (one of PA's largest shopping centers), Splash Lagoon waterpark resort, and thriving business community",
    historicalNarrative: "Originally settled in the early 1800s as farming communities, Millcreek transformed dramatically in the post-WWII era as Erie's suburbs expanded southward. The opening of Millcreek Mall in 1975 marked the township's evolution into Erie County's commercial hub. Today, Millcreek balances its residential character with modern amenities, maintaining green spaces like Asbury Woods while serving as the region's shopping and healthcare center.",
    favoriteThings: [
      "Year-round fun at Splash Lagoon Indoor Waterpark",
      "Shopping and dining at Millcreek Mall Complex",
      "Nature trails and wildlife at Asbury Woods Nature Center",
      "Community events at Millcreek Township parks",
      "Excellent schools in the Millcreek Township School District",
      "Convenient access to every amenity you need"
    ],
    imagePrompt: "Exact photorealistic view of Asbury Woods Nature Center's Brown's Farm entrance and the distinctive elevated boardwalk over Anna's Pond wetlands in autumn, families on wooden walkway, interpretive signs, pawpaw trees with fall colors, Asbury Woods environmental education building visible, Walnut Creek watershed area. Recognizable Millcreek landmark."
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
    uniqueTrait: "Boasts scenic Lake Erie shoreline, award-winning Harborcreek School District consistently ranked among PA's best, and peaceful suburban living with easy access to Erie",
    historicalNarrative: "Harborcreek's history stretches to 1795 when Pennsylvania's General Assembly created the township. Originally an agricultural community, it gradually transformed into one of Erie County's most desirable residential areas. The township's commitment to education excellence made Harborcreek School District one of Pennsylvania's top-ranked systems, attracting families seeking quality schools and lakefront living.",
    favoriteThings: [
      "Morning walks along Lake Erie's peaceful shoreline",
      "Top-ranked Harborcreek School District academics and sports",
      "Golfing at scenic Woodlands Golf Course",
      "Community events at Harborcreek Township Park",
      "Safe, family-friendly neighborhoods",
      "Beautiful sunrises over Lake Erie"
    ],
    imagePrompt: "Exact photorealistic sunrise view along Route 5 (Lake Road) in Harborcreek Township showing actual lakefront homes, Lake Erie's rocky shoreline at Freeport Beach access, joggers on the paved path, Harborcreek School District building visible, distinctive lake views residents know. Dawn light over calm waters."
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
    uniqueTrait: "One of Erie County's fastest-growing communities, featuring top-rated Fairview School District, direct Lake Erie beach access at Avonia, and strong sense of community",
    historicalNarrative: "Fairview Township was formed in 1832 from Girard Township, establishing itself as an agricultural community along Lake Erie's shore. The township grew steadily throughout the 20th century, but experienced rapid residential growth in the 1990s-2010s as families sought excellent schools and lakefront access. The Fairview School District's academic reputation and the township's small-town feel continue attracting new residents.",
    favoriteThings: [
      "Summer days at Avonia Beach on Lake Erie",
      "Fairview School District's award-winning programs",
      "Community festivals at Fairview Township Park",
      "Local businesses along Route 20",
      "Friendly neighbors and strong community spirit",
      "Convenient location between Erie and lake towns"
    ],
    imagePrompt: "Exact photorealistic view of Avonia Beach in Fairview Township showing the actual public beach access at Route 20 and Avonia Road, Lake Erie waves, the beach pavilion and parking area, families on sandy shore, distinctive bluffs, Fairview Water Authority water tower visible in distance. Recognizable local summer spot."
  },

  corry: {
    name: "Corry",
    slug: "corry",
    county: "Erie County",
    zipCodes: ["16407"],
    nearbyComm: ["Union City", "Columbus", "Spartansburg"],
    landmarks: ["Mead Avenue Historic District", "Corry Area Middle-High School", "Corry Higher Education Council", "Griswold Park", "Erie Street downtown corridor", "Wright Park", "Corry Memorial Hospital", "Historic Railroad Depot"],
    description: "Historic 'Gateway to the Southern Tier' - southeastern Erie County's manufacturing city known for zipper production heritage, precision tool-and-die craftsmanship, and proud working-class community",
    population: "~6,600",
    uniqueTrait: "America's historic zipper capital and precision manufacturing hub. Corry produced millions of zippers for WWII and developed world-class tool-and-die industry. Strong industrial heritage, skilled workforce tradition, and tight-knit working-class community pride",
    historicalNarrative: "Corry exploded onto the map in 1861 when three major railroads converged, creating a vital transportation junction. The city's industrial destiny was sealed when Talon zipper company established major operations here, making Corry the 'Zipper Capital of the World' - producing millions of zippers that equipped American soldiers in both World Wars. Alongside zipper production, Corry developed exceptional tool-and-die and precision manufacturing capabilities, with skilled craftsmen producing components for industries nationwide. The city's railroad heritage brought diverse immigrant populations - Italian, Polish, German - who built tight-knit ethnic neighborhoods and strong labor traditions. Mead Avenue's beautiful Victorian commercial district reflects Corry's prosperous manufacturing era. Though heavy industry declined, Corry's working-class pride, skilled workforce tradition, and community resilience remain strong. Today, Corry is reinventing itself while honoring its industrial heritage, maintaining excellent schools, and preserving the strong community bonds forged in factory neighborhoods. The Corry Higher Education Council ensures local students can access college degrees without leaving their hometown.",
    favoriteThings: [
      "Historic Mead Avenue downtown with Victorian storefronts and local businesses",
      "Fierce Corry Beavers school pride - football, basketball, wrestling traditions",
      "World-class zipper manufacturing heritage - 'Zipper Capital of the World'",
      "Precision tool-and-die and manufacturing craftsmanship legacy",
      "Griswold Park and Wright Park community gathering and recreation",
      "Corry Higher Education Council bringing college to town",
      "Strong working-class ethnic neighborhood pride and traditions",
      "Annual community festivals celebrating industrial heritage",
      "Historic Railroad Depot marking three railroads junction"
    ],
    imagePrompt: "Exact photorealistic view of Corry's Mead Avenue Historic District showing actual Victorian commercial buildings with detailed brickwork, Corry Area School District's distinctive brick building, Talon zipper factory heritage markers, working-class neighborhoods, three railroad tracks converging, American flags on storefronts, families downtown. Gateway to Southern Tier."
  },
  albion: {
    name: "Albion",
    slug: "albion",
    county: "Erie County",
    zipCodes: ["16401"],
    nearbyComm: ["Cranberry Township", "Girard", "Conneaut OH"],
    landmarks: ["Historic Downtown Square", "Northwestern School District complex", "Albion Area Fair Grounds", "Route 18 Main Street corridor", "Albion Borough Park", "Conneaut Creek", "Historic Victorian homes district", "Albion Public Library"],
    description: "Charming rural borough and agricultural market center in southwestern Erie County, famous for the beloved Albion Area Fair that draws thousands annually to celebrate farming heritage and community traditions",
    population: "~1,500",
    uniqueTrait: "Home to the legendary Albion Area Fair - one of Erie County's most popular summer traditions drawing 30,000+ visitors annually for 150+ years. Classic agricultural market town with historic downtown square, Northwestern School District excellence, and genuine small-town Pennsylvania charm",
    historicalNarrative: "Founded in 1823, Albion became southwestern Erie County's agricultural hub where farmers brought crops and livestock to market. The town's strategic location on stagecoach routes made its downtown square a bustling commercial center. In 1873, local farmers established the Albion Area Fair, which grew into one of Pennsylvania's most beloved county fairs - a week-long celebration of agriculture, 4-H youth programs, carnival rides, livestock competitions, and community pride that continues attracting thousands of visitors annually. Albion's Victorian-era downtown square and tree-lined residential streets preserve the borough's 19th-century character. The Northwestern School District, created from consolidation of rural schools, became highly regarded for academic excellence and athletics, strengthening community identity. While remaining rural in character, Albion's central location between Erie and Meadville, combined with affordable housing and excellent schools, attracts young families seeking small-town living. The annual fair remains Albion's heartbeat - a tradition where generations reconnect, 4-H kids show livestock, local businesses showcase products, and the community celebrates agricultural heritage.",
    favoriteThings: [
      "Albion Area Fair every August - 150+ year tradition with midway, livestock, 4-H",
      "Historic downtown square with Victorian architecture and local shops",
      "Northwestern School District's award-winning academics and sports programs",
      "4-H programs teaching youth agriculture, crafts, and leadership",
      "Classic small-town summer festivals and parades on Main Street",
      "Conneaut Creek fishing and natural beauty",
      "Affordable housing in safe, family-friendly neighborhoods",
      "Strong community pride and genuine neighborly atmosphere",
      "Albion Public Library community programs and events"
    ],
    imagePrompt: "Exact photorealistic view of Albion Area Fair showing carnival ferris wheel lit at twilight, 4-H youth showing prize dairy cows in livestock barn, families eating corn dogs and funnel cakes, carnival games, downtown Albion's historic square in background with Victorian storefronts, fairground crowds. Pennsylvania county fair magic."
  },

  bearLake: {
    name: "Bear Lake",
    slug: "bear-lake",
    county: "Warren County",
    zipCodes: ["16402"],
    nearbyComm: ["Edinboro", "Waterford", "Union City"],
    landmarks: ["Bear Lake itself", "Bear Lake Road", "Rural farmland"],
    description: "Small rural community in Warren County",
    population: "~250",
    uniqueTrait: "Quiet rural living near Bear Lake"
  },

  edinboro: {
    name: "Edinboro",
    slug: "edinboro",
    county: "Erie County",
    zipCodes: ["16412", "16444"],
    nearbyComm: ["Cambridge Springs", "Waterford", "Edinboro Lake"],
    landmarks: ["Edinboro University", "Edinboro Lake", "Downtown Edinboro"],
    description: "College town home to Edinboro University",
    population: "~6,400",
    uniqueTrait: "Vibrant college town atmosphere with Edinboro University"
  },

  emlenton: {
    name: "Emlenton",
    slug: "emlenton",
    county: "Venango County",
    zipCodes: ["16373"],
    nearbyComm: ["Clintonville", "Foxburg", "Parker"],
    landmarks: ["Allegheny River", "Historic downtown"],
    description: "Small river town along the Allegheny River",
    population: "~600",
    uniqueTrait: "Scenic Allegheny River location"
  },

  franklin: {
    name: "Franklin",
    slug: "franklin",
    county: "Venango County",
    zipCodes: ["16323"],
    nearbyComm: ["Oil City", "Sugarcreek", "Cooperstown"],
    landmarks: ["DeBence Antique Music World", "Allegheny River", "Historic downtown Franklin"],
    description: "Historic city at the confluence of French Creek and Allegheny River",
    population: "~6,500",
    uniqueTrait: "Rich oil heritage and antique music museum"
  },

  girard: {
    name: "Girard",
    slug: "girard",
    county: "Erie County",
    zipCodes: ["16417"],
    nearbyComm: ["Lake City", "Fairview", "Cranesville"],
    landmarks: ["Girard Borough downtown", "Dan Rice Days festival"],
    description: "Historic borough known as the birthplace of Dan Rice",
    population: "~3,100",
    uniqueTrait: "Birthplace of famous circus clown Dan Rice"
  },

  groveCity: {
    name: "Grove City",
    slug: "grove-city",
    county: "Mercer County",
    zipCodes: ["16127"],
    nearbyComm: ["Mercer", "Slippery Rock", "Harrisville"],
    landmarks: ["Grove City College", "Grove City Premium Outlets", "Downtown Grove City"],
    description: "College town and shopping destination",
    population: "~8,000",
    uniqueTrait: "Home to Grove City College and major outlet mall"
  },

  guysMills: {
    name: "Guys Mills",
    slug: "guys-mills",
    county: "Crawford County",
    zipCodes: ["16327"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Blooming Valley"],
    landmarks: ["Rural farmland", "French Creek"],
    description: "Small rural community in Crawford County",
    population: "~100",
    uniqueTrait: "Peaceful rural countryside"
  },

  hermitage: {
    name: "Hermitage",
    slug: "hermitage",
    county: "Mercer County",
    zipCodes: ["16148"],
    nearbyComm: ["Sharon", "Farrell", "Sharpsville"],
    landmarks: ["Shenango River", "Buhl Park", "Hermitage Community Center"],
    description: "Growing city in Mercer County",
    population: "~16,000",
    uniqueTrait: "Largest city in Mercer County with strong retail sector"
  },

  hydetown: {
    name: "Hydetown",
    slug: "hydetown",
    county: "Crawford County",
    zipCodes: ["16328"],
    nearbyComm: ["Titusville", "Meadville", "Guys Mills"],
    landmarks: ["Oil Creek", "Rural countryside"],
    description: "Small borough in Crawford County",
    population: "~700",
    uniqueTrait: "Oil heritage community"
  },

  irvine: {
    name: "Irvine",
    slug: "irvine",
    county: "Warren County",
    zipCodes: ["16329"],
    nearbyComm: ["Warren", "Sheffield", "Clarendon"],
    landmarks: ["Allegheny National Forest nearby"],
    description: "Small community near Warren",
    population: "~600",
    uniqueTrait: "Gateway to Allegheny National Forest"
  },

  kinzua: {
    name: "Kinzua",
    slug: "kinzua",
    county: "Warren County",
    zipCodes: ["16330"],
    nearbyComm: ["Warren", "Bradford", "Mount Jewett"],
    landmarks: ["Kinzua Bridge State Park", "Kinzua Dam"],
    description: "Small community near famous Kinzua Bridge",
    population: "~300",
    uniqueTrait: "Home to spectacular Kinzua Bridge State Park"
  },

  lakeCity: {
    name: "Lake City",
    slug: "lake-city",
    county: "Erie County",
    zipCodes: ["16423"],
    nearbyComm: ["Girard", "Edinboro", "Union City"],
    landmarks: ["Lake City Borough Park", "Downtown Lake City"],
    description: "Small borough in southern Erie County",
    population: "~2,800",
    uniqueTrait: "Friendly small-town atmosphere"
  },

  meadville: {
    name: "Meadville",
    slug: "meadville",
    county: "Crawford County",
    zipCodes: ["16335", "16388"],
    nearbyComm: ["Cambridge Springs", "Conneaut Lake", "Saegertown"],
    landmarks: ["Allegheny College", "Diamond Park", "Downtown Meadville", "Market House"],
    description: "County seat of Crawford County and home to Allegheny College",
    population: "~13,000",
    uniqueTrait: "Historic college town with vibrant downtown"
  },

  mercer: {
    name: "Mercer",
    slug: "mercer",
    county: "Mercer County",
    zipCodes: ["16137"],
    nearbyComm: ["Grove City", "Hermitage", "Greenville"],
    landmarks: ["Mercer County Courthouse", "Magoffin House Museum"],
    description: "County seat of Mercer County",
    population: "~2,000",
    uniqueTrait: "Historic county seat with beautiful courthouse"
  },

  northEast: {
    name: "North East",
    slug: "north-east",
    county: "Erie County",
    zipCodes: ["16428"],
    nearbyComm: ["Harborcreek", "Ripley NY"],
    landmarks: ["Lake Erie Wine Country", "North East Marina", "Gibson Park"],
    description: "Pennsylvania's wine country capital on Lake Erie",
    population: "~4,300",
    uniqueTrait: "Heart of Lake Erie Wine Country with numerous wineries"
  },

  oilCity: {
    name: "Oil City",
    slug: "oil-city",
    county: "Venango County",
    zipCodes: ["16301"],
    nearbyComm: ["Franklin", "Titusville", "Rouseville"],
    landmarks: ["Oil Creek State Park", "Venango Museum", "Historic downtown"],
    description: "Historic oil boom town at Oil Creek and Allegheny River",
    population: "~10,000",
    uniqueTrait: "Birthplace of American oil industry"
  },

  polk: {
    name: "Polk",
    slug: "polk",
    county: "Venango County",
    zipCodes: ["16342"],
    nearbyComm: ["Franklin", "Emlenton", "Clintonville"],
    landmarks: ["Rural farmland"],
    description: "Small rural community in Venango County",
    population: "~300",
    uniqueTrait: "Quiet rural living"
  },

  riceville: {
    name: "Riceville",
    slug: "riceville",
    county: "Crawford County",
    zipCodes: ["16353"],
    nearbyComm: ["Meadville", "Guys Mills"],
    landmarks: ["Rural countryside"],
    description: "Small rural community",
    population: "~100",
    uniqueTrait: "Peaceful countryside"
  },

  russell: {
    name: "Russell",
    slug: "russell",
    county: "Warren County",
    zipCodes: ["16345"],
    nearbyComm: ["Warren", "Youngsville", "Sugar Grove"],
    landmarks: ["Allegheny River", "Rural countryside"],
    description: "Small borough in Warren County",
    population: "~350",
    uniqueTrait: "Allegheny River community"
  },

  sandyLake: {
    name: "Sandy Lake",
    slug: "sandy-lake",
    county: "Mercer County",
    zipCodes: ["16145"],
    nearbyComm: ["Stoneboro", "Polk", "Jackson Center"],
    landmarks: ["Sandy Lake itself", "Rural farmland"],
    description: "Small rural community around Sandy Lake",
    population: "~700",
    uniqueTrait: "Lakeside rural living"
  },

  sharon: {
    name: "Sharon",
    slug: "sharon",
    county: "Mercer County",
    zipCodes: ["16146"],
    nearbyComm: ["Hermitage", "Farrell", "Sharpsville"],
    landmarks: ["Shenango River", "Downtown Sharon", "Reyers"],
    description: "Historic steel town on the Shenango River",
    population: "~13,000",
    uniqueTrait: "Steel heritage and Reyers shoe store landmark"
  },

  sheffield: {
    name: "Sheffield",
    slug: "sheffield",
    county: "Warren County",
    zipCodes: ["16347"],
    nearbyComm: ["Warren", "Clarendon", "Tionesta"],
    landmarks: ["Allegheny National Forest", "Tionesta Creek"],
    description: "Small borough near Allegheny National Forest",
    population: "~1,100",
    uniqueTrait: "Gateway to Allegheny National Forest recreation"
  },

  stoneboro: {
    name: "Stoneboro",
    slug: "stoneboro",
    county: "Mercer County",
    zipCodes: ["16153"],
    nearbyComm: ["Sandy Lake", "Jackson Center", "Polk"],
    landmarks: ["Rural farmland", "Small downtown"],
    description: "Small rural borough in Mercer County",
    population: "~1,000",
    uniqueTrait: "Small-town rural charm"
  },

  tidioute: {
    name: "Tidioute",
    slug: "tidioute",
    county: "Warren County",
    zipCodes: ["16351"],
    nearbyComm: ["Warren", "Tionesta", "Youngsville"],
    landmarks: ["Allegheny River", "Historic downtown"],
    description: "Small river borough on the Allegheny River",
    population: "~700",
    uniqueTrait: "Scenic Allegheny River location"
  },

  townville: {
    name: "Townville",
    slug: "townville",
    county: "Crawford County",
    zipCodes: ["16360"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Spartansburg"],
    landmarks: ["Rural countryside"],
    description: "Small rural borough in Crawford County",
    population: "~300",
    uniqueTrait: "Quiet rural community"
  },

  utica: {
    name: "Utica",
    slug: "utica",
    county: "Venango County",
    zipCodes: ["16362"],
    nearbyComm: ["Franklin", "Polk", "Emlenton"],
    landmarks: ["Rural farmland"],
    description: "Small rural community in Venango County",
    population: "~200",
    uniqueTrait: "Peaceful rural setting"
  },

  warren: {
    name: "Warren",
    slug: "warren",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["Russell", "Youngsville", "Clarendon"],
    landmarks: ["Allegheny River", "Downtown Warren", "Warren County Courthouse"],
    description: "County seat and largest city in Warren County",
    population: "~9,500",
    uniqueTrait: "Gateway to Allegheny National Forest"
  },

  clark: {
    name: "Clark",
    slug: "clark",
    county: "Mercer County",
    zipCodes: ["16113"],
    nearbyComm: ["Greenville", "Sharpsville", "Hermitage"],
    landmarks: ["Rural farmland"],
    description: "Small community in Mercer County",
    population: "~500",
    uniqueTrait: "Rural community living"
  },

  clarendon: {
    name: "Clarendon",
    slug: "clarendon",
    county: "Warren County",
    zipCodes: ["16313"],
    nearbyComm: ["Warren", "Sheffield", "Tidioute"],
    landmarks: ["Allegheny River", "Allegheny National Forest"],
    description: "Small borough near Allegheny National Forest",
    population: "~500",
    uniqueTrait: "Forest and river recreation access"
  },

  farrell: {
    name: "Farrell",
    slug: "farrell",
    county: "Mercer County",
    zipCodes: ["16121"],
    nearbyComm: ["Sharon", "Hermitage", "Wheatland"],
    landmarks: ["Shenango River", "Historic steel mills"],
    description: "Historic steel town in Mercer County",
    population: "~5,000",
    uniqueTrait: "Steel industry heritage"
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
