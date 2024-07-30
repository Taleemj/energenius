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
import { useEffect, useRef, useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { FaArrowLeft } from "react-icons/fa";
import { DatePicker, Select as AntSelect, Divider, Input } from "antd";
import type { InputRef } from "antd";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [apiData, setApiData] = useState<any>(null);

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
        <p className="text-text-gray flex items-center justify-center gap-x-3 gap-y-1 mt-[10px] flex-wrap w-[40%]">
          <span>Total Energy consumption:153KW</span>
          <span>No. of floors:28</span>
          <span>No. of HVAC:22</span>
          <span>PPD Levels:3.7%</span>
          <span>CO2 PPM: 453</span>
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
        <PowerUsageEffectiveness apiData={apiData} setApiData={setApiData} />
      </div>

      <Card className="flex items-center relative justify-around w-[85vw] py-9 mx-auto my-2 bg-dark-blue border">
        <h1 className="text-[18px] absolute top-[5px] font-bold left-1/2 transform -translate-x-1/2 text-white">
          Energy Costs Comparision
        </h1>
        {apiData !== null && (
          <>
            <BottomText
              amount={apiData?.energyConsumption[0][0].toFixed(2) + `(${apiData?.energyConsumption[0][1].toFixed(2)})`}
              text="Bugdeted Power Usage"
              color="text-white"
            />
            <BottomText
              amount={apiData?.energyConsumption[1][0].toFixed(2) + `(${apiData?.energyConsumption[1][1].toFixed(2)})`}
              text="Acutal Power Usage"
              color={
                apiData?.energyConsumption[0][1] > apiData?.energyConsumption[0][0] ? "text-red-600" : "text-green-600"
              }
            />
            <BottomText
              amount={"$" + apiData?.energyConsumption[0][0].toFixed(2) * 1}
              text="Bugdeted power cost"
              color="text-white"
            />
            <BottomText
              amount={"$" + apiData?.energyConsumption[1][0].toFixed(2)}
              text="Actual power cost"
              color={
                apiData?.energyConsumption[0][1] > apiData?.energyConsumption[0][0] ? "text-red-600" : "text-green-600"
              }
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default Page;

const PowerUsageEffectiveness = ({ apiData, setApiData }: { apiData: any; setApiData: any }) => {
  const [dateValue, setDateValue] = useState<string | string[]>("2022-06-01 14:00");
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
  const [selectOptions, setSelectOptions] = useState([
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
  ]);
  const [numberOfDays, setNumberOfDays] = useState("");
  const [dropDownPeriodValue, setDropDownPeriodValue] = useState("1");
  const [initalRender, setInitailRender] = useState(true);
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfDays(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (numberOfDays.length > 0) {
      setSelectOptions([
        ...selectOptions,
        {
          label: `${numberOfDays} days`,
          value: `${numberOfDays} days`,
        },
      ]);
      setNumberOfDays("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      alert;
    }
  };

  const getActivePeriodValues = async () => {
    const params = new URLSearchParams({
      datetime: `${dateValue}:00`,
      period: dropDownPeriodValue,
    });
    const data = await axios.get(`https://energenius-be.vercel.app/getValues?${params.toString()}`);
    setApiData(data.data);
  };

  useEffect(() => {
    setInitailRender(false);
    if (dateValue.length > 0 && initalRender !== true) {
      getActivePeriodValues();
    }
  }, [dateValue, dropDownPeriodValue]);

  return (
    <Card className="bg-dark-blue w-[49.5%] h-full pt-5 pl-1">
      <CardContent>
        <h1 className="text-xl text-white mb-2 font-bold">Active period between 1 st June - 31th August 2022</h1>
        <div className="w-full flex items-center justify-between">
          <DatePicker
            showTime
            showSecond={false}
            renderExtraFooter={() => (
              <div className="flex items-center justify-end gap-10 pr-2 font-bold">
                <span>H</span> <span>M</span>
              </div>
            )}
            minuteStep={15}
            onChange={(value, dateString) => {
              setDateValue(dateString);
            }}
            placeholder="Select date"
            minDate={
              dropDownPeriodValue == "7"
                ? dayjs("2022-06-01", "YYYY-MM-DD").add(7, "day")
                : dayjs("2022-06-01", "YYYY-MM-DD")
            }
            maxDate={dayjs("2022-08-31", "YYYY-MM-DD")}
            className="w-[60%] bg-dark-blue border-[1px] border-border py-1 text-white hover:text-black"
          />
          <AntSelect
            options={selectOptions}
            defaultValue={"select period"}
            onChange={(value) => {
              if (value === "daily") {
                setDropDownPeriodValue("1");
              } else if (value === "weekly") {
                setDropDownPeriodValue("7");
              } else {
                setDropDownPeriodValue(value.split(" ")[0]);
              }
            }}
            placeholder="Select period"
            className="w-[35%] bg-dark-blue border-[1px] border-border antSelect"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className="my-[8px]" />
                <div className="flex items-center justify-center flex-col">
                  <Input
                    placeholder="Please enter days (5)"
                    ref={inputRef}
                    value={numberOfDays}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button onClick={addItem} className="w-full bg-button-blue rounded-sm text-bright-blue py-1 mt-2">
                    Add
                  </Button>
                </div>
              </>
            )}
          />
        </div>
        {apiData !== null && (
          <>
            <div className="flex items-end justify-between my-4">
              <div className="w-[28%] h-full flex flex-col gap-1 text-[14px]">
                <h2>Energy consumption(W)</h2>
                <h2>PPD Level(%)</h2>
                <h2>CO2(PPM)</h2>
              </div>
              <div className="w-[70%]">
                <div className="flex items-center text-[14px] justify-between">
                  <h2 className="w-[33%]">Baseline</h2>
                  <h2 className="w-[33%]">RL</h2>
                  <h2 className="w-[33%]">Efficient Rate</h2>
                </div>
                <div>
                  <ActivePeriodUsageValues
                    baseline={String((apiData?.baseline[0] * 1000).toFixed(2))}
                    rl={String((apiData?.RL[0] * 1000).toFixed(2))}
                    efficient={apiData?.rate[0].toFixed(2)}
                  />
                  <ActivePeriodUsageValues
                    baseline={apiData?.baseline[1].toFixed(2)}
                    rl={apiData?.RL[1].toFixed(2)}
                    efficient={apiData?.rate[1].toFixed(2)}
                  />
                  <ActivePeriodUsageValues
                    baseline={apiData?.baseline[2].toFixed(2)}
                    rl={apiData?.RL[2].toFixed(2)}
                    efficient={apiData?.rate[2].toFixed(2)}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-[16px] text-white mb-2 bg-[#1a2736] px-4 py-1 mt-4 w-[80%] mx-auto text-center">
              {dateValue.includes("2022-06-01")
                ? //@ts-ignore
                  `${dateValue} - ${dayjs(dateValue).add(Number(dropDownPeriodValue), "day").format("YYYY-MM-DD")}`
                : // @ts-ignore
                  `${dayjs(dateValue).subtract(Number(dropDownPeriodValue), "day").format("YYYY-MM-DD")} ${
                    // @ts-ignore
                    dateValue.split(" ")[1]
                  } - ${dateValue}`}
            </h1>
          </>
        )}

        <h1 className="text-xl text-white mb-2 font-bold mt-6">Alerts</h1>
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

const ActivePeriodUsageValues = ({ baseline, rl, efficient }: { baseline: string; rl: string; efficient: string }) => {
  return (
    <div className="flex items-center text-text-gray gap-1 justify-between">
      <h2 className="w-[33%]">{baseline}</h2>
      <h2 className="w-[33%]">{rl}</h2>
      <h2 className="w-[33%]">{efficient}</h2>
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
