import { ExpenseDataProps } from "@/types/customer/expense"

import MainLayout from "@/layouts/main-layout"
import ExpenseHeading from "@/features/customer/expense/expense-heading"
import ExpenseList from "@/features/customer/expense/expense-list"

export default function Index({ records, filters, categories }: ExpenseDataProps) {
    
    return (
        <MainLayout>
            <ExpenseHeading />

            <ExpenseList list={records} filters={filters} />
        </MainLayout>
    )
}
