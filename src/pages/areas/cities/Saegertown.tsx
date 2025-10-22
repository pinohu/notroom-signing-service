import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Saegertown = () => {
  const community = communityData.saegertown;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Saegertown;
