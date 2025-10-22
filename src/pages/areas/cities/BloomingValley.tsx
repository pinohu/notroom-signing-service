import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const BloomingValley = () => {
  const community = communityData.bloomingValley;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default BloomingValley;
