import { CategoryDataProps } from "@/types/customer/category"

import MainLayout from "@/layouts/main-layout"
import CategoryHeading from "@/features/customer/category/category-heading"
import CategoryList from "@/features/customer/category/category-list"

export default function Index({ records, filters }: CategoryDataProps) {
    
    return (
        <MainLayout>
            <CategoryHeading />

            <CategoryList list={records} filters={filters} />
        </MainLayout>
    )
}
