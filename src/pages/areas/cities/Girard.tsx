import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Girard = () => {
  const community = communityData.girard;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Girard;
