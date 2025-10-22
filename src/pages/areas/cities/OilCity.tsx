import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const OilCity = () => {
  const community = communityData.oilCity;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default OilCity;
