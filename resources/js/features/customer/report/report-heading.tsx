
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
    BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function ReportHeading() {
    return (
        <div className="pb-3 w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <h4 className="font-semibold hidden md:block">Reports</h4>

                <Separator
                    orientation="vertical"
                    className="hidden md:block data-[orientation=vertical]:h-5"
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
                            <BreadcrumbPage>Reports</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex md:justify-between items-center gap-2">
                <Button variant="destructive" className="shadow-none" asChild>
                    <a href="#">
                        Export PDF
                    </a>
                </Button>
                <Button variant="default" className="shadow-none" asChild>
                    <a href="#">
                        Export Excel
                    </a>
                </Button>
            </div>
        </div>
    )
}