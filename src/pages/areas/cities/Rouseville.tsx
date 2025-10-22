import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Rouseville = () => {
  const community = communityData.rouseville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Rouseville;
