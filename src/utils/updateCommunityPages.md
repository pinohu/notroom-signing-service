# Community Page Update Template

All 60+ community pages have been updated to use the centralized CommunityPage component with SEO-optimized, unique content for each location.

## Updated Pattern:
```tsx
import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const CityName = () => {
  const community = communityData.citySlug;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default CityName;
```

## Data Location:
All community-specific data (landmarks, ZIP codes, nearby communities, unique traits) is centralized in `src/data/communityData.ts`

## SEO Features:
- Unique title tags under 60 chars
- Unique meta descriptions under 160 chars
- LocalBusiness schema JSON-LD for each community
- Internal linking to nearby communities
- Localized content mentioning landmarks
- Proper breadcrumbs and navigation

## Communities Updated:
Erie County: Erie, Millcreek, Harborcreek, Fairview, North East, Edinboro, Wesleyville, Girard, Waterford, Lake City, Wattsburg, Union City, Corry, Albion, Cranberry Township, Spring Creek, Lawrence Park, Bear Lake

Crawford County: Meadville, Conneaut Lake, Titusville, Cochranton, Saegertown, Cambridge Springs, Conneautville, Linesville, Harmonsburg, Spartansburg, Blooming Valley, Guys Mills, Hydetown, Townville, Riceville

Mercer County: Mercer, Grove City, Hermitage, Sharon, Greenville, Farrell, Sharpsville, Stoneboro, Sandy Lake, Clark

Venango County: Franklin, Oil City, Pleasantville, Cooperstown, Polk, Emlenton, Rouseville, Clintonville, Sugarcreek, Utica

Warren County: Warren, North Warren, Youngsville, Russell, Tidioute, Sugar Grove, Sheffield, Clarendon, Kinzua

Total: 65+ optimized community pages
