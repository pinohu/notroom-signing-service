import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Russell = () => {
  const community = communityData.russell;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Russell;
