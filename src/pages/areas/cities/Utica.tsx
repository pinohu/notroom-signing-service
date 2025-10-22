import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Utica = () => {
  const community = communityData.utica;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Utica;
