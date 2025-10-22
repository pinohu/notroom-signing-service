import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const SpringCreek = () => {
  const community = communityData.springCreek;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default SpringCreek;
