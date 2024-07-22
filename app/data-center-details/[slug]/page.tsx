import Background from "@/components/Background";
import { BsLightningChargeFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import DonutPieChart from "@/components/DonutPieChart";
import RegularPieChart from "@/components/RegularPieChart";

const Page = () => {
  return (
    <div className="mt-[6.5%]">
      <div className="w-full flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold text-white mb-1">Data Center 1</h1>
        <p className="text-text-gray flex items-center gap-4">
          <span>No. of Servers</span>
          <span>PUE: 5300KW</span>
        </p>
        <div className="flex items-center text-[1rem] gap-1 bg-button-blue py-3 px-3 mt-[8px] rounded-[3px] mr-[20px] text-bright-blue">
          <BsLightningChargeFill /> <p>Total Energy Consumption: 5300KW</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 w-[85vw] h-[55vh] mx-auto">
        <div className="w-[49.5%] h-full flex items-center justify-between flex-col">
          <DonutPieChart />
          <RegularPieChart />
        </div>
        <Card className="bg-dark-blue w-[49.5%] h-full">
          <CardContent>
            <p>infomation</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between w-[75vw] mx-auto my-5">
        <BottomText amount="5000KW" text="Bugdeted Power Usage" color="text-white" />
        <BottomText amount="4600KW" text="Acutal Power Usage" color="text-green-600" />
        <Separator orientation="vertical" className="w-[5px] bg-slate-600 rounded-sm h-[60px]" />
        <BottomText amount="$3,600" text="Bugdeted power cost" color="text-white" />
        <BottomText amount="$4,160" text="Actual power cost" color="text-red-600" />
      </div>

      <Background />
    </div>
  );
};

export default Page;

const BottomText = ({ amount, text, color }: { amount: string; text: string; color: string }) => {
  return (
    <div className="w-[20%]">
      <h1 className={`${color} text-3xl font-bold`}>{amount}</h1>
      <p>{text}</p>
    </div>
  );
};
