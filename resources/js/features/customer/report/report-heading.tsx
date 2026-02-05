import { export_excel, export_pdf } from "@/routes/customer/report"
import { ReportFilterProps } from "@/types/customer/report"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
    BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function ReportHeading({ filters }: ReportFilterProps) {
    const options = {
        query: {
            keyword: filters?.keyword || "",
            start_date: filters?.start_date || "",
            end_date: filters?.end_date || "",
        },
    };

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
                   <a href={export_pdf.url(options)}>
                        Export PDF
                    </a>
                </Button>
                <Button variant="default" className="shadow-none" asChild>
                    <a href={export_excel.url(options)}>
                        Export Excel
                    </a>
                </Button>
            </div>
        </div>
    )
}