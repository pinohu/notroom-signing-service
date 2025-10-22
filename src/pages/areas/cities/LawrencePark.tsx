import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const LawrencePark = () => {
  const community = communityData.lawrencePark;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default LawrencePark;
