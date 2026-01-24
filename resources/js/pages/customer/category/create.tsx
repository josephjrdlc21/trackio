import MainLayout from "@/layouts/main-layout"
import CategoryCreateForm from "@/features/customer/category/category-create-form"

export default function Create() {
    return (
        <MainLayout>
            <div className="w-full max-w-3xl mx-auto">
                <CategoryCreateForm />
            </div>
        </MainLayout>
    )
}
