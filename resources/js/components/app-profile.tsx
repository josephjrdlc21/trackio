import { usePage } from "@inertiajs/react"
import { initialsFormat, titleCase } from "@/lib/utils"
import { logout } from "@/routes/customer/auth"

import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, 
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Lock, LogOut, User2Icon } from "lucide-react"

export default function AppProfile() {
    const { auth } = usePage().props
    const user = auth?.customer ?? auth?.admin

    return(
        <div className="flex justify-between items-center gap-2">
            <div className="text-right inline-block">
                <div className="mr-1 font-medium text-sm">{user?.name}</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="#" alt="profile" />
                        <AvatarFallback>{initialsFormat(user?.name)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="md:w-[200px]">
                    <DropdownMenuLabel className="md:px-4">
                        <span className="font-bold text-sm">{titleCase(user?.name)}</span><br/>
                        <small className="text-gray-600 text-xs block leading-snug">
                            {user?.email}
                        </small>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="md:px-4 md:py-2 cursor-pointer">
                           <a href="#"><User2Icon/> Profile Details</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="md:px-4 md:py-2 cursor-pointer">
                            <a href="#"><Lock/> Change Password</a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="md:px-4 md:py-2 cursor-pointer">
                            <a href={logout.url()}><LogOut/> Logout</a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
