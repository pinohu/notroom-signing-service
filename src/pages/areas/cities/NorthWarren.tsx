import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const NorthWarren = () => {
  const community = communityData.northWarren;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default NorthWarren;
