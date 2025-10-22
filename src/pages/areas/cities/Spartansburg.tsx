import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Spartansburg = () => {
  const community = communityData.spartansburg;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Spartansburg;
