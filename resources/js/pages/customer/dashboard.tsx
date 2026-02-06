import MainLayout from "@/layouts/main-layout"
import DashboardHeading from "@/features/customer/dashboard-heading"
import DashboardFinance from "@/features/customer/dashboard-finance"
import DashboardCategoryChart from "@/features/customer/dashboard-category-chart"
import DashboardRecentHistory from "@/features/customer/dashboard-recent-history"

export default function dashboard() {
    return (
        <MainLayout>
            <DashboardHeading />

            <DashboardFinance />

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                    <DashboardCategoryChart />
                </div>
                <DashboardRecentHistory />
            </div>
        </MainLayout>
    )
}
