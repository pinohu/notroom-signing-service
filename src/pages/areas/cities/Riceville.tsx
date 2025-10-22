import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const Riceville = () => {
  const community = communityData.riceville;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default Riceville;
