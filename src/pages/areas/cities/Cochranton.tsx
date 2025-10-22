import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Cochranton = () => {
  const community = communityData.cochranton;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Cochranton;
