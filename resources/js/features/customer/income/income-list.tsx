import { IncomeListProps } from "@/types/customer/income"
import { dateTime, moneyFormat } from "@/lib/utils"

import IncomeFilter from "@/features/customer/income/income-filter"
import IncomeAction from "@/features/customer/income/income-action"
import AppPagination from "@/components/app-pagination"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function IncomeList({ list, filters }: IncomeListProps) {
    const incomes = Array.isArray(list.data) ? list.data : list.data ? [list.data] : []

    return (
        <Card className="p-0 gap-0 mt-4 shadow-none">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center p-4 gap-2">
                <h4 className="font-semibold text-base">Record Data</h4>
                <IncomeFilter filters={filters} />
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
                        {incomes.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={5} className="text-center py-5">No Record Found.</TableCell>
                            </TableRow>
                        ) : (
                            incomes.map((income) => (
                                <TableRow key={income.id} className="hover:bg-transparent">
                                    <TableCell className="pl-4 py-5">
                                        {income.category.name} <br/>
                                        <small className="text-primary"><a href={`${income.directory}/${income.filename}`} target="_blank" rel="noopener noreferrer">{income.filename}</a></small>
                                    </TableCell>
                                    <TableCell className="text-right">₱ {moneyFormat(income.amount)}</TableCell>
                                    <TableCell>{income.note}</TableCell>
                                    <TableCell>{dateTime(income.created_at)}</TableCell>
                                    <TableCell className="pr-4 text-center">
                                        <Button variant="outline" size="sm" className="my-5" asChild>
                                            <IncomeAction id={income.id} />
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
