import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const CranberryTownship = () => {
  const community = communityData.cranberryTownship;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default CranberryTownship;
