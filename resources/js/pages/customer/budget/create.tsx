import { BudgetCreateProps } from "@/types/customer/budget"

import MainLayout from "@/layouts/main-layout"
import BudgetCreateForm from "@/features/customer/budget/budget-create-form"

export default function Create({ categories }: BudgetCreateProps) {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <BudgetCreateForm categories={categories} />
            </div>
        </MainLayout>
    )
}
