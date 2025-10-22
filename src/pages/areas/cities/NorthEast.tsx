import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const NorthEast = () => {
  const community = communityData.northEast;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default NorthEast;
