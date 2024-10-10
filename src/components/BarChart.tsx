import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the Budget type
interface Budget {
  id: number;
  name: string;
  totalSpend: number;
  amount: number;
  icon: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expenses: any[]; // Modify this type if needed
}

interface BarChartDashboardProps {
  budgetList: Budget[]; // Type definition for budgetList
}

const BarChartDashboard: React.FC<BarChartDashboardProps> = ({ budgetList }) => {
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Display totalSpend and amount in a stacked bar chart */}
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
