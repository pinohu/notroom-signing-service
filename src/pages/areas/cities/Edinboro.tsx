import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Edinboro = () => {
  const community = communityData.edinboro;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Edinboro;
