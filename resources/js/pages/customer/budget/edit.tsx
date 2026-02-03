import MainLayout from "@/layouts/main-layout"
import BudgetEditForm from "@/features/customer/budget/budget-edit-form"

import { BudgetEditProps } from "@/types/customer/budget"

export default function Edit({ budget, categories }: BudgetEditProps) {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <BudgetEditForm budget={budget} categories={categories} />
            </div>
        </MainLayout>
    )
}
