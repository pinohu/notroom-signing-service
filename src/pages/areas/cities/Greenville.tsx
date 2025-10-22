import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Greenville = () => {
  const community = communityData.greenville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Greenville;
