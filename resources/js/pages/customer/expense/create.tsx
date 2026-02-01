import { ExpenseCreateProps } from "@/types/customer/expense"

import MainLayout from "@/layouts/main-layout"
import ExpenseCreateForm from "@/features/customer/expense/expense-create-form"

export default function Create({ categories }: ExpenseCreateProps) {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <ExpenseCreateForm categories={categories} />
            </div>
        </MainLayout>
    )
}
