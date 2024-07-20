"use client";
import { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import { TfiDownload } from "react-icons/tfi";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "./ui/separator";
import Link from "next/link";

const SideNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sideNavItems: {
    title: string;
    time: string;
    color: string;
    href: string;
  }[] = [
    {
      title: "Global metrics",
      time: "19:52",
      color: "text-[#D9D9D9]",
      href: "/globalmetrics",
    },
    {
      title: "10 Chandler AZC",
      time: "19:52",
      color: "text-[#D9D9D9]",
      href: "#",
    },
    {
      title: "10 London GBR",
      time: "19:52",
      color: "text-[#D9D9D9]",
      href: "#",
    },
    {
      title: "NEW Jersey NJE",
      time: "19:52",
      color: "text-purple-700",
      href: "#",
    },
    {
      title: "10 Ohio OHS",
      time: "19:52",
      color: "text-purple-700",
      href: "#",
    },
    {
      title: "10 Phoenix AZP",
      time: "19:52",
      color: "text-red-500",
      href: "#",
    },
    {
      title: "10 Scottsoale AZS",
      time: "19:52",
      color: "text-purple-700",
      href: "#",
    },
    {
      title: "10 Singapore SGP",
      time: "19:52",
      color: "text-yellow-500",
      href: "#",
    },
  ];
  return (
    <NavigationMenu className="fixed top-0 left-0 z-0 w-[20vw] min-h-[100vh] z-2 bg-dark-blue pt-[80px]">
      <NavigationMenuList className="w-full h-full">
        <NavigationMenuItem className="w-full h-full">
          <NavigationMenuTrigger
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-[rgba(0,0,0,0)] w-full text-white flex items-center justify-start transition-all duration-300"
          >
            <TiLocation className="mr-2 text-[1.2rem]" /> <span>Locations</span>{" "}
            <span className="ml-auto text-[1rem]">
              <FaAngleDown className={`transition duration-200 ${isDropdownOpen && "rotate-180"}`} />
            </span>
          </NavigationMenuTrigger>
          {isDropdownOpen && (
            <ul className="flex items-center px-4 flex-col mt-7 py-4 border-t-[1.8px] w-full z-50 transition-all duration-200">
              {sideNavItems.map((item, i) => (
                <Link key={i} href={item.href} className="w-full flex items-start my-[6px] cursor-pointer">
                  <TfiDownload className="mt-2" />
                  <div className="ml-2">
                    <h4 className={`text-[14px] ${item.color}`}>{item.title}</h4>
                    <p className="text-text-gray">{item.time}</p>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
      <Separator className="mt-2" />
    </NavigationMenu>
  );
};

export default SideNav;
