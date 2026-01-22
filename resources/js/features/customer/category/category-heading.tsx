import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
    BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function CategoryHeading() {
    return (
        <div className="pb-3 w-full flex justify-between items-center gap-2">
            <div className="flex justify-between items-center gap-2">
                <h4 className="font-semibold">Categories</h4>

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
                            <BreadcrumbPage>Categories</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex justify-between items-center gap-2">
                <Button className="shadow-none" asChild>
                    <a href="#">
                        <PlusIcon className="size-4"/> Create Category
                    </a>
                </Button>
            </div>
        </div>
    );
}