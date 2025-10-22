import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Harborcreek = () => {
  const community = communityData.harborcreek;
  
  if (!community) {
    return <div>Community data not found</div>;
  }

  return <CommunityPage community={community} />;
};

export default Harborcreek;