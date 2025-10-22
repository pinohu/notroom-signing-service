import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const ChandlersValley = () => {
  const community = communityData.chandlersValley;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default ChandlersValley;
