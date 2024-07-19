import { TiLocation } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import { TfiDownload } from "react-icons/tfi";

const SideNav = () => {
  const sideNavItems: {
    title: string;
    time: string;
    color: string;
  }[] = [
    {
      title: "Global metrics",
      time: "19:52",
      color: "text-[#D9D9D9]",
    },
    {
      title: "10 Chandler AZC",
      time: "19:52",
      color: "text-[#D9D9D9]",
    },
    {
      title: "10 London GBR",
      time: "19:52",
      color: "text-[#D9D9D9]",
    },
    {
      title: "NEW Jersey NJE",
      time: "19:52",
      color: "text-purple-700",
    },
    {
      title: "10 Ohio OHS",
      time: "19:52",
      color: "text-purple-700",
    },
    {
      title: "10 Phoenix AZP",
      time: "19:52",
      color: "text-red-500",
    },
    {
      title: "10 Scottsoale AZS",
      time: "19:52",
      color: "text-purple-700",
    },
    {
      title: "10 Singapore SGP",
      time: "19:52",
      color: "text-yellow-500",
    },
  ];
  return (
    <div className="fixed top-0 left-0 z-0 w-[20vw] min-h-[100vh] z-2 bg-dark-blue pt-[100px] text-white">
      <div className="flex items-center text-[1.3rem] px-6 cursor-pointer">
        <TiLocation /> <h2 className="text-[1rem] ml-2">Locations</h2> <FaAngleDown className="ml-auto" />
      </div>

      <div className="flex items-center flex-col mt-7 py-4 border-t-[1.8px] border-b-[1.8px] px-6 border-dark-gray">
        {sideNavItems.map((item) => (
          <div className="w-full flex items-start my-[5px]">
            <TfiDownload className="mt-2" />
            <div className="ml-2">
              <h4 className={`text-[14px] ${item.color}`}>{item.title}</h4>
              <p className="text-text-gray">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
