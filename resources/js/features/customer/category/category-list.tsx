import { CategoryListProps } from "@/types/customer/category"
import { statusBadgeClass, dateTime } from "@/lib/utils"

import CategoryFilter from "@/features/customer/category/category-filter"
import CategoryAction from "@/features/customer/category/category-action"
import AppPagination from "@/components/app-pagination"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function CategoryList({ list }: CategoryListProps) {
    const categories = Array.isArray(list.data) ? list.data : list.data ? [list.data] : []

    return (
        <Card className="p-0 gap-0 mt-4 shadow-none">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center p-4 gap-2">
                <h4 className="font-semibold text-base">Record Data</h4>
                <CategoryFilter />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-t">
                            <TableHead className="min-w-[200px] pl-4"><b>Name</b></TableHead>
                            <TableHead className="min-w-[200px] text-center"><b>Status</b></TableHead>
                            <TableHead className="min-w-[150px]"><b>Type</b></TableHead>
                            <TableHead className="min-w-[200px]"><b>Date</b></TableHead>
                            <TableHead className="min-w-[150px] pr-4 text-center"><b>Action</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={5} className="text-center py-5">No Record Found.</TableCell>
                            </TableRow>
                        ) : (
                            categories.map((category) => (
                                <TableRow key={category.id} className="hover:bg-transparent">
                                    <TableCell className="pl-4 py-5">
                                        {category.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={statusBadgeClass(category.status) as any} className="py-1 px-2">{category.status}</Badge>
                                    </TableCell>
                                    <TableCell>{category.type}</TableCell>
                                    <TableCell>{dateTime(category.created_at)}</TableCell>
                                    <TableCell className="pr-4 text-center">
                                        <Button variant="outline" size="sm" className="my-5" asChild>
                                            <CategoryAction />
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
