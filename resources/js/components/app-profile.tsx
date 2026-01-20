import { usePage } from "@inertiajs/react"
import { initialsFormat, titleCase } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, 
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Lock, LogOut, User2Icon } from "lucide-react"

export default function AppProfile() {

    return(
        <div className="flex justify-between items-center gap-2 mr-5">
            <div className="text-right inline-block">
                <div className="mr-1 font-medium text-sm">Juan Dela Cruz</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="#" alt="profile" />
                        <AvatarFallback>{initialsFormat("Juan Dela Cruz")}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        <span className="font-bold text-sm">Juan Dela Cruz</span><br/>
                        <small className="text-gray-600 text-xs block leading-snug">
                            {titleCase("juandelacruz@gmail.com")}
                        </small>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#"><User2Icon/> Profile </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href="#"><Lock/> Change Password</a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href="#"><LogOut/> Logout</a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
