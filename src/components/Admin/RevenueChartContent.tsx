"use client";

import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface RevenueChartContentProps {
	monthlyRevenue: { name: string; total: number }[];
}

export default function RevenueChartContent({
	monthlyRevenue,
}: RevenueChartContentProps) {
	return (
		<ResponsiveContainer width="100%" height={370}>
			<LineChart
				data={monthlyRevenue}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>
				<Tooltip formatter={(value: number) => [`$${value}`, "Revenue"]} />
				<Line
					type="monotone"
					dataKey="total"
					stroke="#8884d8"
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
