import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Corry = () => {
  const community = communityData.corry;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Corry;
