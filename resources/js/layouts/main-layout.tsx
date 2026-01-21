import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/mode"
import { Separator } from "@/components/ui/separator"
import AppSearch from "@/components/app-search"
import AppProfile from "@/components/app-profile"
import AppBell from "@/components/app-bell"
import AppFooter from "@/components/app-footer"
import AppNotification from "@/components/app-notification"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return(
        <SidebarProvider
            style={
                {
                "--sidebar-width": "17rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 justify-between items-center gap-2 px-4 border-b">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger variant="outline" className="w-10 h-10 lg:h-11 lg:w-11 p-5 shadow-none"/>
                        <AppSearch />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <AppBell />
                        <ModeToggle />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <AppProfile/>
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                        {children}
                        <AppNotification />
                    </div>  
                    <AppFooter />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}