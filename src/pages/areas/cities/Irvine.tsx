import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Irvine = () => {
  const community = communityData.irvine;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Irvine;
