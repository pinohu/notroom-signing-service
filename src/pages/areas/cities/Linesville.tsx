import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Linesville = () => {
  const community = communityData.linesville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Linesville;
