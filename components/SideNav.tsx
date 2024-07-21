"use client";
import { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "./ui/separator";
import { sideNavItems } from "@/data";
import NavLink from "./NavLink";

const SideNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  return (
    <NavigationMenu className="fixed top-0 left-0 z-30 w-[20vw] min-h-[100vh] z-2 bg-dark-blue pt-[80px]">
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
                <NavLink key={i} href={item.href} textColor="text-white" title={item.title} time={item.time} />
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
