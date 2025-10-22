import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Kinzua = () => {
  const community = communityData.kinzua;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Kinzua;
