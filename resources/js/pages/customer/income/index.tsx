import { IncomeDataProps } from "@/types/customer/income"

import MainLayout from "@/layouts/main-layout"
import IncomeHeading from "@/features/customer/income/income-heading"
import IncomeList from "@/features/customer/income/income-list"

export default function Index({ records, filters, categories }: IncomeDataProps) {
    
    return (
        <MainLayout>
            <IncomeHeading />

            <IncomeList list={records} filters={filters} />
        </MainLayout>
    )
}
