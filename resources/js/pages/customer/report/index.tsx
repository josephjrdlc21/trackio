import { ReportDataProps } from "@/types/customer/report";

import MainLayout from "@/layouts/main-layout"
import ReportHeading from "@/features/customer/report/report-heading"
import ReportList from "@/features/customer/report/report-list"


export default function Index({ records, filters }: ReportDataProps) {
    
    return (
        <MainLayout>
            <ReportHeading />

            <ReportList list={records} filters={filters} />
        </MainLayout>
    )
}
