import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,} from "@/components/ui/chart"
import { DashboardChartProps } from "@/types/customer/dashboard"

export const description = "A donut chart with text"

export default function DashboardCategoryChart({ categories }: DashboardChartProps) {
	const chartData = categories.map((item, index) => ({
		category: item.category,
		amount: parseFloat(item.amount),
		fill: `var(--color-${item.category.toLowerCase()})`,
	}));

	const chartConfig = categories.reduce((config, item, index) => {
		const key = item.category.toLowerCase();
		return {
			...config,
			[key]: {
				label: item.category,
				color: `var(--chart-${index + 1})`,
		},
		};
	}, {
			amount: {
			label: "Amount",
		},
	} as ChartConfig);

	const totalAmount = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.amount, 0)
	}, [])

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Expenses by Category</CardTitle>
				<CardDescription>This Month</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
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
							dataKey="amount"
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
											₱ {totalAmount.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Total Spent
										</tspan>
									</text>
									)
								}
							}}
						/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 leading-none font-medium">
					Expenses increased by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">
					Compared to last month
				</div>
			</CardFooter>
		</Card>
	)
}
