import { ReportListProps } from "@/types/customer/report"
import { dateTime, dateOnly, moneyFormat } from "@/lib/utils"

import AppPagination from "@/components/app-pagination"
import ReportFilter from "@/features/customer/report/report-filter"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

export default function ReportList({ list, filters }: ReportListProps) {
    const reports = Array.isArray(list.data) ? list.data : list.data ? [list.data] : []

    return(
        <Card className="p-0 gap-0 mt-4 shadow-none">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center p-4 gap-2">
                <h4 className="font-semibold text-base">Record Data</h4>
                <ReportFilter filters={filters} />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-t">
                            <TableHead className="min-w-[200px] pl-4"><b>Created</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Name</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Type</b></TableHead>
                            <TableHead className="min-w-[100px] text-right"><b>Expenses Amount</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Expenses Date</b></TableHead>
                            <TableHead className="min-w-[100px] text-right"><b>Income Amount</b></TableHead>
                            <TableHead className="min-w-[150px] pr-4"><b>Income Date</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={7} className="text-center py-5">No Record Found.</TableCell>
                            </TableRow>
                        ) : (
                            reports.map((report) => (
                                <TableRow key={report.id} className="hover:bg-transparent">
                                    <TableCell className="pl-4">{dateTime(report.created_at)}</TableCell>
                                    <TableCell>{report.name}</TableCell>
                                    <TableCell>{report.type}</TableCell>
                                    <TableCell className="text-right">₱ {moneyFormat(report.expenses_sum_amount)}</TableCell>
                                    <TableCell>{report.expenses_max_expense_date ? dateOnly(report.expenses_max_expense_date) : 'N/A'}</TableCell>
                                    <TableCell className="text-right">₱ {moneyFormat(report.incomes_sum_amount)}</TableCell>
                                    <TableCell className="pr-4 py-5">{report.expenses_max_expense_date ? dateOnly(report.incomes_max_income_date) : 'N/A'}</TableCell>
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