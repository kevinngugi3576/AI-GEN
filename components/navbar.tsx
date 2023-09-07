"use client";
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { getAPiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// eslint-disable-next-line @next/next/no-async-client-component
const Navbar = async () => {
  const apiLimitCount = await  getAPiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar 
      isPro={isPro}
      apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}; 
export default Navbar;
