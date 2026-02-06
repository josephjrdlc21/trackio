import { ExpenseListProps } from "@/types/customer/expense"
import { dateTime, moneyFormat } from "@/lib/utils"

import ExpenseFilter from "@/features/customer/expense/expense-filter"
import ExpenseAction from "@/features/customer/expense/expense-action"
import AppPagination from "@/components/app-pagination"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function ExpenseList({ list, filters }: ExpenseListProps) {
    const expenses = Array.isArray(list.data) ? list.data : list.data ? [list.data] : []

    return (
        <Card className="p-0 gap-0 mt-4">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center p-4 gap-2">
                <h4 className="font-semibold text-base">Record Data</h4>
                <ExpenseFilter filters={filters} />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-t">
                            <TableHead className="min-w-[200px] pl-4"><b>Category</b></TableHead>
                            <TableHead className="min-w-[150px] text-right"><b>Amount</b></TableHead>
                            <TableHead className="min-w-[250px]"><b>Note</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Date</b></TableHead>
                            <TableHead className="min-w-[150px] pr-4 text-center"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={5} className="text-center py-5">No Record Found.</TableCell>
                            </TableRow>
                        ) : (
                            expenses.map((expense) => (
                                <TableRow key={expense.id} className="hover:bg-transparent">
                                    <TableCell className="pl-4 py-5">
                                        {expense.category.name} <br/>
                                        <small className="text-primary"><a href={`${expense.directory}/${expense.filename}`} target="_blank" rel="noopener noreferrer">{expense.filename}</a></small>
                                    </TableCell>
                                    <TableCell className="text-right">₱ {moneyFormat(expense.amount)}</TableCell>
                                    <TableCell>{expense.note}</TableCell>
                                    <TableCell>{dateTime(expense.created_at)}</TableCell>
                                    <TableCell className="pr-4 text-center">
                                        <Button variant="outline" size="sm" className="my-5" asChild>
                                            <ExpenseAction id={expense.id} />
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
