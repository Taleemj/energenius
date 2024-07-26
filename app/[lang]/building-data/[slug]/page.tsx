"use client";
import { Card, CardContent } from "@/components/ui/card";
import DonutPieChart from "@/components/DonutPieChart";
import RegularPieChart from "@/components/RegularPieChart";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartConfig } from "@/components/ui/chart";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Page = () => {
  const params = useParams();

  const router = useRouter();

  const NonHVAC = {
    Total: {
      label: "Total",
    },
    racks: {
      label: "Racks",
      color: "#172554",
    },
    storage: {
      label: "Storage",
      color: "#1e40af",
    },
    network_devices: {
      label: "Network Devices",
      color: "#2563eb",
    },
    cooling: {
      label: "cooling",
      color: "#2dabff",
    },
  } satisfies ChartConfig;

  const regularChartData = [
    { name: "Lighting", Total: 19, fill: "#4682b4" },
    { name: "Storage", Total: 30, fill: "#1e90ff" },
    { name: "Elevators", Total: 25, fill: "#87ceeb" },
    { name: "Other Electrical Appliances", Total: 25, fill: "#87cefa" },
    { name: "Building Envelope", Total: 5, fill: "#add8e6" },
  ];

  const pieChartConfig = {
    Total: {
      label: "Total",
    },
    HVAC: {
      label: "HVACE",
      color: "#2dabff",
    },
    Non_HVAC: {
      label: "Non HVACE",
      color: "#102E41",
    },
  } satisfies ChartConfig;

  const pieChartData = [
    { type: "HVAC", Total: 45, fill: "var(--color-HVAC)" },
    { type: "Non-HVAC", Total: 55, fill: "var(--color-Non_HVAC)" },
  ];

  return (
    <div className="mt-[6.5%] relative">
      <div
        onClick={() => router.push(`/${params.lang}`)}
        className="absolute top-0 left-[3%] cursor-pointer text-text-gray hover:text-white transition-all duration-300"
      >
        <FaArrowLeft className=" text-[22px]" />
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold text-white mb-1">Building {params.slug}</h1>
        <p className="text-text-gray flex items-center gap-x-3 gap-y-1 mt-[10px] flex-wrap w-[40%]">
          <span>Total Energy consumption:3000KW</span>
          <span>No. of floors:28</span>
          <span>No. of HVAC:22</span>
          <span>PPD Levels:40%</span>
          <span>CO2 Emissions:280 tons</span>
          <span>CO2 Emissions:280 tons</span>
        </p>
        <Select
          defaultValue="All Floors"
          onValueChange={(v) => {
            if (v === "All Floors") {
              router.push(`/${params.lang}/building-data/${params.slug}`);
            } else {
              router.push(`/${params.lang}/building-data/${params.slug}/floor/${v.split(" ")[1]}`);
            }
          }}
        >
          <SelectTrigger className="w-[20%] bg-button-blue text-bright-blue mt-1">
            <SelectValue defaultValue={"All Floors"} placeholder="All Floors" defaultChecked />
          </SelectTrigger>
          <SelectContent className="bg-dark-blue border-2 border-bright-blue">
            <SelectGroup className=" bg-dark-blue">
              <SelectLabel>Floors</SelectLabel>
              <SelectItem value="All Floors">All Floors</SelectItem>
              <SelectItem value="Floor 1">Floor 1</SelectItem>
              <SelectItem value="Floor 2">Floor 2</SelectItem>
              <SelectItem value="Floor 3">Floor 3</SelectItem>
              <SelectItem value="Floor 4">Floor 4</SelectItem>
              <SelectItem value="Floor 5">Floor 5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between mt-5 w-[85vw] h-[60vh] mx-auto">
        <div className="w-[49.5%] h-full flex items-center justify-between flex-col">
          <DonutPieChart
            ChartConfig={pieChartConfig}
            chartData={pieChartData}
            title="Energy Consumption Breakdown (%)"
          />
          <RegularPieChart ChartConfig={NonHVAC} chartData={regularChartData} title="Non-HVAC Energy Breakdown (%)" />
        </div>
        <PowerUsageEffectiveness />
      </div>

      <Card className="flex items-center relative justify-around w-[85vw] py-9 mx-auto my-2 bg-dark-blue border">
        <h1 className="text-[18px] absolute top-[5px] font-bold left-1/2 transform -translate-x-1/2 text-white">
          Energy Costs Comparision
        </h1>
        <BottomText amount="5000KW" text="Bugdeted Power Usage" color="text-white" />
        <BottomText amount="4600KW" text="Acutal Power Usage" color="text-green-600" />
        <BottomText amount="$3,600" text="Bugdeted power cost" color="text-white" />
        <BottomText amount="$4,160" text="Actual power cost" color="text-red-600" />
      </Card>
    </div>
  );
};

export default Page;

const PowerUsageEffectiveness = () => {
  const data: {
    text: string;
    value: string;
    type: string;
  }[] = [
    {
      text: "Energy Efficiency Ratio (EER)",
      value: "12",
      type: "metric",
    },
    {
      text: "Seasonal Energy Efficiency Ratio (SEER)",
      value: "12",
      type: "metric",
    },
    {
      text: "Under-performing Units",
      value: "12",
      type: "metric",
    },
    {
      text: "Maintenance Alerts",
      value: "12",
      type: "metric",
    },
    {
      text: "List of units needed maintenance",
      value: "25",
      type: "alert",
    },
  ];
  return (
    <Card className="bg-dark-blue w-[49.5%] h-full pt-5 pl-1">
      <CardContent>
        <h1 className="text-[16px] text-white mb-2 font-bold">HVAC Efficiency Metrics</h1>
        {data
          .filter((item) => item.type === "metric")
          .map((item) => (
            <PowerUsageCards key={item.text} text={item.text} value={item.value} />
          ))}

        <h1 className="text-xl text-white mb-2 font-bold mt-4">Alerts</h1>
        {data
          .filter((item) => item.type === "alert")
          .map((item) => (
            <PowerUsageCards key={item.text} text={item.text} value={item.value} />
          ))}
      </CardContent>
    </Card>
  );
};

const PowerUsageCards = ({ text, value }: { text: string; value: string }) => {
  return (
    <div className="flex items-center justify-between w-full text-[#8e9092] mb-2">
      <p className="w-[86%] bg-[#1a2736] px-4 py-2 text-sm">{text}</p>
      <p className="w-[12%] bg-[#1a2736] px-4 py-2 text-sm">{value}</p>
    </div>
  );
};

const BottomText = ({ amount, text, color }: { amount: string; text: string; color: string }) => {
  return (
    <div className="w-[20%] text-center">
      <h1 className={`${color} text-3xl font-bold`}>{amount}</h1>
      <p>{text}</p>
    </div>
  );
};
