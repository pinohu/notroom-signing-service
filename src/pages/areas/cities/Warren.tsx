import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Warren = () => {
  const community = communityData.warren;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Warren;
