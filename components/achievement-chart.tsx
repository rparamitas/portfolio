"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    category: "accepted",
    value: 38,
    fill: "var(--color-accepted)",
    color: "hsl(var(--chart-1))",
  },
  {
    category: "decline",
    value: 8,
    fill: "var(--color-decline)",
    color: "hsl(var(--chart-2))",
  },
  {
    category: "development",
    value: 454,
    fill: "var(--color-development)",
    color: "hsl(var(--chart -3))",
  },
];

const chartConfig = {
  value: {
    label: "Total Development",
  },
  accepted: {
    label: "Accepted by Customers",
    color: "hsl(var(--chart-1))",
  },
  decline: {
    label: "Reject by Customers",
    color: "hsl(var(--chart-2))",
  },
  development: {
    label: "On development",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function AchievementChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Development
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="flex flex-row justify-center gap-x-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-x-2 md:flex-row"
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{`${item.category.charAt(0).toUpperCase()}${item.category.slice(1)}: ${item.value}`}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
