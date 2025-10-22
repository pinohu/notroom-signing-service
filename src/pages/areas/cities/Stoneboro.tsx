import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Stoneboro = () => {
  const community = communityData.stoneboro;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Stoneboro;
