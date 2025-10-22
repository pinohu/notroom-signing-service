import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Clintonville = () => {
  const community = communityData.clintonville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Clintonville;
