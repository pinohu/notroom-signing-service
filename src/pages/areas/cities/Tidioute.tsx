import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Tidioute = () => {
  const community = communityData.tidioute;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Tidioute;
