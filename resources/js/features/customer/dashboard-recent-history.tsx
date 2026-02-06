import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHistoryProps } from "@/types/customer/dashboard"
import { dateTime, moneyFormat } from "@/lib/utils"

export default function DashboardRecentHistory({ recent_expenses, recent_incomes }: DashboardHistoryProps) {
    const expenses = Array.isArray(recent_expenses) ? recent_expenses : recent_expenses? [recent_expenses] : []
    const incomes = Array.isArray(recent_incomes) ? recent_incomes : recent_incomes ? [recent_incomes] : []

    return (
        <Card>
            <CardHeader className="items-center pb-0">
				<CardTitle>Recent Transactions</CardTitle>
				<CardDescription>This Month</CardDescription>
			</CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-t">
                                <TableHead className="min-w-[200px] pl-4"><b>Expense</b></TableHead>
                                <TableHead className="min-w-[150px] text-right"><b>Amount</b></TableHead>
                                <TableHead className="min-w-[200px] pr-4"><b>Date</b></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={3} className="text-center py-5">no expenses transaction</TableCell>
                                </TableRow>
                            ) : (
                                expenses.map((expense) => (
                                    <TableRow key={expense.id}>
                                        <TableCell>{expense.category.name}</TableCell>
                                        <TableCell className="text-right">₱ {moneyFormat(expense.amount)}</TableCell>
                                        <TableCell>{dateTime(expense.created_at)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <Table className="mt-5">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-t">
                                <TableHead className="min-w-[200px] pl-4"><b>Income</b></TableHead>
                                <TableHead className="min-w-[150px] text-right"><b>Amount</b></TableHead>
                                <TableHead className="min-w-[200px] pr-4"><b>Date</b></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {incomes.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={3} className="text-center py-5">no incomes transaction</TableCell>
                                </TableRow>
                            ) : (
                                incomes.map((income) => (
                                    <TableRow key={income.id}>
                                        <TableCell>{income.category.name}</TableCell>
                                        <TableCell className="text-right">₱ {moneyFormat(income.amount)}</TableCell>
                                        <TableCell>{dateTime(income.created_at)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
