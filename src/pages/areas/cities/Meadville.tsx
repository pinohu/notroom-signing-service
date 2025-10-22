import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Meadville = () => {
  const community = communityData.meadville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Meadville;
