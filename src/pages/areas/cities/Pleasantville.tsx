import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Pleasantville = () => {
  const community = communityData.pleasantville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Pleasantville;
