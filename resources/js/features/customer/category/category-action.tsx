import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { MoreHorizontal } from "lucide-react"

export default function CategoryAction() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 shadow-none">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem  asChild>
                    <a href="#">Edit</a>
                </DropdownMenuItem>  

                <DropdownMenuSeparator />              

                <DropdownMenuItem asChild>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start px-2 text-red-500">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Do you want to delete this category?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deleting this category will permanently remove it and all associated data. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
