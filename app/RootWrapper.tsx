"use client";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";
import Background from "@/components/Background";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const WorldGlobe = dynamic(() => import("@/components/Globe"), { ssr: false });

function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDataCenterDetails = pathname.startsWith("/data-center-details");

  return (
    <>
      {!isDataCenterDetails && (
        <>
          <NavBar showWarningAlerts={true} />
          <SideNav />
          <Background />
          <WorldGlobe />
        </>
      )}
      {children}
    </>
  );
}

export default RootWrapper;
