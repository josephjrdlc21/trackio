import MainLayout from "@/layouts/main-layout"
import CategoryEditForm from "@/features/customer/category/category-edit-form";
import { CategoryEditProps } from "@/types/customer/category";

export default function Edit({ category }: CategoryEditProps) {

    return (
        <MainLayout>
           <div className="w-full max-w-3xl mx-auto">
                <CategoryEditForm category={category} />
            </div>
        </MainLayout>
    )
}
