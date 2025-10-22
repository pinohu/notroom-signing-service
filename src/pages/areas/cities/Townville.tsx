import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Townville = () => {
  const community = communityData.townville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Townville;
