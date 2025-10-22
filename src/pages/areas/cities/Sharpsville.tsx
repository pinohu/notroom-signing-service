import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Sharpsville = () => {
  const community = communityData.sharpsville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Sharpsville;
