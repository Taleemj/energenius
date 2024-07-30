"use client";
import { useState, FC, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import dayjs from "dayjs";

interface Props {
  title: string;
  currentDateTime: string | string[];
}

const LineChart: FC<Props> = ({ title, currentDateTime }) => {
  const [lineGraphData, setLineGraphData] = useState<any[]>([
    { values: "", baseline: 186, rl: 80 },
    { values: "", baseline: 305, rl: 200 },
    { values: "", baseline: 237, rl: 120 },
    { values: "", baseline: 73, rl: 190 },
    { values: "", baseline: 209, rl: 130 },
    { values: "", baseline: 214, rl: 140 },
    { values: "", baseline: 214, rl: 140 },
    { values: "", baseline: 214, rl: 140 },
    { values: "", baseline: 214, rl: 140 },
    { values: "", baseline: 214, rl: 140 },
    { values: "", baseline: 214, rl: 140 },
    { values: "", baseline: 214, rl: 140 },
  ]);
  const [hours, setHours] = useState<number[]>([]);
  const [startHour, setStartHour] = useState(Number(String(currentDateTime).split(" ")[1].split(":")[0]));

  useEffect(() => {
    setStartHour(Number(String(currentDateTime).split(" ")[1].split(":")[0]));
    const generate12HourClockNumbers = (startHour: any) => {
      const hoursArr = [];
      for (let i = 0; i < 12; i++) {
        hoursArr.push((startHour + i * 2) % 24);
      }
      return hoursArr;
    };

    const updatedHours = generate12HourClockNumbers(startHour);
    setHours(updatedHours);
    const updatedChartData = lineGraphData.map((item, index) => ({
      ...item,
      values:
        String(updatedHours[index % 12]).length === 1
          ? `0${updatedHours[index % 12]}`
          : String(updatedHours[index % 12]),
    }));

    setLineGraphData(updatedChartData);
  }, [currentDateTime, startHour]);

  const chartConfig = {
    baseline: {
      label: "BaseLine",
      color: "hsl(var(--chart-1))",
    },
    rl: {
      label: "RL",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-transparent mt-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={lineGraphData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="values"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="rl"
              type="natural"
              fill="var(--color-rl)"
              fillOpacity={0.4}
              stroke="var(--color-rl)"
              stackId="a"
            />
            <Area
              dataKey="baseline"
              type="natural"
              fill="var(--color-baseline)"
              fillOpacity={0.4}
              stroke="var(--color-baseline)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              ...
            </div> */}
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {String(dayjs(`${currentDateTime}`).subtract(1, "day").format("YYYY-MM-DD"))}{" "}
              {String(currentDateTime).split(" ")[1]} - {String(currentDateTime)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineChart;
