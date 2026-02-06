import { BudgetListProps } from "@/types/customer/budget"
import { dateTime, moneyFormat, lastDayOfMonth } from "@/lib/utils"

import BudgetFilter from "@/features/customer/budget/budget-filter"
import BudgetAction from "@/features/customer/budget/budget-action-edit"
import AppPagination from "@/components/app-pagination"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function BudgetList({ list, filters }: BudgetListProps) {
    const budgets = Array.isArray(list.data) ? list.data : list.data ? [list.data] : []

    return (
        <Card className="p-0 gap-0 mt-4">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center p-4 gap-2">
                <h4 className="font-semibold text-base">Record Data</h4>
                <BudgetFilter filters={filters} />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-t">
                            <TableHead className="min-w-[200px] pl-4"><b>Category</b></TableHead>
                            <TableHead className="min-w-[150px] text-right"><b>Budget</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>From Date</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>To Date</b></TableHead>
                            <TableHead className="min-w-[150px] pr-4 text-center"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {budgets.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={5} className="text-center py-5">No Record Found.</TableCell>
                            </TableRow>
                        ) : (
                            budgets.map((budget) => (
                                <TableRow key={budget.id} className="hover:bg-transparent">
                                    <TableCell className="pl-4 py-5">
                                        {budget.category.name} <br/>
                                    </TableCell>
                                    <TableCell className="text-right">₱ {moneyFormat(budget.amount)}</TableCell>
                                    <TableCell>{dateTime(budget.budget_date)}</TableCell>
                                    <TableCell>{lastDayOfMonth(budget.budget_date)}</TableCell>
                                    <TableCell className="pr-4 text-center">
                                        <Button variant="outline" size="sm" className="my-5" asChild>
                                            <BudgetAction id={budget.id} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Separator />

                <AppPagination links={list.links} />
            </div>
        </Card>
    )
}
