"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GraphDataItem {
  name: string;
  total: number;
}

interface OverviewChartProps {
  data: GraphDataItem[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: string) => value.toUpperCase()}
        />
        <YAxis
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `€${value}`}
        />
        <Tooltip
          cursor={{ fill: "#F9F9F9" }}
          contentStyle={{
            borderRadius: "0px",
            border: "1px solid #EEE",
            fontSize: "10px",
            textTransform: "uppercase",
          }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          className="fill-black"
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
