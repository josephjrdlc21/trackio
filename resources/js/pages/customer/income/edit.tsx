import MainLayout from "@/layouts/main-layout"
import IncomeEditForm from "@/features/customer/income/income-edit-form"

import { IncomeEditProps } from "@/types/customer/income"

export default function Edit({ income, categories }: IncomeEditProps) {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <IncomeEditForm income={income} categories={categories} />
            </div>
        </MainLayout>
    )
}
