"use client";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { name: "Racks", Total: 30, fill: "#172554" },
  { name: "Storage", Total: 25, fill: "#1e40af" },
  { name: "Network Devices", Total: 26, fill: "#2563eb" },
  { name: "Cooling System", Total: 19, fill: "#2dabff" },
];

//   { name: "Cooling System", Total: 19, fill: "var(--color-cooling)" },
const chartConfig = {
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

const RegularPieChart = () => {
  return (
    <Card className="bg-dark-blue w-full h-[49%] relative">
      <h2 className="text-white font-bold absolute top-2 left-2 text-xs">Non IT Equipment</h2>
      <CardContent className="h-full flex items-center justify-between mt-2">
        <ChartContainer config={chartConfig} className="mx-4 aspect-square max-h-full w-[50%]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="Total" nameKey="name" />
          </PieChart>
        </ChartContainer>

        <div className="w-[40%]">
          {chartData.map((item) => (
            <div key={item.name} className="mb-4">
              <p className="text-text-gray flex items-center gap-1">
                <span className={`h-3 w-3 bg-[${item.fill}]`}></span>
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
