import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Harmonsburg = () => {
  const community = communityData.harmonsburg;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Harmonsburg;
