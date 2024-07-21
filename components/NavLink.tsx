import { FC } from "react";

import { TfiDownload } from "react-icons/tfi";
import Link from "next/link";

interface Props {
  href: string;
  textColor: string;
  title: string;
  time: string;
}
const NavLink: FC<Props> = ({ href, textColor, title, time }) => {
  return (
    <Link href={href} className="w-full flex items-start my-[6px] cursor-pointer">
      <TfiDownload className="mt-2" />
      <div className="ml-2">
        <h4 className={`text-[14px] ${textColor}`}>{title}</h4>
        <p className="text-text-gray">{time}</p>
      </div>
    </Link>
  );
};

export default NavLink;
