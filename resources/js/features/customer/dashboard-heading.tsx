import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
    BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { FilterIcon } from "lucide-react"


export default function DashboardHeading() {
    return (
        <div className="pb-3 w-full flex justify-between items-center gap-2">
            <div className="flex justify-between items-center gap-2">
                <h4 className="font-semibold">Dashboard</h4>

                <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-5"
                />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex justify-between items-center gap-2">
                <Button variant="outline" className="shadow-none">
                    JAN 20, 26 - JAN 20, 26
                </Button>
                <Button variant="outline" className="shadow-none">
                    <FilterIcon size="5" /> Filter
                </Button>
            </div>
        </div>
    );
}