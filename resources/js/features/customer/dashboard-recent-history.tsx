import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardRecentHistory() {
    return (
        <Card className="p-0 gap-0">
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
                        <TableRow>
                            <TableCell>Food</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Food</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Food</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Food</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
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
                        <TableRow>
                            <TableCell>Salary</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Salary</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Salary</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Salary</TableCell>
                            <TableCell>1,500</TableCell>
                            <TableCell>02/04/2026, 01:56 PM</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}
