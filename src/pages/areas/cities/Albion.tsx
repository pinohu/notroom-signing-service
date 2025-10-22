import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Albion = () => {
  const community = communityData.albion;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Albion;
