import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobeShadow from "./GlobeShadow";

interface Props {
  title: string;
}

const Content: FC<Props> = ({ title }) => {
  return (
    <section className="md:ml-[22%] ml-0 mt-0 w-[78%] overflow-hidden h-full bg-red-500 z-5 flex items-start justify-between md:mt-[4%]">
      <GlobeShadow />
      <Tabs
        defaultValue="Activity"
        className="md:w-[24%] w-[95%] right-[10px] top-[60%] mx-auto absolute md:top-[30%] md:right-[30px]"
      >
        <TabsList className="w-full flex items-center justify-between bg-dark-blue">
          <TabsTrigger
            className="w-[45%] data-[state=active]:bg-button-blue data-[state=active]:text-bright-blue"
            value="Activity"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            className="w-[45%] data-[state=active]:bg-button-blue data-[state=active]:text-bright-blue"
            value="Drawings"
          >
            Drawings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Activity" className="w-full">
          <h2 className="font-bold text-white text-[1.2rem] my-[10px]">{title}</h2>
          <div className="w-full h-[260px] relative overflow-y-scroll pr-2 custom-scrollbar pl-2">
            <TabsInfo />
            <TabsInfo />
            <TabsInfo />
            <TabsInfo />
          </div>
        </TabsContent>
        <TabsContent value="Drawings" className="w-full">
          <h1>Drawings</h1>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Content;

const TabsInfo = () => {
  return (
    <p className="md:text-text-gray text-white mt-[5px] mb-[15px] text-[14px]">
      16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
      <span className="text-yellow-500">Warning cleared</span> m00106 Stat
    </p>
  );
};
