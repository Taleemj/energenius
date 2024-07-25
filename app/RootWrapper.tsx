"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import SideNav from "@/components/SideNav";
import Background from "@/components/Background";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const WorldGlobe = dynamic(() => import("@/components/Globe"), { ssr: false });

function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const [globeCenterCoOrdinates, setGlobeCenterCoOrdinates] = useState<[number, number]>([-99, 38]);

  const isDataCenterDetails =
    pathname.includes("/data-center-details/") || pathname.includes("/building-data/") ? true : false;

  useEffect(() => {
    console.log("pathname", pathname);
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) setSideNavVisible(true);
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 768) setSideNavVisible(true);
      });
    };
  }, []);

  return (
    <>
      {!isDataCenterDetails && (
        <>
          <NavBar showWarningAlerts={true} setSideNavVisible={setSideNavVisible} sideNavVisible={sideNavVisible} />
          <SideNav
            globeCenterCoOrdinates={globeCenterCoOrdinates}
            setGlobeCenterCoOrdinates={setGlobeCenterCoOrdinates}
            setSideNavVisible={setSideNavVisible}
            sideNavVisible={sideNavVisible}
          />
          <WorldGlobe centerCoordinates={globeCenterCoOrdinates} setCenterCoordinates={setGlobeCenterCoOrdinates} />
        </>
      )}
      {children}
    </>
  );
}

export default RootWrapper;
