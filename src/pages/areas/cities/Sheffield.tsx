import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Sheffield = () => {
  const community = communityData.sheffield;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Sheffield;
