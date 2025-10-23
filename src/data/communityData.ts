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
  northEast: {
    name: "North East",
    slug: "north-east",
    county: "Erie County",
    zipCodes: ["16428"],
    nearbyComm: ["Harborcreek", "North East Township", "Erie"],
    landmarks: ["Wine Country Trail", "Gibson Park", "Lake Erie beaches"],
    description: "Charming borough in Pennsylvania's wine country",
    population: "~4,300",
    uniqueTrait: "Heart of Erie County's wine region with 20+ wineries",
    historicalNarrative: "Founded in 1794, North East Borough became the center of Erie County's grape-growing region due to Lake Erie's moderating climate. What started as a fruit-growing community transformed in the late 1960s when local farmers began establishing wineries. Today, North East anchors Pennsylvania's wine country with over 20 wineries producing award-winning vintages, while maintaining its charming small-town character.",
    favoriteThings: [
      "Wine tasting tours along the Lake Erie Wine Country Trail",
      "Annual Wine Country Harvest Festival in September",
      "Summer concerts at Gibson Park bandstand",
      "Fresh grape pies from local bakeries",
      "Lake Erie beaches just minutes away",
      "Historic downtown shops and restaurants"
    ],
    imagePrompt: "Exact photorealistic view of North East's vineyard country along Route 5 showing Mazza Vineyards or Heritage Wine Cellars tasting room, actual rows of Concord grapes with Lake Erie visible in background, Gibson Park's bandstand in town center, Route 20 (Main Street) historic storefronts. Wine Country Trail scenery residents recognize."
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
    uniqueTrait: "Home to PennWest Edinboro University with 5,000+ students, and Edinboro Lake - Pennsylvania's largest natural lake. Offers unique college-town culture with small-town charm",
    historicalNarrative: "Edinboro was founded in 1825 and became home to Edinboro Normal School in 1857, which evolved into PennWest Edinboro University. The town grew around Pennsylvania's largest natural lake and the university, creating a unique blend of academic culture and natural beauty. Today, Edinboro retains its college-town vibrancy while offering year-round lake recreation and a tight-knit community feel.",
    favoriteThings: [
      "Ice skating and fishing on Edinboro Lake",
      "College sporting events and cultural programs at PennWest",
      "Coffee shops and restaurants catering to students and locals",
      "Summer concerts and community events downtown",
      "Walking and biking around Edinboro Lake",
      "Affordable housing and friendly neighborhood atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of PennWest Edinboro's Reeder Hall and Porreco College Center near Edinboro Lake's west shore, students walking on campus paths in autumn, the actual natural lake with dock and swimming area, historic downtown buildings on Plum Street, Van Doren Hall visible. Recognizable college town scene."
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
    uniqueTrait: "Small but strategic location on Buffalo Road corridor between Erie and Harborcreek, providing residents with hometown feel and big-city convenience",
    historicalNarrative: "Wesleyville was incorporated in 1887 as a small residential community along Lake Erie's shore. The borough developed along Buffalo Road (Route 20), Erie's eastern commercial corridor, allowing residents to enjoy small-town living while working in Erie's industries. Today, Wesleyville maintains its close-knit community character while benefiting from its prime location between Erie and Harborcreek.",
    favoriteThings: [
      "Quick access to Erie's jobs and entertainment",
      "Friendly neighbors in a tight-knit community",
      "Lake Erie views and shoreline access",
      "Convenient Buffalo Road shopping and dining",
      "Small-town feel with big-city convenience",
      "Safe streets and community pride"
    ],
    imagePrompt: "Exact photorealistic view of Wesleyville Borough along Buffalo Road (Route 20) showing actual residential streets, Lake Erie shoreline visible north, Wesleyville Elementary School building, small neighborhood homes, East Erie Commercial district, proximity to Erie city limits. Recognizable tight-knit borough."
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
    uniqueTrait: "Birthplace of Dan Rice, 19th century circus performer who inspired Uncle Sam. Annual Dan Rice Days celebrates local history with parades and festivities",
    historicalNarrative: "Girard was founded in 1832 and quickly became an important stop on stagecoach routes. The borough's most famous resident, Dan Rice, was a 19th-century circus owner and entertainer whose patriotic costume and white goatee inspired the Uncle Sam image. Girard's Victorian downtown and annual Dan Rice Days festival preserve this colorful heritage while serving as a charming residential community.",
    favoriteThings: [
      "Annual Dan Rice Days parade and festival",
      "Historic Victorian architecture downtown",
      "Battles Museums showcasing rural Pennsylvania life",
      "Community events at Girard Borough Park",
      "Local restaurants and shops on Main Street",
      "Small-town festivals and tight-knit community"
    ],
    imagePrompt: "Exact photorealistic view of Girard's Dan Rice Days parade on Main Street (Route 20) with actual Victorian storefronts, Uncle Sam characters, Girard Borough Park, historic Battles Museums building, American flags decorating 1880s-era downtown architecture. Annual festival residents cherish."
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
    uniqueTrait: "Home to Fort LeBoeuf, a strategic French fort during French & Indian War (1753). George Washington visited here on his first military mission. Rich Erie Canal and early American history",
    historicalNarrative: "Waterford's history dates to 1753 when the French built Fort LeBoeuf, making it one of Pennsylvania's oldest European settlements. A young George Washington visited in 1753 on his first military mission. After the French & Indian War, American settlers arrived, and Waterford became an Erie Canal town in the 1840s. The beautifully preserved Eagle Historic District showcases this rich heritage.",
    favoriteThings: [
      "Exploring Fort LeBoeuf Museum and Revolutionary War history",
      "Walking through Eagle Historic District's Victorian homes",
      "Annual Fort LeBoeuf Days heritage festival",
      "Fishing and nature along LeBoeuf Creek",
      "Small-town shops and cafes downtown",
      "Rich American history at every turn"
    ],
    imagePrompt: "Exact photorealistic view of Fort LeBoeuf Museum's reconstructed 1753 French fort and blockhouse, Eagle Hotel historic building on High Street, LeBoeuf Creek flowing through town, actual Victorian homes in Eagle Historic District, Route 19/97 intersection. George Washington visited here in 1753."
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
    imagePrompt: "Exact photorealistic view of Meadville's Diamond Park with the 1870s Victorian bandstand at center, Crawford County Courthouse (1867), actual storefronts on Chestnut Street and Market Street, Baldwin Reynolds House Museum's Italianate architecture, Allegheny College's Bentley Hall (1820) visible. Historic downtown residents know by heart."
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
    uniqueTrait: "Pennsylvania's largest natural glacier-formed lake spanning 929 acres, featuring historic amusement park (opened 1892), pristine beaches, and premier fishing destination",
    historicalNarrative: "Conneaut Lake became a resort destination in the 1890s when the Bessemer & Lake Erie Railroad brought tourists to this glacier-formed natural lake. Conneaut Lake Park amusement park opened in 1892 and became one of Pennsylvania's premier entertainment destinations. The lake community evolved from a summer resort into a year-round residential area while maintaining its recreational and nostalgic charm.",
    favoriteThings: [
      "Riding the historic Blue Streak roller coaster at Conneaut Lake Park",
      "Summer days swimming and boating on Pennsylvania's largest natural lake",
      "Ice fishing and winter activities in colder months",
      "Lakefront dining with spectacular sunset views",
      "Community fireworks and summer festivals",
      "Year-round lake living with seasonal charm"
    ],
    imagePrompt: "Exact photorealistic view of Conneaut Lake's actual shoreline showing Conneaut Lake Park's Beach Club, the historic Hotel Conneaut (1903), families swimming at public beach, fishing boats and pontoons on Pennsylvania's largest natural lake, summer cottages along lakeshore. Iconic summer resort scene."
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
    uniqueTrait: "Birthplace of the American oil industry - site of Colonel Edwin Drake's world's first commercial oil well drilled in 1859. Oil Creek State Park offers 36 miles of hiking trails",
    historicalNarrative: "Titusville's destiny changed forever on August 27, 1859, when Colonel Edwin Drake struck oil at 69 feet, drilling the world's first commercial oil well. Overnight, this sleepy lumber town became the epicenter of the oil rush, with fortunes made and lost as 'Oil Creek Valley' boomed. Though the boom faded, Titusville preserved its oil heritage through the Drake Well Museum and Oil Creek State Park, while Victorian mansions downtown recall the era when oil barons walked these streets.",
    favoriteThings: [
      "Exploring Drake Well Museum where the oil industry was born",
      "Hiking and biking 36 miles of trails in Oil Creek State Park",
      "Scenic train rides on the Oil Creek & Titusville Railroad",
      "Victorian architecture and historic downtown walking tours",
      "Annual Oil Festival celebrating petroleum heritage",
      "Fishing and outdoor recreation along Oil Creek"
    ],
    imagePrompt: "Exact photorealistic view of Titusville's Spring Street downtown showing actual Drake Well Museum with 1859 oil derrick replica, Oil Creek running through, historic Victorian storefronts, Titusville Area High School, Oil Creek State Park bikeway entrance. Edwin Drake struck oil here in 1859."
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
    uniqueTrait: "Home to stunning 1909 Beaux-Arts Mercer County Courthouse with clock tower, surrounded by historic square. Annual Mercer County Fair and strong agricultural heritage",
    historicalNarrative: "Founded in 1800 and named after Revolutionary War General Hugh Mercer, this borough became Mercer County's seat in 1803. The spectacular Beaux-Arts courthouse, built in 1909, dominates the town square and remains one of Pennsylvania's most photographed county buildings. Mercer's agricultural heritage continues through the annual Mercer County Fair, while the downtown square retains its 19th-century charm.",
    favoriteThings: [
      "The magnificent Mercer County Courthouse and clock tower",
      "Annual Mercer County Fair with agricultural exhibits and rides",
      "Charming downtown shops around the historic square",
      "Magoffin House Museum showcasing local history",
      "Community events at Central Park",
      "Small-town festivals and parades"
    ],
    imagePrompt: "Exact photorealistic view of downtown Mercer around Diamond (town square) showing actual Mercer County Courthouse with clock tower, historic storefronts, Magoffin Hall Civic Center, Route 19/58/62 intersection, local businesses families know. Classic Pennsylvania county seat square."
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
    uniqueTrait: "Home to Grove City College (1876) - renowned Christian liberal arts college, plus Grove City Premium Outlets - one of the largest outlet malls in America with over 130 stores",
    historicalNarrative: "Grove City was founded in 1798 and incorporated in 1959. Grove City College, established in 1876, shaped the community's character as a Christian liberal arts institution. In the 1980s, the town's identity expanded when Prime Outlets opened, becoming one of America's premier outlet shopping destinations. Today, Grove City uniquely blends college-town culture, Christian values, and retail tourism.",
    favoriteThings: [
      "Shopping at Grove City Premium Outlets with 130+ stores",
      "Attending Grove City College basketball and football games",
      "Exploring historic downtown's unique shops and cafes",
      "Annual Christmas events and college performances",
      "Safe, family-friendly community atmosphere",
      "Beautiful Grove City College campus architecture"
    ],
    imagePrompt: "Exact photorealistic view of Grove City College's quadrangle showing Memorial Hall chapel spire, Harbison Chapel, students on campus walks, downtown Broad Street (Route 58) with college shops, Grove City Premium Outlets visible, South Center Street storefronts. Recognizable college town."
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
    uniqueTrait: "Largest city in Mercer County with thriving retail corridor including The Avenue shopping district. Gateway to Shenango River Lake with 3,500 acres for boating and fishing",
    historicalNarrative: "Hermitage grew from a small crossroads community into Mercer County's largest city through strategic commercial development in the 1970s-90s. The creation of Shenango River Lake by the Army Corps of Engineers brought recreation opportunities, while The Avenue shopping district and Shenango Valley Mall established Hermitage as the region's retail capital. Today, it continues growing as families seek modern amenities and outdoor recreation.",
    favoriteThings: [
      "Boating, fishing, and water sports at Shenango River Lake",
      "Shopping and dining at The Avenue at Hermitage",
      "Golf at scenic Winner's Circle course",
      "High school sports at impressive Hermitage Stadium",
      "Numerous parks and recreational facilities",
      "Convenient access to all amenities"
    ],
    imagePrompt: "Exact photorealistic view of Hermitage's Route 18/62 corridor showing Hickory High School, Shenango Valley Freeway (Route 62), The Avenue shopping district, actual plazas and businesses, Shenango River Lake visible, modern suburban homes. Recognizable Mercer County suburb."
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
    uniqueTrait: "Home to Daffin's Candies featuring the world's largest chocolate kingdom (10,000+ sq ft). Beautiful Buhl Park with 300+ acres, gardens, and recreational facilities",
    historicalNarrative: "Sharon grew as a steel manufacturing center in the late 1800s, attracting immigrants from across Europe. The city flourished during the industrial era, with beautiful Buhl Park (donated by steel magnate Frank Buhl in 1910) showcasing that prosperity. As steel declined, Sharon reinvented itself, with Daffin's Candies becoming an international destination and downtown revitalization bringing new life to historic buildings.",
    favoriteThings: [
      "Touring Daffin's Candies world-famous Chocolate Kingdom",
      "Picnicking and events at beautiful Buhl Park",
      "Exploring revitalized historic downtown",
      "Winter Festival of Lights at Buhl Park",
      "Local restaurants and ethnic food traditions",
      "Community events and festivals year-round"
    ],
    imagePrompt: "Exact photorealistic view of downtown Sharon's State Street (Route 18) showing actual Daffin's Candies building with Chocolate Kingdom, Buhl Park's distinctive conservatory and cascading fountains, Winner building, Reyer's shoe store, East State Street businesses, Shenango River waterfront. Regional shopping hub."
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
    uniqueTrait: "Preserved railroad history showcased at Greenville Railroad Park Museum featuring vintage locomotives, cabooses, and station. Active downtown with local shops and dining",
    historicalNarrative: "Greenville's fortunes were made by the railroad, with the Erie & Pittsburgh Railroad establishing major operations here in the 1860s. The town became a significant railroad junction and manufacturing center. Though railroad dominance faded, Greenville preserved this heritage at the Railroad Park Museum, where vintage locomotives and rail cars tell the story of Pennsylvania's transportation history.",
    favoriteThings: [
      "Exploring vintage trains at Greenville Railroad Park Museum",
      "Walking and biking the Shenango River Trail",
      "Downtown festivals and community events",
      "Local shops and restaurants on Main Street",
      "Memorial Park summer concerts",
      "Small-town charm with active community spirit"
    ],
    imagePrompt: "Exact photorealistic view of Greenville's Main Street downtown showing actual 1890s Victorian storefronts, Canal Street businesses, historic Greenville Railroad Park and Museum with vintage trains, Shenango River Valley, Reynolds Mansion visible. Recognizable hometown Main Street USA."
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
    uniqueTrait: "Confluence of French Creek and Allegheny River. Home to DeBence Antique Music World - world's largest collection of automatic music machines. Rich lumber and oil boom heritage",
    historicalNarrative: "Founded at the strategic confluence of French Creek and Allegheny River, Franklin flourished during the lumber boom and later the oil rush. The town's Victorian wealth is preserved in the DeBence Antique Music World museum, which houses the world's largest collection of automatic music machines in a restored mansion. Franklin's riverside location continues to define its character and recreation.",
    favoriteThings: [
      "Touring DeBence Antique Music World's amazing collection",
      "Kayaking and fishing at French Creek and Allegheny River confluence",
      "Walking the Samuel Justus Recreation Trail along the river",
      "Live performances at historic Barrow-Civic Theatre",
      "Victorian architecture throughout downtown",
      "Annual Applefest celebration"
    ],
    imagePrompt: "Exact photorealistic view of Franklin's 13th Street downtown showing actual Liberty Street storefronts, Allegheny River and French Creek confluence, historic Franklin City Hall, Barrow-Civic Theatre marquee, DeBence Antique Music World Victorian mansion, Route 8/62 bridge. Recognizable dual-river city."
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
    uniqueTrait: "Center of Pennsylvania's oil boom history - Oil Creek State Park preserves oil heritage with 36 miles of trails. Scenic train rides on Oil Creek & Titusville Railroad through history",
    historicalNarrative: "Oil City exploded in the 1860s as the downstream hub of the oil boom that started in Titusville. At its peak, the city was Pennsylvania's third-largest and one of America's wealthiest. Though oil production moved elsewhere, Oil City preserved its heritage through the Venango Museum and Oil Creek State Park. The Oil Creek & Titusville Railroad offers scenic trips through the valley where America's oil industry began.",
    favoriteThings: [
      "Scenic train rides on Oil Creek & Titusville Railroad",
      "Hiking and biking 36 miles of trails in Oil Creek State Park",
      "Exploring oil boom history at Venango Museum",
      "Fishing and kayaking on Oil Creek and Allegheny River",
      "Historic downtown architecture and revitalization",
      "Annual Oil Heritage Festival"
    ],
    imagePrompt: "Exact photorealistic view of Oil City's Seneca Street historic downtown with Victorian buildings, Oil Creek flowing under bridges, Venango Museum of Art, Science and Industry building, actual derricks at Drake Well Museum area, Oil Creek State Park bikeway, Central Avenue businesses. Oil heritage city."
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
    uniqueTrait: "Gateway to 517,000-acre Allegheny National Forest. Base for Kinzua Bridge Skywalk, Allegheny River water trail, hiking, hunting, and year-round outdoor adventure",
    historicalNarrative: "Warren was founded in 1795 and grew as a lumber town, processing timber from the vast surrounding forests. The lumber boom brought prosperity reflected in Victorian downtown architecture. When the Allegheny National Forest was established in 1923, Warren became the gateway to Pennsylvania's only national forest. Today, outdoor recreation drives the economy as visitors use Warren as base camp for forest adventures.",
    favoriteThings: [
      "Gateway access to 517,000 acres of Allegheny National Forest",
      "Day trips to spectacular Kinzua Bridge Skywalk",
      "Allegheny River kayaking and water trail adventures",
      "Hiking, hunting, and fishing in endless forest",
      "Charming historic downtown with local shops",
      "Four-season outdoor recreation paradise"
    ],
    imagePrompt: "Exact photorealistic view of downtown Warren at Pennsylvania Avenue and Market Street showing historic Warren County Courthouse, United Refining Company's distinctive presence, Allegheny River waterfront, Pennsylvania Avenue's restored storefronts, Struthers Library Theatre marquee. Third Street shops residents recognize."
  },
  northWarren: {
    name: "North Warren",
    slug: "north-warren",
    county: "Warren County",
    zipCodes: ["16365"],
    nearbyComm: ["Warren", "Youngsville", "Sugar Grove"],
    landmarks: ["Residential neighborhoods", "Warren County recreation areas", "Allegheny River proximity", "Suburban development"],
    description: "Residential suburb of Warren offering convenient access to city amenities and Allegheny National Forest",
    population: "~2,400",
    uniqueTrait: "Suburban community adjacent to Warren combining residential living with forest access. Popular with families seeking Warren schools and outdoor lifestyle",
    historicalNarrative: "North Warren developed as Warren expanded northward, providing suburban residential areas while maintaining access to city services and forest recreation.",
    favoriteThings: [
      "Suburban living near Warren amenities",
      "Quick access to Allegheny National Forest",
      "Warren County School District excellence",
      "Family-friendly neighborhoods",
      "Close to Allegheny River recreation",
      "Balance of suburban and outdoor living"
    ],
    imagePrompt: "Exact photorealistic view of North Warren's residential neighborhoods with well-maintained suburban homes, Warren visible nearby, Allegheny National Forest visible in distance, family-friendly streets, community parks. Suburban forest gateway living."
  },
  youngsville: {
    name: "Youngsville",
    slug: "youngsville",
    county: "Warren County",
    zipCodes: ["16371"],
    nearbyComm: ["Warren", "Sugar Grove", "Pittsfield"],
    landmarks: ["Brokenstraw Creek", "Downtown Youngsville", "Youngsville Area School District", "Route 6 corridor", "Creek recreation areas"],
    description: "Small borough along Brokenstraw Creek in Warren County offering small-town living and outdoor recreation",
    population: "~1,700",
    uniqueTrait: "Charming small town along Brokenstraw Creek. Gateway for fishing, kayaking, and outdoor activities. Warren County small-town living with community pride",
    historicalNarrative: "Youngsville developed along Brokenstraw Creek as a small commercial center serving Warren County's rural areas. The borough maintains small-town character while offering creek recreation and community events.",
    favoriteThings: [
      "Fishing and kayaking on Brokenstraw Creek",
      "Small-town community atmosphere",
      "Youngsville Area School District",
      "Annual community festivals",
      "Outdoor recreation opportunities",
      "Safe neighborhoods and friendly residents"
    ],
    imagePrompt: "Exact photorealistic view of downtown Youngsville along Route 6 showing Brokenstraw Creek flowing through town, actual storefronts, Youngsville Area School District building, historic borough buildings, creek fishing access. Small Warren County borough."
  },
  bearLake: {
    name: "Bear Lake",
    slug: "bear-lake",
    county: "Warren County",
    zipCodes: ["16402"],
    nearbyComm: ["North East", "Edinboro", "Sugar Grove"],
    landmarks: ["Bear Lake", "Lake recreation", "Rural countryside", "Lakefront properties"],
    description: "Small lakeside community on Erie-Warren county border offering peaceful lake living",
    population: "~250",
    uniqueTrait: "Peaceful lake community straddling Erie and Warren counties. Bear Lake offers fishing, boating, and quiet lakeside living",
    historicalNarrative: "Bear Lake community developed around the natural lake, attracting seasonal and year-round residents seeking peaceful lakeside living between Erie and Warren counties.",
    favoriteThings: [
      "Bear Lake fishing and boating",
      "Peaceful lakeside living",
      "Close-knit lake community",
      "Seasonal lake recreation",
      "Natural beauty and serenity",
      "Between Erie and Warren counties"
    ],
    imagePrompt: "Exact photorealistic view of Bear Lake with lakefront homes, fishing docks, calm lake waters, boaters and anglers, wooded shoreline, seasonal cottages. Peaceful Warren-Erie county border lake community."
  },
  russell: {
    name: "Russell",
    slug: "russell",
    county: "Warren County",
    zipCodes: ["16345"],
    nearbyComm: ["Warren", "Clarendon", "North Warren"],
    landmarks: ["Kinzua Reservoir", "Allegheny River", "Kinzua-Wolf Run Marina", "Forest recreation areas"],
    description: "Small borough serving as gateway to Kinzua Reservoir and Allegheny River recreation",
    population: "~350",
    uniqueTrait: "Gateway to Kinzua Reservoir and Allegheny River. Premier muskie fishing destination. Outdoor recreation base camp in Warren County forest region",
    historicalNarrative: "Russell became a gateway to Kinzua Reservoir after the dam created this massive fishing and boating destination. The borough serves outdoor enthusiasts accessing Allegheny River and forest recreation.",
    favoriteThings: [
      "World-class muskie fishing on Kinzua Reservoir",
      "Allegheny River access for boating and kayaking",
      "Kinzua-Wolf Run Marina facilities",
      "Hunting and outdoor recreation in surrounding forest",
      "Peaceful rural living",
      "Gateway to Allegheny National Forest"
    ],
    imagePrompt: "Exact photorealistic view of Kinzua Reservoir near Russell with muskie anglers in boats, Kinzua-Wolf Run Marina docks, forested Allegheny River shoreline, autumn colors reflecting in water, Russell borough visible. Premier fishing destination."
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
    uniqueTrait: "Picturesque Allegheny River location - popular kayaking/canoeing destination. Historic downtown with Victorian charm. Gateway to Allegheny River Islands Wilderness",
    historicalNarrative: "Tidioute sits at a strategic bend in the Allegheny River and grew as a lumber town in the 1800s. The borough's Victorian downtown reflects that prosperous era. Today, Tidioute is beloved by paddlers on the Allegheny River Water Trail and serves as gateway to the Allegheny River Islands Wilderness, a pristine island ecosystem.",
    favoriteThings: [
      "Kayaking and canoeing the Allegheny River Water Trail",
      "Exploring Allegheny River Islands Wilderness",
      "Fishing for smallmouth bass and walleye",
      "Historic Victorian downtown architecture",
      "Hunter Station Bridge scenic views",
      "Peaceful river town atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of Tidioute's Allegheny River waterfront showing the historic Hunter Station Bridge, Victorian downtown buildings along riverbank, kayakers paddling, wooded river islands, autumn reflections in calm water. Paddler's paradise."
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
    uniqueTrait: "Agricultural community in Warren County maintaining farming traditions. Peaceful rural living with working farms and open spaces",
    historicalNarrative: "Sugar Grove has remained an agricultural community since its founding, with farms passing through generations. The township represents Warren County's farming heritage, with families maintaining working farms, producing crops, and raising livestock. Sugar Grove offers quintessential rural Pennsylvania living.",
    favoriteThings: [
      "Working farms and agricultural heritage",
      "Wide open countryside and rural beauty",
      "Tight-knit farming community",
      "Country roads perfect for scenic drives",
      "Agricultural traditions and farm-fresh produce",
      "Peaceful rural lifestyle"
    ],
    imagePrompt: "Exact photorealistic view of Sugar Grove Township showing working dairy farms with red barns, Holstein cattle grazing, Route 69 corridor, rolling agricultural fields, farm equipment, Warren County countryside, blue sky. Quintessential rural Pennsylvania farming community."
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
    uniqueTrait: "Located in heart of Allegheny National Forest region. Base for hunting, fishing, hiking, and ATV recreation. Outdoor lifestyle community",
    historicalNarrative: "Sheffield grew as a lumber town deep in Pennsylvania's northern forest and later became a base camp for oil drilling. When the Allegheny National Forest was established, Sheffield evolved into a recreation community. Today, residents embrace outdoor lifestyles - hunting, fishing, hiking, and ATV riding in the vast surrounding forest.",
    favoriteThings: [
      "Hunting in Allegheny National Forest",
      "ATV trail riding through forest lands",
      "Fishing on Kinzua Reservoir",
      "Hiking endless forest trails",
      "Outdoor lifestyle year-round",
      "Remote living surrounded by wilderness"
    ],
    imagePrompt: "Exact photorealistic view of Sheffield Township showing hunters in camouflage in Allegheny National Forest, ATV riders on forest trails, Kinzua Reservoir visible, deer and wildlife, remote cabins, dense autumn forest. Outdoor enthusiast and hunting culture."
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
    uniqueTrait: "Small community near Allegheny Reservoir created by Kinzua Dam. Gateway to reservoir fishing, boating, and forest recreation",
    historicalNarrative: "Clarendon's history changed dramatically when the Army Corps of Engineers built Kinzua Dam in 1965, creating the massive Allegheny Reservoir. The small community became a gateway to the reservoir's recreation opportunities - boating, fishing, camping, and forest access.",
    favoriteThings: [
      "Boating and fishing on Allegheny Reservoir",
      "Kinzua Dam tours and overlooks",
      "Forest camping and outdoor recreation",
      "Hunting and fishing in season",
      "Remote living near wilderness",
      "Water sports and reservoir activities"
    ],
    imagePrompt: "Exact photorealistic view of Allegheny Reservoir near Clarendon showing Kinzua Dam structure, boats fishing and cruising, forested reservoir shores, Kinzua Dam visitor overlook, camping areas visible, the massive concrete dam. Engineering marvel meets outdoor recreation."
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
    uniqueTrait: "Home to world-famous Kinzua Bridge Skywalk - former railroad viaduct now popular tourist attraction. Deep in Allegheny National Forest with spectacular views",
    historicalNarrative: "Kinzua was a remote forest community until the spectacular Kinzua Viaduct railroad bridge was built in 1882, once the world's highest. After a 2003 tornado partially destroyed the bridge, it was reimagined as the Kinzua Bridge Skywalk, attracting thousands of visitors to walk out over the 300-foot gorge and experience breathtaking forest views.",
    favoriteThings: [
      "Walking the thrilling Kinzua Bridge Skywalk 300 feet above the gorge",
      "Photographing the dramatic ruins of the viaduct",
      "Hiking trails through spectacular forest scenery",
      "Visitor center exhibits on railroad history",
      "Autumn foliage from the skywalk",
      "Remote forest living and natural beauty"
    ],
    imagePrompt: "Exact photorealistic view of Kinzua Bridge State Park showing the iconic Kinzua Skywalk extending over the 300-foot gorge, tornado-damaged viaduct ruins, visitors walking the glass-floored skywalk, dense Allegheny National Forest autumn colors, spectacular gorge views. Breathtaking engineering meets natural beauty."
  },

  // More Erie County Communities
  lakeCity: {
    name: "Lake City",
    slug: "lake-city",
    county: "Erie County",
    zipCodes: ["16423"],
    nearbyComm: ["Girard", "Fairview", "Edinboro"],
    landmarks: ["Historic downtown Lake City", "Lake City Area School", "Route 20 corridor", "Lake City Borough Park", "Northwestern Pennsylvania"],
    description: "Charming small borough in southwestern Erie County with historic downtown and family-friendly atmosphere",
    population: "~2,900",
    uniqueTrait: "Charming small town atmosphere with historic downtown square. Strong community pride, annual celebrations, and Northwestern School District. Affordable living near Erie",
    historicalNarrative: "Lake City developed as a small commercial center serving farming communities in southwestern Erie County. The borough grew along Route 20, maintaining its small-town character while providing services to the surrounding area. Today, Lake City is beloved for its affordable housing, excellent schools, and genuine small-town community spirit.",
    favoriteThings: [
      "Historic downtown square and local businesses",
      "Northwestern School District excellence",
      "Annual community festivals and parades",
      "Safe neighborhoods and affordable housing",
      "Local restaurants and shops",
      "Strong sense of community"
    ],
    imagePrompt: "Exact photorealistic view of Lake City's historic downtown square on Main Street (Route 20) showing actual local storefronts, Northwestern School District building, American flags, families at community event, tree-lined streets. Classic small-town America atmosphere."
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
    uniqueTrait: "Small-town charm in rural Erie County with top-rated Seneca High School. Peaceful living with strong agricultural heritage and community spirit",
    historicalNarrative: "Wattsburg was incorporated in 1851 as a small agricultural center in rural Erie County. The borough maintained its farming heritage and small-town character through the decades. Today, families are drawn to Wattsburg for its excellent Seneca High School, safe neighborhoods, and peaceful rural atmosphere.",
    favoriteThings: [
      "Excellent Seneca High School and academics",
      "Small-town safety and community spirit",
      "Rural countryside and agricultural heritage",
      "Community events and traditions",
      "Peaceful living away from city",
      "Strong school pride and athletics"
    ],
    imagePrompt: "Exact photorealistic view of Wattsburg Borough showing small downtown square on Route 8, Seneca High School building, Wattsburg Area School District, agricultural fields surrounding town, families at borough park, country roads. Rural Pennsylvania small-town living."
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
    uniqueTrait: "Located in both Erie and Crawford counties - unique dual-county borough. Home to Union City Dam/Reservoir for fishing and recreation. Regional shopping and services hub",
    historicalNarrative: "Union City sits uniquely astride the Erie-Crawford county line, incorporated in 1866. The borough served as a regional commercial hub for farming communities. The Army Corps of Engineers' Union City Dam (1971) created a reservoir that brought recreation to the area, while the borough continues serving as a shopping and services center for rural communities.",
    favoriteThings: [
      "Fishing and boating at Union City Dam and Reservoir",
      "Unique location in two counties",
      "Regional shopping and dining hub",
      "Union City Area School District sports",
      "Community festivals and events",
      "Country living with town conveniences"
    ],
    imagePrompt: "Exact photorealistic view of Union City Dam and Reservoir showing anglers fishing from dam, families picnicking, the dam structure, Union City's downtown on South Main Street in background, rolling countryside, Bentley Creek. Recreation meets small-town regional hub."
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
    uniqueTrait: "Industrial heritage city - once known as 'The Edge Tool Capital of the World'. Strong manufacturing history, tight-knit community, and revitalizing downtown with local businesses",
    historicalNarrative: "Corry was founded in 1861 and quickly became an industrial powerhouse, earning the title 'Edge Tool Capital of the World' for its zipper and fastener manufacturing. The city's industries attracted workers who built a tight-knit community. Though manufacturing evolved, Corry maintains its working-class pride, industrial heritage, and strong community identity.",
    favoriteThings: [
      "Industrial heritage at Corry Area Historical Society",
      "Revitalized downtown with local businesses",
      "Strong Corry Beavers school sports tradition",
      "Wright Park community events",
      "Tight-knit community spirit",
      "Working-class pride and heritage"
    ],
    imagePrompt: "Exact photorealistic view of Corry's downtown Mead Avenue showing historic manufacturing buildings, Corry Area Historical Society, Wright Park, community gathering for Beavers sports event, actual storefronts, industrial heritage markers. Working-class town pride."
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
    uniqueTrait: "Westernmost borough in Erie County, serving as a local hub for surrounding farming communities and close to Ohio border shopping",
    historicalNarrative: "Albion was incorporated in 1858 as a commercial center for farming communities in far western Erie County. Its proximity to the Ohio border made it a crossroads for agriculture and commerce. Today, Albion maintains its small-town character, annual fair traditions, and role as a local hub for surrounding rural areas.",
    favoriteThings: [
      "Annual Albion Area Fair celebrating agricultural heritage",
      "Historic downtown square and local businesses",
      "Close to Ohio border shopping and dining",
      "Northwestern School District community",
      "Small-town festivals and parades",
      "Rural agricultural atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of Albion Area Fair showing agricultural exhibits, 4-H livestock barns, carnival rides, families enjoying fair food, downtown Albion square on Smock Avenue visible in background, fairgrounds. Rural Pennsylvania country fair atmosphere."
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
    uniqueTrait: "Growing suburban township offering perfect balance of Erie city convenience and peaceful countryside, with strong schools and family-friendly atmosphere",
    historicalNarrative: "McKean Township developed from agricultural land into one of Erie County's desirable suburban communities. Families seeking good schools, affordable housing, and easy Erie access have driven steady growth. Lake Pleasant offers recreation, while the Route 99 corridor provides shopping and services.",
    favoriteThings: [
      "Family-friendly neighborhoods and excellent schools",
      "Lake Pleasant swimming and recreation",
      "Convenient Route 99 shopping corridor",
      "McKean Community Park activities",
      "Balance of suburban and rural living",
      "Easy commute to Erie jobs"
    ],
    imagePrompt: "Exact photorealistic view of McKean Township showing modern suburban homes, Lake Pleasant beach area with families swimming, McKean Community Park, Route 99 corridor businesses, blend of suburban and rural landscape. Family-oriented community."
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
    uniqueTrait: "Fast-growing suburb between Erie and Crawford counties, popular with families seeking Northwestern School District and lower property taxes than Erie proper",
    historicalNarrative: "Cranberry Township remained largely agricultural until the I-79 corridor brought development in the 1970s-90s. The township became popular with families seeking affordable housing, excellent Northwestern schools, and lower taxes than Erie. Cranberry Mall and commercial development along Route 18 provide convenient shopping.",
    favoriteThings: [
      "Affordable housing and property taxes",
      "Excellent Northwestern School District",
      "Cranberry Mall shopping convenience",
      "Growing community with modern amenities",
      "Easy I-79 access to Erie and Pittsburgh",
      "Family-friendly suburban atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of Cranberry Township showing Cranberry Mall area, Route 18 corridor businesses, residential subdivisions, Northwestern School District building, I-79 interchange visible, mix of suburban and rural. Growing Erie County suburb."
  },
  springCreek: {
    name: "Spring Creek",
    slug: "spring-creek",
    county: "Erie County",
    zipCodes: ["16436"],
    nearbyComm: ["Albion", "Edinboro", "Waterford"],
    landmarks: ["Rural township", "Agricultural lands", "Spring Creek watershed", "Country roads"],
    description: "Peaceful rural township in southwestern Erie County maintaining agricultural character",
    population: "~1,100",
    uniqueTrait: "Quiet agricultural township with working farms and rural Pennsylvania living. Peaceful countryside between Albion and Edinboro",
    historicalNarrative: "Spring Creek Township has maintained its agricultural character since settlement, with working farms and rural traditions passed through generations.",
    favoriteThings: [
      "Peaceful rural countryside",
      "Agricultural heritage and working farms",
      "Country roads and scenic drives",
      "Tight-knit rural community",
      "Affordable rural living",
      "Traditional Pennsylvania farm country"
    ],
    imagePrompt: "Exact photorealistic view of Spring Creek Township showing working farms with barns, agricultural fields, Spring Creek flowing through countryside, rural roads, Erie County farmland, pastoral Pennsylvania landscape. Quiet agricultural township."
  },
  lawrencePark: {
    name: "Lawrence Park",
    slug: "lawrence-park",
    county: "Erie County",
    zipCodes: ["16511"],
    nearbyComm: ["Erie", "Wesleyville", "Harborcreek"],
    landmarks: ["Lawrence Park Shopping Center", "Buffalo Road corridor", "Residential neighborhoods", "East Side Erie"],
    description: "Small residential borough in eastern Erie along Buffalo Road commercial corridor",
    population: "~3,900",
    uniqueTrait: "Compact residential community on Buffalo Road between Erie and Harborcreek. Convenient location with easy access to Erie jobs and amenities",
    historicalNarrative: "Lawrence Park developed as an eastern Erie residential community along the Buffalo Road commercial corridor, offering convenient access to Erie employment and shopping.",
    favoriteThings: [
      "Convenient Buffalo Road shopping and dining",
      "Quick access to Erie employment",
      "Compact residential community",
      "Proximity to Lake Erie",
      "East Erie amenities",
      "Affordable housing"
    ],
    imagePrompt: "Exact photorealistic view of Lawrence Park borough showing Buffalo Road (Route 20) commercial corridor, residential streets, Lawrence Park Shopping Center, proximity to Erie, compact neighborhood homes. Eastern Erie residential community."
  },

  // More Crawford County Communities
  cambridgeSprings: {
    name: "Cambridge Springs",
    slug: "cambridge-springs",
    county: "Crawford County",
    zipCodes: ["16403"],
    nearbyComm: ["Edinboro", "Meadville", "Saegertown"],
    landmarks: ["Alliance College", "Riverside Hotel", "French Creek", "Historic spa district", "Cambridge Springs High School"],
    description: "Historic mineral springs resort town featuring Victorian spa architecture and French Creek recreation",
    population: "~2,600",
    uniqueTrait: "Victorian-era mineral springs resort town dating to 1880s. Historic Riverside Hotel (1886) and spa architecture. Home to Alliance College. French Creek flows through town",
    historicalNarrative: "Cambridge Springs flourished in the 1880s-1920s as an elegant mineral springs resort attracting visitors nationwide to its healing waters. Grand hotels and spas lined the streets, with the Riverside Hotel (1886) as the crown jewel. Alliance College (1912-1987) brought Polish heritage and education. Though the resort era faded, Victorian architecture and community pride remain.",
    favoriteThings: [
      "Historic Riverside Hotel and Victorian spa architecture",
      "French Creek fishing and kayaking",
      "Alliance College history and heritage",
      "Small-town charm with historical significance",
      "Annual festivals celebrating mineral springs heritage",
      "Walking tours of historic district"
    ],
    imagePrompt: "Exact photorealistic view of Cambridge Springs downtown at Federal Street and Venango Avenue showing actual Riverside Hotel (1886), Alliance College buildings, French Creek flowing through town, historic spa architecture from 1880s resort era, Victorian storefronts. Mineral springs heritage residents remember."
  },
  saegertown: {
    name: "Saegertown",
    slug: "saegertown",
    county: "Crawford County",
    zipCodes: ["16433"],
    nearbyComm: ["Meadville", "Cambridge Springs", "Edinboro"],
    landmarks: ["Woodcock Creek Lake", "Downtown Saegertown", "Saegertown Area School District", "Rural farmland"],
    description: "Small rural borough serving as gateway to Woodcock Creek Lake recreation area",
    population: "~1,050",
    uniqueTrait: "Gateway to Woodcock Creek Lake for fishing and boating. Small-town atmosphere with agricultural heritage and Saegertown School District pride",
    historicalNarrative: "Saegertown developed as a small agricultural center in Crawford County, later becoming gateway to Woodcock Creek Lake recreation area. The borough maintains small-town character.",
    favoriteThings: [
      "Fishing and boating at Woodcock Creek Lake",
      "Small-town community atmosphere",
      "Saegertown Area School District",
      "Agricultural heritage",
      "Local businesses and shops",
      "Community festivals"
    ],
    imagePrompt: "Exact photorealistic view of Saegertown borough showing downtown businesses, Woodcock Creek Lake visible nearby, Saegertown School District building, agricultural fields surrounding, small-town Main Street. Crawford County rural borough."
  },
  linesville: {
    name: "Linesville",
    slug: "linesville",
    county: "Crawford County",
    zipCodes: ["16424"],
    nearbyComm: ["Conneautville", "Conneaut Lake", "Harmonsburg"],
    landmarks: ["Pymatuning Reservoir", "Linesville Spillway", "Downtown Linesville", "Pymatuning State Park"],
    description: "Famous lake town home to Pymatuning Spillway where ducks walk on fish",
    population: "~1,000",
    uniqueTrait: "Home to famous Pymatuning Spillway - 'where the ducks walk on the fish'. Gateway to Pymatuning Reservoir, one of Pennsylvania's largest lakes and premier fishing destinations",
    historicalNarrative: "Linesville became famous for the Pymatuning Spillway where carp congregate so densely that ducks literally walk on the fish to get bread from tourists. The town serves as gateway to Pymatuning Reservoir fishing and recreation.",
    favoriteThings: [
      "Feeding fish at famous Pymatuning Spillway",
      "Fishing on massive Pymatuning Reservoir",
      "Pymatuning State Park camping and recreation",
      "Boating and water sports",
      "Wildlife watching",
      "Unique tourist attraction"
    ],
    imagePrompt: "Exact photorealistic view of Linesville Spillway showing the famous scene where ducks walk on carp, families feeding fish, Pymatuning Reservoir, spillway structure, visitors watching wildlife spectacle. Iconic Pennsylvania tourist attraction."
  },
  conneautville: {
    name: "Conneautville",
    slug: "conneautville",
    county: "Crawford County",
    zipCodes: ["16406"],
    nearbyComm: ["Linesville", "Meadville", "Springboro"],
    landmarks: ["Downtown square", "Conneautville Area School", "Agricultural community", "Route 18/198 junction"],
    description: "Small agricultural borough in western Crawford County with historic downtown",
    population: "~760",
    uniqueTrait: "Small-town charm with agricultural heritage. Historic downtown square and Conneautville School District community pride",
    historicalNarrative: "Conneautville grew as a small agricultural center in western Crawford County, maintaining its rural character and small-town atmosphere through the generations.",
    favoriteThings: [
      "Historic downtown square",
      "Agricultural community heritage",
      "Conneautville Area School District",
      "Small-town festivals",
      "Rural Pennsylvania living",
      "Community events"
    ],
    imagePrompt: "Exact photorealistic view of Conneautville's downtown square showing historic storefronts, Conneautville School building, agricultural fields nearby, Route 18/198 junction, small borough atmosphere. Crawford County agricultural community."
  },
  harmonsburg: {
    name: "Harmonsburg",
    slug: "harmonsburg",
    county: "Crawford County",
    zipCodes: ["16422"],
    nearbyComm: ["Conneaut Lake", "Meadville", "Linesville"],
    landmarks: ["Rural crossroads", "Agricultural lands", "Small borough center"],
    description: "Tiny rural borough in Crawford County maintaining agricultural character",
    population: "~560",
    uniqueTrait: "Small agricultural community in Crawford County. Peaceful rural living with tight-knit small-town atmosphere",
    historicalNarrative: "Harmonsburg remained a small agricultural community in Crawford County, preserving rural character and farming heritage.",
    favoriteThings: [
      "Peaceful rural living",
      "Agricultural heritage",
      "Tight-knit community",
      "Country atmosphere",
      "Small-town character"
    ],
    imagePrompt: "Exact photorealistic view of Harmonsburg showing small borough center, agricultural fields, working farms, country roads, Crawford County rural landscape. Tiny Pennsylvania agricultural borough."
  },
  spartansburg: {
    name: "Spartansburg",
    slug: "spartansburg",
    county: "Crawford County",
    zipCodes: ["16434"],
    nearbyComm: ["Corry", "Titusville", "Riceville"],
    landmarks: ["Downtown Spartansburg", "Spartansburg Area School", "Route 6 corridor", "Agricultural region"],
    description: "Small rural borough in eastern Crawford County along historic Route 6",
    population: "~290",
    uniqueTrait: "Small-town living along Route 6 corridor. Agricultural heritage and Spartansburg School District community",
    historicalNarrative: "Spartansburg developed as a small agricultural center along Route 6 in eastern Crawford County, maintaining rural character.",
    favoriteThings: [
      "Small-town rural living",
      "Agricultural heritage",
      "Spartansburg School District",
      "Route 6 historic corridor",
      "Peaceful countryside"
    ],
    imagePrompt: "Exact photorealistic view of Spartansburg along Route 6 showing small downtown, Spartansburg School building, agricultural fields, rural borough center. Eastern Crawford County small town."
  },
  bloomingValley: {
    name: "Blooming Valley",
    slug: "blooming-valley",
    county: "Crawford County",
    zipCodes: ["16335"],
    nearbyComm: ["Meadville", "Guys Mills", "Townville"],
    landmarks: ["Rural valley", "Agricultural lands", "Country living"],
    description: "Small rural hamlet in scenic Crawford County valley",
    population: "~120",
    uniqueTrait: "Tiny rural hamlet in picturesque valley. Peaceful agricultural living in Crawford County countryside",
    historicalNarrative: "Blooming Valley is a small rural hamlet in Crawford County's scenic countryside, representing traditional agricultural living.",
    favoriteThings: [
      "Peaceful valley setting",
      "Agricultural heritage",
      "Rural countryside",
      "Scenic beauty"
    ],
    imagePrompt: "Exact photorealistic view of Blooming Valley showing scenic rural valley with farms, agricultural fields, country roads, Crawford County pastoral landscape. Tiny Pennsylvania hamlet."
  },
  cochranton: {
    name: "Cochranton",
    slug: "cochranton",
    county: "Crawford County",
    zipCodes: ["16314"],
    nearbyComm: ["Meadville", "Saegertown", "Cambridge Springs"],
    landmarks: ["French Creek", "Downtown Cochranton", "Cochranton Area School", "Rural farmland"],
    description: "Small borough along French Creek in Crawford County",
    population: "~1,150",
    uniqueTrait: "French Creek flows through town. Small-town atmosphere with Cochranton School District and agricultural heritage",
    historicalNarrative: "Cochranton developed along French Creek as a small agricultural and commercial center in Crawford County.",
    favoriteThings: [
      "French Creek fishing and recreation",
      "Small-town community",
      "Cochranton School District",
      "Agricultural heritage",
      "Rural living"
    ],
    imagePrompt: "Exact photorealistic view of Cochranton showing French Creek flowing through town, downtown businesses, Cochranton School building, agricultural surroundings, small borough atmosphere. Crawford County creek town."
  },
  guysMills: {
    name: "Guys Mills",
    slug: "guys-mills",
    county: "Crawford County",
    zipCodes: ["16327"],
    nearbyComm: ["Meadville", "Blooming Valley", "Saegertown"],
    landmarks: ["Woodcock Creek Lake", "Rural crossroads", "Historic country store"],
    description: "Historic rural crossroads community near Woodcock Creek Lake",
    population: "~100",
    uniqueTrait: "Historic rural crossroads community near Woodcock Creek Lake. Maintains rural character with access to fishing and outdoor recreation",
    historicalNarrative: "Guys Mills developed as a rural crossroads in Crawford County's agricultural heartland. The community near Woodcock Creek Lake provides access to fishing and outdoor recreation while maintaining traditional rural character.",
    favoriteThings: [
      "Fishing at Woodcock Creek Lake",
      "Rural crossroads community character",
      "Peaceful countryside living",
      "Historic rural Pennsylvania atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of Guys Mills showing historic country store at crossroads, Woodcock Creek Lake visible, agricultural fields, rural roads intersecting. Historic rural Pennsylvania hamlet."
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
    uniqueTrait: "Oil boom heritage village named for early oil well fire doused with water. Part of historic Oil Creek oil production region from 1860s",
    historicalNarrative: "Hydetown earned its unusual name during the oil boom when an early well fire was extinguished with water. The community developed as part of the Oil Creek oil production region in the 1860s-70s. Today, Hydetown preserves its petroleum heritage as part of Pennsylvania's historic oil country.",
    favoriteThings: [
      "Oil heritage history and stories",
      "Part of historic Oil Creek region",
      "Small-town atmosphere",
      "Close to Titusville and Drake Well Museum",
      "Rural Pennsylvania character",
      "Oil boom legacy"
    ],
    imagePrompt: "Exact photorealistic view of Hydetown showing vintage oil derricks, Oil Creek flowing through, historic buildings from oil boom era, Hydetown borough building, interpretive markers about oil heritage. Historic petroleum village."
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
    uniqueTrait: "Oil heritage community in heart of Oil Creek region. Part of Pennsylvania's oil boom history from 1860s-1870s. Quiet small-town living with historical significance",
    historicalNarrative: "Pleasantville sits in the heart of Oil Creek Valley where Pennsylvania's oil boom began. The borough developed during the 1860s oil rush and maintained its character as oil production moved elsewhere. Today, Pleasantville preserves its petroleum heritage while offering quiet small-town living.",
    favoriteThings: [
      "Pennsylvania oil boom heritage",
      "Historic Oil Creek Valley location",
      "Small-town peaceful living",
      "Close to Drake Well Museum and oil sites",
      "Rural Pennsylvania character",
      "Oil region history"
    ],
    imagePrompt: "Exact photorealistic view of Pleasantville along Oil Creek showing historic downtown on Route 227, oil heritage markers, Oil Creek flowing through, forested hills, Pleasantville School building. Historic oil country atmosphere."
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
    uniqueTrait: "Quiet Allegheny River community offering peaceful rural living. Tight-knit small borough with river access and natural beauty",
    historicalNarrative: "Cooperstown developed as a small river community along the Allegheny River in Venango County. The borough maintained its rural character and tight-knit community spirit while providing Allegheny River access for recreation.",
    favoriteThings: [
      "Allegheny River fishing and recreation",
      "Peaceful rural river living",
      "Tight-knit small community",
      "Natural beauty and scenic river",
      "Quiet small-town atmosphere",
      "Volunteer fire department community events"
    ],
    imagePrompt: "Exact photorealistic view of Cooperstown along Route 257 showing the Allegheny River, small borough buildings, volunteer fire department, fishing pier, forested river valley, peaceful rural setting. Small Venango County river borough."
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
    uniqueTrait: "Small-town Venango County charm with Allegheny River access. Family-friendly community with strong volunteer spirit and annual celebrations",
    historicalNarrative: "Polk was incorporated as a small Allegheny River borough in Venango County. The community maintained its rural character, volunteer traditions, and small-town atmosphere while providing river access and countryside living.",
    favoriteThings: [
      "Allegheny River fishing and boating",
      "Small-town safety and neighborliness",
      "Annual community celebrations",
      "Polk Borough Park activities",
      "Rural Pennsylvania atmosphere",
      "Strong volunteer community spirit"
    ],
    imagePrompt: "Exact photorealistic view of Polk showing Allegheny River, Polk Borough Park with community event, families gathering, Route 62 corridor, rural Venango County countryside. Small borough spirit."
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
    uniqueTrait: "Scenic Allegheny River location with historic bridge. Gateway for kayaking, fishing, and river recreation. Charming downtown with Victorian architecture",
    historicalNarrative: "Emlenton grew along the Allegheny River with its historic bridge connecting communities. The borough's scenic river location and Victorian downtown reflect its prosperous past. Today, Emlenton serves kayakers, anglers, and those seeking picturesque river living.",
    favoriteThings: [
      "Scenic historic Emlenton Bridge views",
      "Kayaking and fishing the Allegheny River",
      "Victorian downtown architecture",
      "River recreation gateway",
      "Emlenton Area Historical Society",
      "Picturesque river valley setting"
    ],
    imagePrompt: "Exact photorealistic view of Emlenton showing the historic Emlenton Bridge spanning the Allegheny River, Victorian downtown buildings on Main Street (Route 38), kayakers on river, forested hillsides. Picturesque Pennsylvania river town."
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
    uniqueTrait: "Historic oil industry village on Oil Creek. Site of some of Pennsylvania's earliest oil production. Part of Oil Creek State Park heritage corridor",
    historicalNarrative: "Rouseville developed during Pennsylvania's oil boom as one of Oil Creek's early petroleum production centers. The borough preserves its oil heritage as part of the Oil Creek State Park heritage corridor, where visitors explore the birthplace of America's oil industry.",
    favoriteThings: [
      "Oil Creek heritage and history",
      "Part of Oil Creek State Park corridor",
      "Historic oil production sites",
      "Oil region hiking and recreation",
      "Pennsylvania petroleum history",
      "Quiet oil heritage village"
    ],
    imagePrompt: "Exact photorealistic view of Rouseville along Oil Creek showing vintage oil derricks, Oil Creek State Park trail, Route 8 bridge, interpretive exhibits about early oil production, forested creek valley. Oil boom heritage village."
  },

  // More Mercer County Communities
  farrell: {
    name: "Farrell",
    slug: "farrell",
    county: "Mercer County",
    zipCodes: ["16121"],
    nearbyComm: ["Sharon", "Hermitage", "Wheatland"],
    landmarks: ["Shenango River", "Downtown Farrell", "Kennedy Catholic High School", "Farrell Area School District", "Historic steel mill sites"],
    description: "Former steel city with rich immigrant heritage, rebuilding as residential community in Shenango Valley",
    population: "~4,900",
    uniqueTrait: "Steel industry heritage city founded by U.S. Steel in 1901. Strong Eastern European immigrant roots, tight-knit neighborhoods, and Shenango Valley community pride",
    historicalNarrative: "Farrell was created by U.S. Steel in 1901 as a company town for mill workers. Eastern European immigrants built tight-knit ethnic neighborhoods that defined the city's character. Though steel declined, Farrell's working-class pride, immigrant heritage, and community spirit remain strong as the city rebuilds.",
    favoriteThings: [
      "Strong Eastern European heritage and traditions",
      "Kennedy Catholic High School sports pride",
      "Tight-knit ethnic neighborhoods",
      "Working-class community spirit",
      "Annual ethnic festivals and celebrations",
      "Shenango Valley regional identity"
    ],
    imagePrompt: "Exact photorealistic view of Farrell showing historic steel mill structures, ethnic neighborhood churches with distinctive architecture, Kennedy Catholic High School, Shenango River, Roemer Boulevard, community gathering. Working-class immigrant heritage city."
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
    uniqueTrait: "Historic manufacturing community known for container and metals production. Small-town atmosphere with rich labor history and annual community celebrations",
    historicalNarrative: "Sharpsville developed as a Shenango Valley manufacturing center, producing containers, metals, and industrial goods. The borough's working-class heritage created strong community identity and labor traditions. Today, Sharpsville maintains its industrial character while celebrating small-town festivals and school pride.",
    favoriteThings: [
      "Sharpsville Area School sports traditions",
      "Historic downtown businesses",
      "Manufacturing heritage and pride",
      "Annual community festivals",
      "Shenango River recreation",
      "Small-town neighborhood atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of Sharpsville showing Sharpsville Container facility, historic downtown Pierce Avenue storefronts, Shenango River, Sharpsville High School, community festival, working-class neighborhoods. Industrial heritage community."
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
    uniqueTrait: "Gateway to Sandy Lake with small-town charm. Annual Stoneboro Fair tradition brings community together. Mix of agriculture and lake recreation",
    historicalNarrative: "Stoneboro grew as a small agricultural center and gateway to Sandy Lake recreation. The annual Stoneboro Fair became a beloved regional tradition celebrating agriculture and community. Today, Stoneboro balances farming heritage with lake access.",
    favoriteThings: [
      "Annual Stoneboro Fair tradition",
      "Gateway to Sandy Lake recreation",
      "Agricultural heritage and farms",
      "Small-town festivals and events",
      "Lakeview School District community",
      "Rural Pennsylvania character"
    ],
    imagePrompt: "Exact photorealistic view of Stoneboro Fair showing agricultural exhibits in fairground barns, carnival rides, families enjoying fair food, 4-H livestock, Sandy Lake visible in background, Route 258 through town. Annual fair tradition."
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
    uniqueTrait: "Peaceful lake community with fishing, boating, and swimming. Close-knit year-round and seasonal residents enjoying natural beauty",
    historicalNarrative: "Sandy Lake developed as a lake community offering recreation and peaceful living. Year-round residents and seasonal visitors create a close-knit lake culture. The community maintains its lakeside character and outdoor lifestyle.",
    favoriteThings: [
      "Sandy Lake fishing and boating",
      "Swimming and water sports",
      "Peaceful lakeside living",
      "Year-round lake community",
      "Sandy Lake Park recreation",
      "Natural beauty and serenity"
    ],
    imagePrompt: "Exact photorealistic view of Sandy Lake showing lakefront homes, fishing piers, families boating and swimming, Sandy Lake Park beach area, serene lake waters, seasonal cottages. Year-round lake living."
  },
  clark: {
    name: "Clark",
    slug: "clark",
    county: "Mercer County",
    zipCodes: ["16113"],
    nearbyComm: ["Sharon", "Sharpsville", "Greenville"],
    landmarks: ["Rural Clark borough", "Agricultural lands", "Hickory Township area", "Route 18 corridor"],
    description: "Small agricultural borough in Mercer County maintaining rural character",
    population: "~620",
    uniqueTrait: "Small agricultural community preserving rural Mercer County character. Quiet living with proximity to Shenango Valley cities",
    historicalNarrative: "Clark remained a small agricultural community in Mercer County, maintaining rural character while convenient to Shenango Valley cities. The borough preserves farming heritage and peaceful country living.",
    favoriteThings: [
      "Peaceful rural agricultural living",
      "Small-town atmosphere",
      "Close to Sharon and Hermitage",
      "Agricultural heritage",
      "Quiet country character",
      "Rural Pennsylvania charm"
    ],
    imagePrompt: "Exact photorealistic view of Clark showing farms with red barns, agricultural countryside, small borough center, Route 18 corridor, pastoral Mercer County landscape, working farms. Rural farming community."
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
    uniqueTrait: "Quiet community on Venango-Mercer border near Allegheny River. Strategic location between Franklin and Grove City on Route 8",
    historicalNarrative: "Clintonville sits strategically on the Venango-Mercer county border along Route 8. The small borough serves rural communities between Franklin and Grove City, maintaining quiet country character.",
    favoriteThings: [
      "Strategic Route 8 location",
      "Quiet rural living",
      "Between Franklin and Grove City",
      "Small-town atmosphere",
      "Near Allegheny River",
      "Peaceful country character"
    ],
    imagePrompt: "Exact photorealistic view of Clintonville on Route 8 corridor showing small downtown borough buildings, rural Venango-Mercer County countryside, Allegheny River area visible, agricultural fields. Quiet crossroads community."
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
    uniqueTrait: "One of Pennsylvania's smallest incorporated boroughs. Quiet agricultural community with strong farming heritage and rural lifestyle",
    historicalNarrative: "Townville is one of Pennsylvania's tiniest incorporated boroughs, maintaining agricultural character through generations. This small farming community represents traditional rural Pennsylvania living.",
    favoriteThings: [
      "One of PA's smallest boroughs",
      "Agricultural heritage and farms",
      "Quiet rural living",
      "Close-knit small community",
      "Country roads and farmland",
      "Traditional rural Pennsylvania"
    ],
    imagePrompt: "Exact photorealistic view of Townville showing tiny borough center, working farms with silos, agricultural fields, country roads, pastoral Crawford County landscape. Pennsylvania's smallest boroughs."
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
    uniqueTrait: "Tiny rural hamlet representing Crawford County's agricultural heritage. Peaceful country living in Pennsylvania farm country",
    historicalNarrative: "Riceville is a tiny rural hamlet in Crawford County's agricultural heartland, representing traditional farming heritage and peaceful country living.",
    favoriteThings: [
      "Peaceful rural countryside",
      "Agricultural heritage",
      "Quiet country living",
      "Traditional Pennsylvania farm country"
    ],
    imagePrompt: "Exact photorealistic view of Riceville showing working farms with red barns, agricultural fields, country crossroads, Crawford County farmland, pastoral landscape. Tiny Pennsylvania hamlet."
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
    uniqueTrait: "Small Venango County borough maintaining quintessential rural Pennsylvania atmosphere. Tight-knit community with agricultural roots",
    historicalNarrative: "Utica is a small rural borough maintaining traditional Pennsylvania small-town character in Venango County's agricultural region.",
    favoriteThings: [
      "Quintessential rural Pennsylvania",
      "Tight-knit small community",
      "Agricultural heritage",
      "Peaceful country living"
    ],
    imagePrompt: "Exact photorealistic view of Utica showing small borough buildings, agricultural lands, country roads, Venango County countryside, tiny rural borough center. Quintessential rural Pennsylvania."
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
    uniqueTrait: "Allegheny River community surrounded by forest. Gateway to Allegheny National Forest recreation. Quiet rural living with river and forest access",
    historicalNarrative: "Irvine is a small Allegheny River community deep in Warren County's forest region, serving as gateway to forest and river recreation.",
    favoriteThings: [
      "Allegheny River fishing and recreation",
      "Surrounded by Allegheny National Forest",
      "Outdoor lifestyle and activities",
      "Peaceful forest living",
      "River access",
      "Gateway to wilderness"
    ],
    imagePrompt: "Exact photorealistic view of Irvine showing Allegheny River, dense forest surrounding borough, Irvine Borough Park, anglers fishing from riverbank, Route 62, remote wilderness setting. Forest river borough."
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
    uniqueTrait: "Small rural Warren County community along Brokenstraw Creek. Peaceful agricultural area with tight-knit community and country living",
    historicalNarrative: "Pittsfield is a small agricultural community along Brokenstraw Creek in Warren County, maintaining rural character and peaceful country living.",
    favoriteThings: [
      "Brokenstraw Creek fishing",
      "Peaceful rural living",
      "Agricultural heritage",
      "Tight-knit small community",
      "Country roads and nature",
      "Warren County countryside"
    ],
    imagePrompt: "Exact photorealistic view of Pittsfield showing Brokenstraw Creek flowing through, small borough buildings, agricultural fields, creek fishing access, country roads, Warren County rural landscape. Small rural community."
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
    uniqueTrait: "Remote forest community near Allegheny National Forest. Ultimate rural Pennsylvania living surrounded by nature. Hunting, hiking, and outdoor lifestyle",
    historicalNarrative: "Chandlers Valley is a remote forest community deep in Warren County, offering ultimate rural Pennsylvania living for those seeking wilderness and outdoor lifestyle.",
    favoriteThings: [
      "Remote forest wilderness living",
      "Near Allegheny National Forest",
      "Hunting and outdoor activities",
      "Ultimate rural lifestyle",
      "Surrounded by nature",
      "Peace and solitude"
    ],
    imagePrompt: "Exact photorealistic view of Chandlers Valley showing remote forest community with dense wilderness, a few rural homes in valley, wildlife including deer, Allegheny National Forest, autumn wilderness, remote countryside. Ultimate rural Pennsylvania living."
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
    uniqueTrait: "Largest borough in Venango County with growing residential and commercial development. Affordable housing and convenient Franklin access make it popular with families",
    historicalNarrative: "Sugarcreek grew from a small community into Venango County's largest borough due to affordable housing and commercial development along Route 8. The borough became popular with families seeking convenient Franklin access.",
    favoriteThings: [
      "Affordable housing and living",
      "Growing residential community",
      "Route 8 commercial corridor",
      "Convenient Franklin access",
      "Largest Venango County borough",
      "Family-friendly atmosphere"
    ],
    imagePrompt: "Exact photorealistic view of Sugarcreek showing residential developments along Route 8, commercial district businesses, families shopping and dining, Allegheny River access, Franklin visible nearby, growing Venango County borough."
  },
  venangoCrawford: {
    name: "Venango Crawford",
    slug: "venango-crawford",
    county: "Venango County",
    zipCodes: ["16365"],
    nearbyComm: ["Franklin", "Meadville", "Oil City"],
    landmarks: ["County border region", "Rural area", "French Creek watershed", "Agricultural lands"],
    description: "Rural region straddling Venango and Crawford county border",
    uniqueTrait: "Border region between Venango and Crawford counties. Rural agricultural area with access to both county seats and natural beauty",
    historicalNarrative: "This rural region straddles the Venango-Crawford county border, maintaining agricultural character while providing access to both Franklin and Meadville.",
    favoriteThings: [
      "Access to both Venango and Crawford counties",
      "Rural agricultural living",
      "French Creek watershed recreation",
      "Peaceful countryside",
      "Natural beauty"
    ],
    imagePrompt: "Exact photorealistic view of rural Venango-Crawford border region showing agricultural lands, French Creek flowing through countryside, working farms, pastoral landscape straddling county line. Rural Pennsylvania border region."
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