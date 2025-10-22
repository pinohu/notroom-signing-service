import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Franklin = () => {
  const community = communityData.franklin;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Franklin;
