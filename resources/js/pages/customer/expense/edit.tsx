import MainLayout from "@/layouts/main-layout"
import ExpenseEditForm from "@/features/customer/expense/expense-edit-form"

import { ExpenseEditProps } from "@/types/customer/expense"

export default function Edit({ expense, categories }: ExpenseEditProps) {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <ExpenseEditForm expense={expense} categories={categories} />
            </div>
        </MainLayout>
    )
}
