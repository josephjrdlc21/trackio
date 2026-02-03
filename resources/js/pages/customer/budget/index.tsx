import { BudgetDataProps } from "@/types/customer/budget"

import MainLayout from "@/layouts/main-layout"
import BudgetHeading from "@/features/customer/budget/budget-heading"
import BudgetList from "@/features/customer/budget/budget-list"

export default function Index({ records, filters, categories }: BudgetDataProps) {
    return (
        <MainLayout>
            <BudgetHeading />

            <BudgetList list={records} filters={filters} />
        </MainLayout>
    )
}