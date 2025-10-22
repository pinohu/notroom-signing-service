import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Hermitage = () => {
  const community = communityData.hermitage;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Hermitage;
