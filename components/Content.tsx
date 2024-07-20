"use client";
import { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Content = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (globeRef.current) {
      const globe = Globe()(globeRef.current)
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .width(600)
        .height(600)
        .atmosphereAltitude(0.35)
        .backgroundColor("rgba(19,28,39,0)");
    }
  }, []);

  return (
    <section className="ml-[22%] w-[78%] flex items-start justify-between mt-[4%]">
      <div className="ml-[9%]">
        <div ref={globeRef}></div>
      </div>

      <div className="absolute top-[53%] left-[40%] w-[300px] h-[300px] z-10 bg-dark-blue rounded-full flat-circle shadow-lg"></div>
      <div className="absolute top-[46%] left-[37%] w-[400px] h-[400px] border-4 z-10 border-blue-500 rounded-full flat-circle shadow-lg"></div>
      <div className="absolute top-[39%] left-[33%] w-[500px] h-[500px] bg-[#204879] rounded-full flat-circle shadow-lg"></div>

      <Tabs defaultValue="Activity" className="w-[30%] mt-[15%] mr-[40px]">
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
          <h2 className="font-bold text-white text-[1.2rem] my-[10px]">10 Singapore</h2>
          <div className="w-full h-[260px] relative overflow-y-scroll pr-2 custom-scrollbar pl-2">
            <p className="text-text-gray mt-[5px] mb-[15px] text-[14px]">
              16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
              <span className="text-yellow-500">Warning cleared</span> m00106 Stat
            </p>
            <p className="text-text-gray mt-[5px] mb-[15px] text-[14px]">
              16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
              <span className="text-yellow-500">Warning cleared</span> m00106 Stat
            </p>
            <p className="text-text-gray mt-[5px] mb-[15px] text-[14px]">
              16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
              <span className="text-yellow-500">Warning cleared</span> m00106 Stat
            </p>
            <p className="text-text-gray mt-[5px] mb-[15px] text-[14px]">
              16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
              <span className="text-yellow-500">Warning cleared</span> m00106 Stat
            </p>
            <p className="text-text-gray mt-[5px] mb-[15px] text-[14px]">
              16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
              <span className="text-yellow-500">Warning cleared</span> m00106 Stat
            </p>
            <p className="text-text-gray mt-[5px] mb-[15px] text-[14px]">
              16/5 08:29:57 <span className="text-bright-blue">SGP S02 DO1</span> [ARB control system]{" "}
              <span className="text-yellow-500">Warning cleared</span> m00106 Stat
            </p>
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
