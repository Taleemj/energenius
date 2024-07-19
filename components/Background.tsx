import Image from "next/image";
import worldmap from "@/assets/images/worldmpa.png";

const Background = () => {
  return (
    <div className="w-full z-[-1] h-screen fixed top-0 right-0">
      <Image src={worldmap} alt="worldmap" />
      <div className="w-full h-screen fixed top-0 right-0 bg-[#131c27f1]"></div>
    </div>
  );
};

export default Background;
