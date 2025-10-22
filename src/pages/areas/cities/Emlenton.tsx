import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Emlenton = () => {
  const community = communityData.emlenton;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Emlenton;
