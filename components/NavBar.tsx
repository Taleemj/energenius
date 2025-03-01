"use client";
import { FC, useState, useEffect } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";

interface Props {
  showWarningAlerts: boolean;
  sideNavVisible?: boolean;
  setSideNavVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: FC<Props> = ({ showWarningAlerts, setSideNavVisible, sideNavVisible }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [hours, setHours] = useState<string>(String(new Date().getHours()));
  const [time, setTime] = useState<string>(String(new Date().getMinutes()));

  useEffect(() => {
    setInterval(() => {
      setHours(String(new Date().getHours()));
      setTime(String(new Date().getMinutes()));
    }, 1000);
  }, []);

  const toogleLocales = () => {
    const newUrl = pathname.replace(`/${params.lang}`, `/${params.lang === "en-US" ? "zh" : "en-US"}`);
    router.push(newUrl);
  };

  return (
    <div className="w-full z-40 fixed top-0 text-white bg-dark-blue py-3 px-2 md:py-4 md:px-6 flex items-center justify-between border-b-[1px] border-dark-gray">
      <Link href="/">
        <div className="flex items-center">
          <div className="w-6 h-6 mr-2 rounded-full bg-bright-blue flex items-center justify-center text-dark-blue">
            <BsLightningChargeFill />
          </div>
          <h1 className="text-[1.1rem] md:text-[1.3rem] font-bold">Energenuis</h1>
        </div>
      </Link>

      <h2 className="max-w-[32%] text-[1rem] md:text-[1.3rem] font-bold">
        {hours.length == 1 ? `0${hours}` : hours}:{time.length == 1 ? `0${time}` : time}{" "}
        <span className="text-text-gray font-normal">
          {String(new Date().toLocaleTimeString("en-us", { timeZoneName: "short" }).split(" ")[2])}
        </span>
      </h2>
      <div className="flex items-center justify-between">
        <Toggle
          onClick={toogleLocales}
          className="text-[0.8rem] cursor-pointer bg-button-blue py-0 px-1 md:py-1 md:px-4 rounded-[3px] mr-[15px] md:mr-[20px] text-bright-blue"
        >
          {params.lang === "en-US" ? "zh" : "en-US"}
        </Toggle>
        <Button className="text-[1rem] cursor-pointer bg-button-blue py-0 px-2 md:py-1 md:px-4 rounded-[3px] mr-[15px] md:mr-[20px] text-bright-blue">
          Health
        </Button>
        <FiMenu
          className="text-[2rem] cursor-pointer"
          onClick={() => setSideNavVisible && setSideNavVisible(!sideNavVisible)}
        />
      </div>

      {showWarningAlerts && (
        <div className="absolute top-[calc(100%+2px)] min-w-[58%] md:min-w-[15%] left-1/2 transform border-b-[2px] border-x-[2px] border-bright-blue -translate-x-1/2 flex items-center justify-center space-x-4 bg-dark-blue py-1 px-2 md:py-2 md:px-4 rounded-md shadow-lg">
          <h3 className="text-white">0 Alerts</h3>
          <div className="w-px h-6 bg-gray-500"></div>
          <h3 className="text-yellow-500">5 Warnings</h3>
        </div>
      )}
    </div>
  );
};

export default NavBar;
