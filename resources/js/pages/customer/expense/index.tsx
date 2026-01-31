import { ExpenseDataProps } from "@/types/customer/expense"

import MainLayout from "@/layouts/main-layout"
import ExpenseHeading from "@/features/customer/expense/expense-heading"

export default function Index({ records, filters }: ExpenseDataProps) {
    
    return (
        <MainLayout>
            <ExpenseHeading />

        </MainLayout>
    )
}
