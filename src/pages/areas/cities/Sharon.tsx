import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Sharon = () => {
  const community = communityData.sharon;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Sharon;
