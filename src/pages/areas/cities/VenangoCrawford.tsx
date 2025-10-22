import CommunityPage from "@/components/CommunityPage";
import { communityData } from "@/data/communityData";

const VenangoCrawford = () => {
  const community = communityData.venangoCrawford;
  if (!community) return <div>Community data not found</div>;
  return <CommunityPage community={community} />;
};

export default VenangoCrawford;
