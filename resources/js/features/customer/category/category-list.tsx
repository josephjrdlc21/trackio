import CategoryFilter from "@/features/customer/category/category-filter"
import CategoryAction from "@/features/customer/category/category-action"
import AppPagination from "@/components/app-pagination"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function CategoryList() {
    return (
        <Card className="p-0 gap-0 mt-4 shadow-none">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center p-4">
                <h4 className="font-semibold text-base">Category List</h4>
                <CategoryFilter />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="min-w-[200px] pl-4"><b>Name</b></TableHead>
                            <TableHead className="min-w-[200px] text-center"><b>Status</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Type</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Date</b></TableHead>
                            <TableHead className="min-w-[150px] pr-4 text-center"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-transparent">
                            <TableCell className="pl-4 py-5">
                                Salary
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge variant="default" className="py-1 px-2">active</Badge>
                            </TableCell>
                            <TableCell>Income</TableCell>
                            <TableCell>2023-04-05, 00:05PM</TableCell>
                            <TableCell className="pr-4 text-center">
                                <Button variant="outline" size="sm" className="my-5" asChild>
                                    <CategoryAction />
                                </Button>
                            </TableCell>
                        </TableRow>

                        <TableRow className="hover:bg-transparent">
                            <TableCell className="pl-4 py-5">
                                Food
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge variant="destructive" className="py-1 px-2">inactive</Badge>
                            </TableCell>
                            <TableCell>Expenses</TableCell>
                            <TableCell>2023-04-05, 00:05PM</TableCell>
                            <TableCell className="pr-4 text-center">
                                <Button variant="outline" size="sm" className="my-5" asChild>
                                    <CategoryAction />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Separator />

                <AppPagination />
            </div>
        </Card>
    )
}
