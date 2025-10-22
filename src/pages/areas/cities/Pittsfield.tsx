import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Pittsfield = () => {
  const community = communityData.pittsfield;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Pittsfield;
