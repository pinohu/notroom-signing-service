import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const SandyLake = () => {
  const community = communityData.sandyLake;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default SandyLake;
