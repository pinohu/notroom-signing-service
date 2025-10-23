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
    imagePrompt: "A beautiful scenic painting of Presque Isle State Park lighthouse at golden hour, with Lake Erie waves gently lapping the shore, sailboats in the distance, and families walking along the sandy beach. Warm sunset colors reflecting on the water. Photorealistic, inviting atmosphere."
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
    landmarks: ["Allegheny College", "Diamond Park", "Market House Historic District", "Baldwin Reynolds House Museum", "Talon Conference Center", "Meadville Medical Center", "Downtown Meadville"],
    description: "Crawford County's vibrant seat and largest city, home to historic Allegheny College and a thriving downtown with arts, culture, and commerce",
    population: "~13,000",
    uniqueTrait: "Home to prestigious Allegheny College (founded 1815), birthplace of the zipper, and Crawford County's economic and cultural hub with historic architecture and college-town atmosphere",
    historicalNarrative: "Meadville's history dates to 1788 when David Mead established the first settlement. The city flourished as a manufacturing center in the 19th century and became famous as the birthplace of the modern zipper, invented here by Whitcomb Judson and perfected by Gideon Sundback. Allegheny College, founded in 1815, brought intellectual vitality that continues today. The city's beautiful Victorian architecture and Diamond Park remain testaments to its prosperous past.",
    favoriteThings: [
      "Exploring Diamond Park's historic bandstand and seasonal events",
      "College football games at Allegheny College's Robertson Athletic Complex",
      "Discovering local art at the Market House galleries",
      "Strolling through the Victorian-era Baldwin Reynolds House Museum",
      "Downtown coffee shops and independent bookstores",
      "Annual Meadville Community Band summer concerts"
    ],
    imagePrompt: "A charming painting of Meadville's historic Diamond Park with its iconic bandstand, surrounded by Victorian buildings, autumn trees with golden leaves, students from Allegheny College walking through the park, and the courthouse in the background. Warm afternoon light, nostalgic small-town Pennsylvania atmosphere."
  },
  conneautLake: {
    name: "Conneaut Lake",
    slug: "conneaut-lake",
    county: "Crawford County",
    zipCodes: ["16316"],
    nearbyComm: ["Meadville", "Harmonsburg", "Linesville", "Conneautville"],
    landmarks: ["Conneaut Lake", "Conneaut Lake Park Amusement Park", "Beach Club", "Lakefront Properties", "Conneaut Hotel", "Blue Water Beach"],
    description: "Pennsylvania's largest natural lake resort community offering year-round recreation, lakefront living, and family entertainment",
    population: "~700",
    uniqueTrait: "Pennsylvania's largest natural glacier-formed lake spanning 929 acres, featuring historic amusement park (opened 1892), pristine beaches, and premier fishing destination"
  },
  titusville: {
    name: "Titusville",
    slug: "titusville",
    county: "Crawford County",
    zipCodes: ["16354"],
    nearbyComm: ["Pleasantville", "Hydetown", "Oil City", "Spartansburg"],
    landmarks: ["Drake Well Museum & Park", "Oil Creek State Park", "Historic Downtown District", "Oil Creek & Titusville Railroad", "Titusville Regional Hospital", "St. Titus Church"],
    description: "Historic city where the American oil industry was born in 1859, featuring oil heritage museums, outdoor recreation, and Victorian architecture",
    population: "~5,400",
    uniqueTrait: "Birthplace of the American oil industry - site of Colonel Edwin Drake's world's first commercial oil well drilled in 1859. Oil Creek State Park offers 36 miles of hiking trails"
  },
  
  // Mercer County Communities
  mercer: {
    name: "Mercer",
    slug: "mercer",
    county: "Mercer County",
    zipCodes: ["16137"],
    nearbyComm: ["Grove City", "Greenville", "Sharon", "Stoneboro"],
    landmarks: ["Mercer County Courthouse", "Magoffin House Museum", "Downtown Historic Square", "Mercer Area Historical Society", "Central Park", "Route 19/62 Intersection"],
    description: "Charming county seat featuring beautifully preserved Victorian courthouse, historic downtown square, and small-town Pennsylvania atmosphere",
    population: "~2,000",
    uniqueTrait: "Home to stunning 1909 Beaux-Arts Mercer County Courthouse with clock tower, surrounded by historic square. Annual Mercer County Fair and strong agricultural heritage"
  },
  groveCity: {
    name: "Grove City",
    slug: "grove-city",
    county: "Mercer County",
    zipCodes: ["16127"],
    nearbyComm: ["Mercer", "Slippery Rock", "Harrisville", "Clintonville"],
    landmarks: ["Grove City College", "Grove City Premium Outlets", "Historic Downtown Grove City", "Wolf Creek Village", "Kettle Creek Environmental Center", "Grove City Area Library"],
    description: "Thriving college town combining premier Christian higher education with one of America's largest outlet shopping destinations",
    population: "~8,100",
    uniqueTrait: "Home to Grove City College (1876) - renowned Christian liberal arts college, plus Grove City Premium Outlets - one of the largest outlet malls in America with over 130 stores"
  },
  hermitage: {
    name: "Hermitage",
    slug: "hermitage",
    county: "Mercer County",
    zipCodes: ["16148"],
    nearbyComm: ["Sharon", "Farrell", "Sharpsville", "Greenville"],
    landmarks: ["Shenango River Lake", "Winner's Circle Golf Course", "Hermitage Stadium", "Hickory Memorial Park", "The Avenue at Hermitage", "Shenango Valley Mall"],
    description: "Mercer County's largest and fastest-growing city, serving as the region's commercial, retail, and recreational hub",
    population: "~16,200",
    uniqueTrait: "Largest city in Mercer County with thriving retail corridor including The Avenue shopping district. Gateway to Shenango River Lake with 3,500 acres for boating and fishing"
  },
  sharon: {
    name: "Sharon",
    slug: "sharon",
    county: "Mercer County",
    zipCodes: ["16146"],
    nearbyComm: ["Hermitage", "Farrell", "Sharpsville", "West Middlesex"],
    landmarks: ["Daffin's Candies & Chocolate Kingdom", "Buhl Park", "Historic Downtown Sharon", "Sharon Regional Medical Center", "Winner District", "Shenango River"],
    description: "Historic steel town transformed into charming city featuring world-famous chocolate kingdom, beautiful parks, and Victorian downtown",
    population: "~13,100",
    uniqueTrait: "Home to Daffin's Candies featuring the world's largest chocolate kingdom (10,000+ sq ft). Beautiful Buhl Park with 300+ acres, gardens, and recreational facilities"
  },
  greenville: {
    name: "Greenville",
    slug: "greenville",
    county: "Mercer County",
    zipCodes: ["16125"],
    nearbyComm: ["Mercer", "Hermitage", "Jamestown", "Sandy Lake"],
    landmarks: ["Greenville Railroad Park Museum", "Historic Downtown District", "Thiel College Greenville Center", "Shenango River Trail", "Memorial Park", "Greenville Area Library"],
    description: "Historic railroad heritage town in northwestern Mercer County, preserving transportation history while serving modern community needs",
    population: "~5,900",
    uniqueTrait: "Preserved railroad history showcased at Greenville Railroad Park Museum featuring vintage locomotives, cabooses, and station. Active downtown with local shops and dining"
  },
  
  // Venango County Communities
  franklin: {
    name: "Franklin",
    slug: "franklin",
    county: "Venango County",
    zipCodes: ["16323"],
    nearbyComm: ["Oil City", "Cooperstown", "Emlenton", "Clintonville"],
    landmarks: ["DeBence Antique Music World", "Allegheny River", "Franklin Area Historical Society", "Barrow-Civic Theatre", "Downtown Historic District", "Samuel Justus Recreation Trail"],
    description: "Historic river town at the confluence of French Creek and Allegheny River, featuring antique music museum and Victorian architecture",
    population: "~6,500",
    uniqueTrait: "Confluence of French Creek and Allegheny River. Home to DeBence Antique Music World - world's largest collection of automatic music machines. Rich lumber and oil boom heritage"
  },
  oilCity: {
    name: "Oil City",
    slug: "oil-city",
    county: "Venango County",
    zipCodes: ["16301"],
    nearbyComm: ["Franklin", "Titusville", "Rouseville", "Pleasantville"],
    landmarks: ["Oil Creek State Park", "Venango Museum of Art, Science & Industry", "Historic Downtown", "Oil Creek & Titusville Railroad", "McClintock Well", "Allegheny River Trail"],
    description: "Pennsylvania oil boom heritage city nestled along the Allegheny River and Oil Creek, gateway to outdoor recreation and industrial history",
    population: "~10,000",
    uniqueTrait: "Center of Pennsylvania's oil boom history - Oil Creek State Park preserves oil heritage with 36 miles of trails. Scenic train rides on Oil Creek & Titusville Railroad through history"
  },
  
  // Warren County Communities
  warren: {
    name: "Warren",
    slug: "warren",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["North Warren", "Youngsville", "Russell", "Tidioute"],
    landmarks: ["Allegheny National Forest", "Kinzua Bridge State Park", "Warren County Courthouse", "Downtown Historic District", "Struthers Library Theatre", "Jackson Run Trail System"],
    description: "Gateway city to Pennsylvania's only national forest, offering outdoor recreation, historic downtown, and small-city amenities in forest setting",
    population: "~9,400",
    uniqueTrait: "Gateway to 517,000-acre Allegheny National Forest. Base for Kinzua Bridge Skywalk, Allegheny River water trail, hiking, hunting, and year-round outdoor adventure"
  },
  northWarren: {
    name: "North Warren",
    slug: "north-warren",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["Warren", "Youngsville", "Sugar Grove"],
    landmarks: ["Allegheny River", "North Warren residential area", "Warren County Airport area", "Route 6 corridor"],
    description: "Residential community in northern Warren County near city of Warren",
    population: "~2,000",
    uniqueTrait: "Residential community adjacent to Warren city limits. Offers suburban living with easy access to Warren amenities and Allegheny National Forest recreation"
  },
  youngsville: {
    name: "Youngsville",
    slug: "youngsville",
    county: "Warren County",
    zipCodes: ["16371"],
    nearbyComm: ["Warren", "Sugar Grove", "Pittsfield"],
    landmarks: ["Brokenstraw Creek", "Downtown Youngsville", "Youngsville Area School District", "Route 6 Main Street", "Youngsville Borough Park"],
    description: "Historic borough along Brokenstraw Creek in Warren County, offering small-town living and community pride",
    population: "~1,700",
    uniqueTrait: "Quiet community along Brokenstraw Creek with strong school district. Annual summer festival and Fourth of July celebration bring community together"
  },
  russell: {
    name: "Russell",
    slug: "russell",
    county: "Warren County",
    zipCodes: ["16345"],
    nearbyComm: ["Warren", "Clarendon", "Tidioute"],
    landmarks: ["Allegheny River", "Kinzua-Wolf Run Marina", "Forest access", "Russell community"],
    description: "Small Warren County community along Allegheny River near Kinzua Reservoir",
    population: "~350",
    uniqueTrait: "Rural community near Allegheny River and Kinzua Reservoir. Popular with anglers and outdoor enthusiasts. Gateway to forest recreation"
  },
  tidioute: {
    name: "Tidioute",
    slug: "tidioute",
    county: "Warren County",
    zipCodes: ["16351"],
    nearbyComm: ["Warren", "Irvine", "Tionesta"],
    landmarks: ["Allegheny River", "Historic downtown", "Hunter Station Bridge", "Tidioute Borough Park", "River access"],
    description: "Scenic historic borough along Allegheny River, popular with paddlers and outdoor enthusiasts",
    population: "~680",
    uniqueTrait: "Picturesque Allegheny River location - popular kayaking/canoeing destination. Historic downtown with Victorian charm. Gateway to Allegheny River Islands Wilderness"
  },
  sugarGrove: {
    name: "Sugar Grove",
    slug: "sugar-grove",
    county: "Warren County",
    zipCodes: ["16350"],
    nearbyComm: ["Youngsville", "Bear Lake", "Warren"],
    landmarks: ["Sugar Grove Township", "Agricultural farmland", "Route 69 corridor", "Rural countryside"],
    description: "Rural agricultural township in Warren County preserving farming heritage",
    population: "~700",
    uniqueTrait: "Agricultural community in Warren County maintaining farming traditions. Peaceful rural living with working farms and open spaces"
  },
  sheffield: {
    name: "Sheffield",
    slug: "sheffield",
    county: "Warren County",
    zipCodes: ["16347"],
    nearbyComm: ["Clarendon", "Warren", "Kinzua"],
    landmarks: ["Allegheny National Forest access", "Kinzua Reservoir", "Sheffield Township", "Forest recreation areas"],
    description: "Forest township community serving as gateway to Allegheny National Forest recreation",
    population: "~1,100",
    uniqueTrait: "Located in heart of Allegheny National Forest region. Base for hunting, fishing, hiking, and ATV recreation. Outdoor lifestyle community"
  },
  clarendon: {
    name: "Clarendon",
    slug: "clarendon",
    county: "Warren County",
    zipCodes: ["16313"],
    nearbyComm: ["Warren", "Sheffield", "Russell"],
    landmarks: ["Allegheny Reservoir", "Kinzua Dam area", "Forest lands", "Allegheny National Forest"],
    description: "Small rural borough near Allegheny Reservoir and Kinzua Dam",
    population: "~475",
    uniqueTrait: "Small community near Allegheny Reservoir created by Kinzua Dam. Gateway to reservoir fishing, boating, and forest recreation"
  },
  kinzua: {
    name: "Kinzua",
    slug: "kinzua",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["Warren", "Sheffield", "Mount Jewett"],
    landmarks: ["Kinzua Bridge State Park", "Kinzua Bridge Skywalk", "Allegheny National Forest", "Kinzua viaduct ruins"],
    description: "Forest community near world-famous Kinzua Bridge and skywalk attraction",
    population: "~300",
    uniqueTrait: "Home to world-famous Kinzua Bridge Skywalk - former railroad viaduct now popular tourist attraction. Deep in Allegheny National Forest with spectacular views"
  },
  
  // More Erie County
  lakeCity: {
    name: "Lake City",
    slug: "lake-city",
    county: "Erie County",
    zipCodes: ["16423"],
    nearbyComm: ["Girard", "Fairview", "Edinboro"],
    landmarks: ["Historic downtown Lake City", "Lake City Area School", "Route 20 corridor", "Lake City Borough Park", "Northwestern Pennsylvania"],
    description: "Charming small borough in southwestern Erie County with historic downtown and family-friendly atmosphere",
    population: "~2,900",
    uniqueTrait: "Charming small town atmosphere with historic downtown square. Strong community pride, annual celebrations, and Northwestern School District. Affordable living near Erie"
  },
  wattsburg: {
    name: "Wattsburg",
    slug: "wattsburg",
    county: "Erie County",
    zipCodes: ["16442"],
    nearbyComm: ["Erie", "Edinboro", "Union City"],
    landmarks: ["Wattsburg Area School District", "Downtown square", "Borough Park", "Route 8 corridor", "Rural countryside"],
    description: "Small rural borough in southeastern Erie County known for excellent schools and quiet country living",
    population: "~380",
    uniqueTrait: "Small-town charm in rural Erie County with top-rated Seneca High School. Peaceful living with strong agricultural heritage and community spirit"
  },
  unionCity: {
    name: "Union City",
    slug: "union-city",
    county: "Erie County",
    zipCodes: ["16438"],
    nearbyComm: ["Waterford", "Edinboro", "Corry"],
    landmarks: ["Union City Dam & Reservoir", "Downtown Union City", "Union City Area School District", "Bentley Creek", "Route 6/8 junction"],
    description: "Unique borough straddling Erie and Crawford county line, serving as regional hub with dam and recreation",
    population: "~3,300",
    uniqueTrait: "Located in both Erie and Crawford counties - unique dual-county borough. Home to Union City Dam/Reservoir for fishing and recreation. Regional shopping and services hub"
  },
  corry: {
    name: "Corry",
    slug: "corry",
    county: "Erie County",
    zipCodes: ["16407"],
    nearbyComm: ["Union City", "Columbus", "Spartansburg"],
    landmarks: ["Corry Area Historical Society", "Downtown Corry", "Mead Avenue business district", "Wright Park", "Corry Area Primary/Middle/High Schools"],
    description: "Third-largest city in Erie County with industrial heritage, historic downtown, and strong community identity",
    population: "~6,600",
    uniqueTrait: "Industrial heritage city - once known as 'The Edge Tool Capital of the World'. Strong manufacturing history, tight-knit community, and revitalizing downtown with local businesses"
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
  mckean: {
    name: "McKean",
    slug: "mckean",
    county: "Erie County",
    zipCodes: ["16426", "16505"],
    nearbyComm: ["Edinboro", "Waterford", "Erie"],
    landmarks: ["McKean Township Municipal Building", "McKean Elementary School", "Lake Pleasant", "Route 99 Corridor", "McKean Community Park"],
    description: "Thriving township in southern Erie County, known for residential neighborhoods, local businesses, and convenient access to Erie amenities",
    population: "~4,500",
    uniqueTrait: "Growing suburban township offering perfect balance of Erie city convenience and peaceful countryside, with strong schools and family-friendly atmosphere"
  },
  cranberryTownship: {
    name: "Cranberry Township",
    slug: "cranberry-township",
    county: "Erie County",
    zipCodes: ["16319"],
    nearbyComm: ["Albion", "Girard", "Meadville"],
    landmarks: ["Cranberry Mall", "Cranberry Township Park", "Route 18 Corridor", "Northwestern School District offices", "Conneaut Creek watershed"],
    description: "Growing residential township in western Erie County, offering affordable housing, good schools, and easy access to I-79 corridor",
    population: "~7,000",
    uniqueTrait: "Fast-growing suburb between Erie and Crawford counties, popular with families seeking Northwestern School District and lower property taxes than Erie proper"
  },
  springCreek: {
    name: "Spring Creek",
    slug: "spring-creek",
    county: "Erie County",
    zipCodes: ["16436"],
    nearbyComm: ["Waterford", "Union City", "Edinboro"],
    landmarks: ["Spring Creek Township Building", "Woodcock Creek State Park access", "Agricultural farmland", "Route 19 corridor", "Rural country roads"],
    description: "Peaceful rural township in southern Erie County, maintaining agricultural heritage while offering quiet country living",
    population: "~1,100",
    uniqueTrait: "Quintessential rural Pennsylvania township with working farms, open spaces, and close-knit community. Gateway to Woodcock Creek State Park for outdoor recreation"
  },
  lawrencePark: {
    name: "Lawrence Park",
    slug: "lawrence-park",
    county: "Erie County",
    zipCodes: ["16511"],
    nearbyComm: ["Erie", "Wesleyville", "Harborcreek"],
    landmarks: ["GE Transportation (Wabtec) plant", "Lawrence Park Shopping Center", "Iroquois Avenue", "Lawrence Park Elementary", "East Erie residential neighborhoods"],
    description: "Historic company town in eastern Erie, originally built for General Electric employees, now a thriving residential borough",
    population: "~3,900",
    uniqueTrait: "Founded in 1926 as planned community for GE workers. Maintains strong neighborhood identity with affordable housing, walkable streets, and proximity to Erie amenities"
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
    landmarks: ["French Creek", "Downtown Cochranton", "Cochranton Volunteer Fire Department", "Route 322 Main Street", "Crawford Central School District"],
    description: "Historic borough along French Creek in Crawford County, serving as gateway between Meadville and lake communities",
    population: "~1,150",
    uniqueTrait: "Charming French Creek community with historic downtown, annual community events, and strategic location on Route 322 between Meadville and Conneaut Lake"
  },
  saegertown: {
    name: "Saegertown",
    slug: "saegertown",
    county: "Crawford County",
    zipCodes: ["16433"],
    nearbyComm: ["Meadville", "Edinboro", "Cambridge Springs"],
    landmarks: ["Woodcock Creek", "Saegertown Elementary/Jr-Sr High School", "Downtown Borough", "Route 6 corridor", "Saegertown Historical Society"],
    description: "Small borough in eastern Crawford County along Woodcock Creek, known for excellent schools and family-friendly atmosphere",
    population: "~1,050",
    uniqueTrait: "Home to Penncrest School District with strong academic reputation. Small-town charm with annual Old Fashioned Christmas celebration and community pride"
  },
  cambridgeSprings: {
    name: "Cambridge Springs",
    slug: "cambridge-springs",
    county: "Crawford County",
    zipCodes: ["16403"],
    nearbyComm: ["Edinboro", "Meadville", "Saegertown"],
    landmarks: ["Riverside Inn Resort", "French Creek", "Historic spa town district", "Cambridge Springs High School", "Alliance College site"],
    description: "Historic spa and resort town along French Creek, preserving Victorian-era mineral springs heritage",
    population: "~2,600",
    uniqueTrait: "Once-famous mineral springs resort town (1880s-1920s). Riverside Inn continues hospitality tradition. Home to historic Alliance College campus until 1987"
  },
  conneautville: {
    name: "Conneautville",
    slug: "conneautville",
    county: "Crawford County",
    zipCodes: ["16406"],
    nearbyComm: ["Conneaut Lake", "Meadville", "Harmonsburg"],
    landmarks: ["Conneaut Marsh Wildlife Area", "Downtown square", "Conneaut Valley School District", "Route 18/Route 198 junction"],
    description: "Small borough serving as gateway to Pymatuning and Conneaut Lake recreation areas",
    population: "~750",
    uniqueTrait: "Gateway to Conneaut Lake region and Pymatuning Reservoir. Strategic location for lake access with small-town atmosphere and community spirit"
  },
  linesville: {
    name: "Linesville",
    slug: "linesville",
    county: "Crawford County",
    zipCodes: ["16424"],
    nearbyComm: ["Conneaut Lake", "Harmonsburg", "Jamestown"],
    landmarks: ["Pymatuning Reservoir", "Linesville Spillway ('Where Ducks Walk on Fish')", "Pymatuning State Park", "Downtown Linesville", "Linesville Area School"],
    description: "Borough on Pymatuning Reservoir, home to Pennsylvania's famous spillway tourist attraction",
    population: "~1,000",
    uniqueTrait: "Home to iconic Linesville Spillway where 'ducks walk on fish' - famous Pennsylvania roadside attraction drawing thousands annually. Gateway to Pymatuning fishing and boating"
  },
  harmonsburg: {
    name: "Harmonsburg",
    slug: "harmonsburg",
    county: "Crawford County",
    zipCodes: ["16422"],
    nearbyComm: ["Conneaut Lake", "Linesville", "Conneautville"],
    landmarks: ["Pymatuning State Park", "Lake Wilhelm", "Pymatuning Reservoir access", "Harmonsburg Community Park"],
    description: "Small borough nestled between Pymatuning and Lake Wilhelm, offering outdoor recreation access",
    population: "~600",
    uniqueTrait: "Peaceful Pymatuning lake community with easy access to both Pymatuning Reservoir and Lake Wilhelm. Popular with anglers, boaters, and outdoor enthusiasts"
  },
  spartansburg: {
    name: "Spartansburg",
    slug: "spartansburg",
    county: "Crawford County",
    zipCodes: ["16434"],
    nearbyComm: ["Corry", "Union City", "Centerville"],
    landmarks: ["Spartansburg Borough Park", "Agricultural farmland", "Route 77 corridor", "Spartansburg Volunteer Fire Company"],
    description: "Rural borough in northeastern Crawford County, maintaining agricultural heritage and small-town character",
    population: "~300",
    uniqueTrait: "Small agricultural community on Crawford-Erie county border. Strong volunteer fire company tradition and annual community events bringing residents together"
  },
  bloomingValley: {
    name: "Blooming Valley",
    slug: "blooming-valley",
    county: "Crawford County",
    zipCodes: ["16509"],
    nearbyComm: ["Meadville", "Cochranton", "Cambridge Springs"],
    landmarks: ["Rural farmland", "Blooming Valley community", "Agricultural heritage area"],
    description: "Tiny rural community in Crawford County's agricultural heartland",
    population: "~400",
    uniqueTrait: "Quiet rural farming area representing Crawford County's agricultural roots. Close-knit community with pastoral landscapes and country living"
  },
  guysMills: {
    name: "Guys Mills",
    slug: "guys-mills",
    county: "Crawford County",
    zipCodes: ["16327"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Edinboro"],
    landmarks: ["Woodcock Creek Lake", "Rural community center", "Historic crossroads", "Agricultural area"],
    description: "Small unincorporated community serving as historic rural crossroads in Crawford County",
    population: "~100",
    uniqueTrait: "Historic rural crossroads community near Woodcock Creek Lake. Maintains rural character with access to fishing and outdoor recreation"
  },
  hydetown: {
    name: "Hydetown",
    slug: "hydetown",
    county: "Crawford County",
    zipCodes: ["16328"],
    nearbyComm: ["Titusville", "Meadville", "Pleasantville"],
    landmarks: ["Oil Creek watershed", "Historic oil region", "Hydetown Borough Building", "Route 408"],
    description: "Small oil region community preserving Pennsylvania's petroleum heritage",
    population: "~700",
    uniqueTrait: "Oil boom heritage village named for early oil well fire doused with water. Part of historic Oil Creek oil production region from 1860s"
  },
  pleasantville: {
    name: "Pleasantville",
    slug: "pleasantville",
    county: "Venango County",
    zipCodes: ["16341"],
    nearbyComm: ["Titusville", "Oil City", "Hydetown"],
    landmarks: ["Oil Creek", "Historic downtown", "Pleasantville Area School", "Route 227", "Oil heritage sites"],
    description: "Small borough in Pennsylvania's historic oil country, preserving oil boom heritage",
    population: "~860",
    uniqueTrait: "Oil heritage community in heart of Oil Creek region. Part of Pennsylvania's oil boom history from 1860s-1870s. Quiet small-town living with historical significance"
  },
  cooperstown: {
    name: "Cooperstown",
    slug: "cooperstown",
    county: "Venango County",
    zipCodes: ["16317"],
    nearbyComm: ["Franklin", "Oil City", "Polk"],
    landmarks: ["Allegheny River", "Rural borough", "Route 257 corridor", "Cooperstown Volunteer Fire Department"],
    description: "Small riverside borough in Venango County along the Allegheny River",
    population: "~440",
    uniqueTrait: "Quiet Allegheny River community offering peaceful rural living. Tight-knit small borough with river access and natural beauty"
  },
  polk: {
    name: "Polk",
    slug: "polk",
    county: "Venango County",
    zipCodes: ["16342"],
    nearbyComm: ["Franklin", "Cooperstown", "Emlenton"],
    landmarks: ["Allegheny River", "Polk Borough Park", "Route 62 corridor", "Rural countryside"],
    description: "Small borough in Venango County maintaining rural Pennsylvania character",
    population: "~850",
    uniqueTrait: "Small-town Venango County charm with Allegheny River access. Family-friendly community with strong volunteer spirit and annual celebrations"
  },
  emlenton: {
    name: "Emlenton",
    slug: "emlenton",
    county: "Venango County",
    zipCodes: ["16373"],
    nearbyComm: ["Franklin", "Clintonville", "Parker"],
    landmarks: ["Allegheny River", "Historic downtown", "Emlenton Bridge", "Route 38", "Emlenton Area Historical Society"],
    description: "Scenic river borough along Allegheny River with historic downtown and natural beauty",
    population: "~620",
    uniqueTrait: "Scenic Allegheny River location with historic bridge. Gateway for kayaking, fishing, and river recreation. Charming downtown with Victorian architecture"
  },
  rouseville: {
    name: "Rouseville",
    slug: "rouseville",
    county: "Venango County",
    zipCodes: ["16344"],
    nearbyComm: ["Oil City", "Franklin", "Pleasantville"],
    landmarks: ["Oil Creek", "Oil heritage sites", "Route 8 corridor", "Historic oil wells"],
    description: "Historic oil creek community preserving Pennsylvania's petroleum industry heritage",
    population: "~510",
    uniqueTrait: "Historic oil industry village on Oil Creek. Site of some of Pennsylvania's earliest oil production. Part of Oil Creek State Park heritage corridor"
  },
  
  // More Mercer County
  farrell: {
    name: "Farrell",
    slug: "farrell",
    county: "Mercer County",
    zipCodes: ["16121"],
    nearbyComm: ["Sharon", "Hermitage", "Wheatland"],
    landmarks: ["Shenango River", "Downtown Farrell", "Kennedy Catholic High School", "Farrell Area School District", "Historic steel mill sites"],
    description: "Former steel city with rich immigrant heritage, rebuilding as residential community in Shenango Valley",
    population: "~4,900",
    uniqueTrait: "Steel industry heritage city founded by U.S. Steel in 1901. Strong Eastern European immigrant roots, tight-knit neighborhoods, and Shenango Valley community pride"
  },
  sharpsville: {
    name: "Sharpsville",
    slug: "sharpsville",
    county: "Mercer County",
    zipCodes: ["16150"],
    nearbyComm: ["Sharon", "Hermitage", "Clark"],
    landmarks: ["Shenango River", "Historic downtown", "Sharpsville Area School District", "Pierce Avenue business district", "Sharpsville Container facility"],
    description: "Historic manufacturing borough along Shenango River, maintaining industrial heritage and strong community identity",
    population: "~4,400",
    uniqueTrait: "Historic manufacturing community known for container and metals production. Small-town atmosphere with rich labor history and annual community celebrations"
  },
  stoneboro: {
    name: "Stoneboro",
    slug: "stoneboro",
    county: "Mercer County",
    zipCodes: ["16153"],
    nearbyComm: ["Sandy Lake", "Mercer", "Jackson Center"],
    landmarks: ["Sandy Lake area", "Lakeview School District", "Rural farmland", "Route 258", "Stoneboro Fairgrounds"],
    description: "Small rural borough serving as gateway to Sandy Lake recreational area",
    population: "~1,050",
    uniqueTrait: "Gateway to Sandy Lake with small-town charm. Annual Stoneboro Fair tradition brings community together. Mix of agriculture and lake recreation"
  },
  sandyLake: {
    name: "Sandy Lake",
    slug: "sandy-lake",
    county: "Mercer County",
    zipCodes: ["16145"],
    nearbyComm: ["Stoneboro", "Greenville", "Mercer"],
    landmarks: ["Sandy Lake", "Lake community", "Sandy Lake Park", "Fishing access", "Lakeview School District"],
    description: "Peaceful lake community borough offering year-round recreation and lakeside living",
    population: "~700",
    uniqueTrait: "Peaceful lake community with fishing, boating, and swimming. Close-knit year-round and seasonal residents enjoying natural beauty"
  },
  clarkPa: {
    name: "Clark",
    slug: "clark",
    county: "Mercer County",
    zipCodes: ["16113"],
    nearbyComm: ["Sharon", "Sharpsville", "Greenville"],
    landmarks: ["Rural Clark borough", "Agricultural lands", "Hickory Township area", "Route 18 corridor"],
    description: "Small agricultural borough in Mercer County maintaining rural character",
    population: "~620",
    uniqueTrait: "Small agricultural community preserving rural Mercer County character. Quiet living with proximity to Shenango Valley cities"
  },
  clintonville: {
    name: "Clintonville",
    slug: "clintonville",
    county: "Venango County",
    zipCodes: ["16372"],
    nearbyComm: ["Franklin", "Emlenton", "Grove City"],
    landmarks: ["Allegheny River area", "Clintonville Borough Building", "Route 8 corridor", "Rural community center"],
    description: "Small borough on Venango-Mercer county border, serving rural communities",
    population: "~470",
    uniqueTrait: "Quiet community on Venango-Mercer border near Allegheny River. Strategic location between Franklin and Grove City on Route 8"
  },
  townville: {
    name: "Townville",
    slug: "townville",
    county: "Crawford County",
    zipCodes: ["16360"],
    nearbyComm: ["Meadville", "Edinboro", "Cambridge Springs"],
    landmarks: ["Rural farmland", "Townville Borough", "Agricultural community", "Country roads"],
    description: "One of Pennsylvania's smallest boroughs, maintaining agricultural rural character",
    population: "~320",
    uniqueTrait: "One of Pennsylvania's smallest incorporated boroughs. Quiet agricultural community with strong farming heritage and rural lifestyle"
  },
  riceville: {
    name: "Riceville",
    slug: "riceville",
    county: "Crawford County",
    zipCodes: ["16427"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Venango"],
    landmarks: ["Rural hamlet", "Agricultural lands", "Country living area", "Historic crossroads"],
    description: "Tiny rural hamlet in Crawford County agricultural region",
    population: "~150",
    uniqueTrait: "Tiny rural hamlet representing Crawford County's agricultural heritage. Peaceful country living in Pennsylvania farm country"
  },
  utica: {
    name: "Utica",
    slug: "utica",
    county: "Venango County",
    zipCodes: ["16362"],
    nearbyComm: ["Franklin", "Polk", "Cooperstown"],
    landmarks: ["Rural Venango County", "Agricultural area", "Cranberry Township area", "Country roads"],
    description: "Small rural borough in Venango County preserving small-town Pennsylvania character",
    population: "~210",
    uniqueTrait: "Small Venango County borough maintaining quintessential rural Pennsylvania atmosphere. Tight-knit community with agricultural roots"
  },
  irvine: {
    name: "Irvine",
    slug: "irvine",
    county: "Warren County",
    zipCodes: ["16329"],
    nearbyComm: ["Warren", "Tidioute", "Sheffield"],
    landmarks: ["Allegheny River", "Irvine Borough Park", "Forest lands", "Route 62 corridor"],
    description: "Small Warren County borough nestled along Allegheny River in forest region",
    population: "~600",
    uniqueTrait: "Allegheny River community surrounded by forest. Gateway to Allegheny National Forest recreation. Quiet rural living with river and forest access"
  },
  pittsfield: {
    name: "Pittsfield",
    slug: "pittsfield",
    county: "Warren County",
    zipCodes: ["16340"],
    nearbyComm: ["Youngsville", "Sugar Grove", "Columbus"],
    landmarks: ["Brokenstraw Creek", "Rural borough", "Agricultural area", "Country roads"],
    description: "Small rural borough along Brokenstraw Creek in Warren County",
    population: "~230",
    uniqueTrait: "Small rural Warren County community along Brokenstraw Creek. Peaceful agricultural area with tight-knit community and country living"
  },
  chandlersValley: {
    name: "Chandlers Valley",
    slug: "chandlers-valley",
    county: "Warren County",
    zipCodes: ["16312"],
    nearbyComm: ["Warren", "Clarendon", "Sugar Grove"],
    landmarks: ["Rural valley", "Allegheny National Forest proximity", "Forest area", "Remote countryside"],
    description: "Remote unincorporated community deep in Warren County forest region",
    population: "~100",
    uniqueTrait: "Remote forest community near Allegheny National Forest. Ultimate rural Pennsylvania living surrounded by nature. Hunting, hiking, and outdoor lifestyle"
  },
  sugarcreek: {
    name: "Sugarcreek",
    slug: "sugarcreek",
    county: "Venango County",
    zipCodes: ["16323"],
    nearbyComm: ["Franklin", "Oil City", "Polk"],
    landmarks: ["Allegheny River access", "Sugarcreek Borough", "Route 8 corridor", "Commercial district", "Franklin area suburbs"],
    description: "Growing borough in Venango County along Route 8 corridor near Franklin",
    population: "~5,200",
    uniqueTrait: "Largest borough in Venango County with growing residential and commercial development. Affordable housing and convenient Franklin access make it popular with families"
  },
  venangoCounty: {
    name: "Venango Crawford",
    slug: "venango-crawford",
    county: "Venango County",
    zipCodes: ["16365"],
    nearbyComm: ["Franklin", "Meadville", "Oil City"],
    landmarks: ["County border region", "Rural area", "French Creek watershed", "Agricultural lands"],
    description: "Rural region straddling Venango and Crawford county border",
    uniqueTrait: "Border region between Venango and Crawford counties. Rural agricultural area with access to both county seats and natural beauty"
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
