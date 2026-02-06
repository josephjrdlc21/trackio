import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
	{ category: "Food", amount: 5200, fill: "var(--color-food)" },
	{ category: "Salary", amount: 30000, fill: "var(--color-salary)" },
	{ category: "Transportation", amount: 2500, fill: "var(--color-transport)" },
	{ category: "Rent", amount: 8000, fill: "var(--color-rent)" },
	{ category: "Others", amount: 1200, fill: "var(--color-others)" },
]

const chartConfig = {
	amount: {
		label: "Amount",
	},
	food: {
		label: "Food",
		color: "var(--chart-1)",
	},
	salary: {
		label: "Salary",
		color: "var(--chart-2)",
	},
	transport: {
		label: "Transportation",
		color: "var(--chart-3)",
	},
	rent: {
		label: "Rent",
		color: "var(--chart-4)",
	},
	others: {
		label: "Others",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig

export default function DashboardCategoryChart() {
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
