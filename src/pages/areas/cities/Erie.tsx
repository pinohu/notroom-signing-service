import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Erie = () => {
  const community = communityData.erie;
  
  if (!community) {
    return <div>Community data not found</div>;
  }

  return <CommunityPage community={community} />;
};

export default Erie;
