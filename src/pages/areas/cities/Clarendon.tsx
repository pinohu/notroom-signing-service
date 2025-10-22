import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Clarendon = () => {
  const community = communityData.clarendon;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Clarendon;
