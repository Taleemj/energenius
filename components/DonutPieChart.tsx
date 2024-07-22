"use client";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";

const chartData = [
  { type: "IT Equipment", Total: 115, fill: "var(--color-IT)" },
  { type: "Non IT Equipment", Total: 100, fill: "var(--color-Non_IT)" },
];

const chartConfig = {
  Total: {
    label: "Total",
  },
  IT: {
    label: "IT Equipment",
    color: "#2dabff",
  },
  Non_IT: {
    label: "Non IT Equipment",
    color: "#102E41",
  },
} satisfies ChartConfig;

const DonutPieChart = () => {
  const totalEquipment = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.Total, 0);
  }, []);
  return (
    <Card className="bg-dark-blue w-full h-[49%] pl-4 pr-14">
      <CardContent className="h-full flex items-center justify-between">
        <ChartContainer config={chartConfig} className="mx-4 aspect-square max-h-full w-[50%]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="Total" nameKey="type" innerRadius={35}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 10} className="fill-muted-foreground">
                          Total
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 12} className="fill-foreground text-xl font-bold">
                          {totalEquipment.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div>
          <div className="mb-4">
            <h2 className="text-white font-bold">IT Equipment</h2>
            <p className="text-text-gray flex items-center gap-1">
              <span className="bg-[#2dabff] h-3 w-3"></span> {chartData[0].Total}
            </p>
          </div>
          <div>
            <h2 className="text-white font-bold">Non IT Equipment</h2>
            <p className="text-text-gray flex items-center gap-1">
              <span className="bg-[#102E41] h-3 w-3"></span> {chartData[1].Total}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonutPieChart;
