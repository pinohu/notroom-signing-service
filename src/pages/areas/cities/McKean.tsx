import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const McKean = () => {
  const community = communityData.mckean;
  
  if (!community) {
    return <div>Community data not found</div>;
  }

  return <CommunityPage community={community} />;
};

export default McKean;
