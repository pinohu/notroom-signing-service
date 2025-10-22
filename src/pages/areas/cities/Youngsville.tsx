import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Youngsville = () => {
  const community = communityData.youngsville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Youngsville;
