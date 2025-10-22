import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Millcreek = () => {
  const community = communityData.millcreek;
  
  if (!community) {
    return <div>Community data not found</div>;
  }

  return <CommunityPage community={community} />;
};

export default Millcreek;