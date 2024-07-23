"use client";
import { useState, FC, useEffect } from "react";
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

interface Props {
  setSideNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sideNavVisible: boolean;
}

const SideNav: FC<Props> = ({ setSideNavVisible, sideNavVisible }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [leftstyleOnNavOpen, setLeftStyleOnNavOpen] = useState("left-0");

  const closeSideNavMobile = () => {
    if (window.innerWidth < 768) setSideNavVisible(false);
  };

  useEffect(() => {
    window.addEventListener("resize", closeSideNavMobile);
    return () => {
      window.removeEventListener("resize", closeSideNavMobile);
    };
  }, []);

  return (
    <NavigationMenu
      className={`fixed top-0 ${
        sideNavVisible ? "left-0" : "left-[-100%]"
      }  w-[100vw] z-[99] md:w-[20vw] min-h-[100vh] z-2 bg-dark-blue pt-[80px] transition-all duration-300`}
    >
      <NavigationMenuList className="w-full h-full">
        <NavigationMenuItem className="w-full h-full pt-10">
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
                <NavLink
                  setSideNavVisible={setSideNavVisible}
                  key={i}
                  href={item.href}
                  textColor={item.color}
                  title={item.title}
                  time={item.time}
                />
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
