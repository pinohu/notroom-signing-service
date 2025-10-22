import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const BearLake = () => {
  const community = communityData.bearLake;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default BearLake;