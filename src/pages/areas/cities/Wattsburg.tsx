import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Wattsburg = () => {
  const community = communityData.wattsburg;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Wattsburg;
