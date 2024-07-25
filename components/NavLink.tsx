"use client";
import { FC } from "react";

import { TfiDownload } from "react-icons/tfi";
import Link from "next/link";

interface Props {
  href: string;
  textColor: string;
  title: string;
  time: string;
  setSideNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavLink: FC<Props> = ({ href, textColor, title, time, setSideNavVisible }) => {
  return (
    <Link
      href={href}
      onClick={() => window.innerWidth < 768 && setSideNavVisible(false)}
      className="w-full flex items-start my-[6px] cursor-pointer"
    >
      <TfiDownload className="mt-2" />
      <div className="ml-2">
        <h4 style={{ color: textColor }} className={`text-[14px]`}>
          {title}
        </h4>
        <p className="text-text-gray">{time}</p>
      </div>
    </Link>
  );
};

export default NavLink;
