import { useSession } from "next-auth/react";

import { Skeleton } from "@mui/material";
import PremiumSearchSection from "./PremiumSearchSection";
import BasicSearchSection from "./BasicSearchSection";

const SearchSection = (props) => {
  const { data: session, status } = useSession();

   if (status === "loading") {
    // Using Material UI Skeleton to simulate the search bar while loading
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4 sm:mb-6 w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] mx-auto">
          <Skeleton
            variant="rectangular"
            height={45}
            sx={{ borderRadius: '9999px' }}
          />
        </div>
      </div>
    );
  }

  // Render premium (debounced) search for admin or premium users
  if (session && (session.user.role === "admin" || session.user.role === "premium")) {
    return <PremiumSearchSection {...props} />;
  }

  // Fallback to basic search for all other users
  return <BasicSearchSection {...props} />;
};

export default SearchSection;
