"use client";
import { FC } from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

//   { name: "Cooling System", Total: 19, fill: "var(--color-cooling)" },

interface Props {
  ChartConfig: ChartConfig;
  chartData: { name: string; Total: number; fill: string }[];
  title: string;
}

const RegularPieChart: FC<Props> = ({ ChartConfig, chartData, title }) => {
  return (
    <Card className="bg-dark-blue w-full h-[49%] relative">
      <h2 className="text-white font-bold absolute top-2 left-3 text-xs">{title}</h2>
      <CardContent className="h-full flex items-center justify-start gap-4 mt-2">
        <ChartContainer config={ChartConfig} className="ml-3 aspect-square max-h-full w-[50%]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="Total" nameKey="name" />
          </PieChart>
        </ChartContainer>

        <div>
          {chartData.map((item) => (
            <div key={item.name} className="mb-2">
              <p className="text-text-gray flex items-center justify-start gap-1">
                <span style={{ backgroundColor: item.fill }} className={`h-3 w-3 rounded-full`}></span>
                {item.name}:{item.Total}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegularPieChart;
