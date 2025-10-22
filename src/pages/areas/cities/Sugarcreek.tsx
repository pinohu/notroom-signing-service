import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Sugarcreek = () => {
  const community = communityData.sugarcreek;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Sugarcreek;
