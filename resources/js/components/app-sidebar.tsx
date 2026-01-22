import * as React from "react"
import { Coins, LayoutDashboard, HandCoins, Wallet, FileChartLine,
	ChartColumnStacked, WalletCards } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu,
  	SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton,
  	SidebarMenuSubItem,} from "@/components/ui/sidebar"
import { dashboard } from "@/routes/customer"
import { index as category } from "@/routes/customer/category"

const data = {
	navMain: [
		{
		title: "Home",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: dashboard.url(),
					isActive: location.pathname === dashboard.url(),
					icon: <LayoutDashboard className="size-4" />,
				},
			],
		},
		{
		title: "Expense Management",
		url: "#",
			items: [
				{
					title: "Budgets",
					url: "#",
					isActive: false,
					icon: <Wallet className="size-4" />,
				},
				{
					title: "Categories",
					url: category.url(),
					isActive: location.pathname === category.url(),
					icon: <ChartColumnStacked className="size-4" />,
				},
				{
					title: "Expenses",
					url: "#",
					isActive: false,
					icon: <HandCoins className="size-4" />,
				},
				{
					title: "Income",
					url: "#",
					isActive: false,
					icon: <WalletCards className="size-4" />,
				},
				{
					title: "Analytics",
					url: "#",
					isActive: false,
					icon: <FileChartLine className="size-4" />,
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="sidebar" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" className="hover:bg-transparent" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Coins className="size-5 text-white" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold text-lg">Trackio</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-2">
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton className="hover:bg-transparent" asChild>
									<a href={item.url} className="font-semibold">
										{item.title}
									</a>
								</SidebarMenuButton>
								{item.items?.length ? (
									<SidebarMenuSub className="ml-0 border-l-0 px-1.5 mx-0">
										{item.items.map((item) => (
											<SidebarMenuSubItem key={item.title}>
												<SidebarMenuSubButton className="py-5" asChild isActive={item.isActive}>
													<a href={item.url} className="flex items-center gap-4">
														{item.icon}
														<span>{item.title}</span>
													</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								) : null}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
