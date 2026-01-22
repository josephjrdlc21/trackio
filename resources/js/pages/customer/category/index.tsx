import MainLayout from "@/layouts/main-layout"
import CategoryHeading from "@/features/customer/category/category-heading"
import CategoryList from "@/features/customer/category/category-list"

export default function Index() {
    return (
        <MainLayout>
            <CategoryHeading />

            <CategoryList />
        </MainLayout>
    )
}
