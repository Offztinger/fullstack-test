import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CATEGORY } from "@/utils/handler";
import MetricCard from "@/components/shared/MetricCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const CategoryAverage = ({ data }) => {
  if (!data) return null;

  const formattedData = data.map(({ name, value }) => ({
    name: CATEGORY[name] || name,
    value,
  }));

  return (
    <MetricCard title="Tareas más recurrentes por categoría">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </MetricCard>
  );
};

export default CategoryAverage;
