"use client";
import { FC, useEffect, useState } from "react";

import { TfiDownload } from "react-icons/tfi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  href: string;
  textColor: string;
  title: string;
  time: string;
  setSideNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setGlobeCenterCoOrdinates: React.Dispatch<React.SetStateAction<[number, number]>>;
  globeCenterCoOrdinates: [number, number];
}
const NavLink: FC<Props> = ({
  href,
  textColor,
  title,
  time,
  setSideNavVisible,
  globeCenterCoOrdinates,
  setGlobeCenterCoOrdinates,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [geoLocations, setGeoLocations] = useState<any>(null);

  const handleLinkClick = () => {
    window.innerWidth < 768 && setSideNavVisible(false);

    if (pathname === "/") {
      const found: boolean = geoLocations.some((d: any) => d.properties.name === title);
      if (found) {
        geoLocations.map((d: any) => {
          if (d.properties.name === title) {
            setGlobeCenterCoOrdinates([d.lng, d.lat]);
          }
        });
        setTimeout(() => {
          router.push(href);
        }, 700);
      } else {
        setGlobeCenterCoOrdinates([-99, 38]);
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    if (!geoLocations) {
      fetch("/maps/locations.geojson")
        .then((response) => response.json())
        .then((data) =>
          setGeoLocations(
            data.features.map((d: any) => ({
              lat: d.geometry.coordinates[1],
              lng: d.geometry.coordinates[0],
              size: 30,
              properties: {
                ...d.properties,
              },
            }))
          )
        );
    }
    setGlobeCenterCoOrdinates([-99, 38]);
  }, []);

  return (
    <div onClick={handleLinkClick} className="w-full flex items-start my-[6px] cursor-pointer">
      <TfiDownload className="mt-2" />
      <div className="ml-2">
        <h4 style={{ color: textColor }} className={`text-[14px]`}>
          {title}
        </h4>
        <p className="text-text-gray">{time}</p>
      </div>
    </div>
  );
};

export default NavLink;
