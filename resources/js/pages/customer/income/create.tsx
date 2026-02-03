import { IncomeCreateProps } from "@/types/customer/income"

import MainLayout from "@/layouts/main-layout"
import IncomeCreateForm from "@/features/customer/income/income-create-form"

export default function Create({ categories }: IncomeCreateProps) {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <IncomeCreateForm categories={categories} />
            </div>
        </MainLayout>
    )
}
