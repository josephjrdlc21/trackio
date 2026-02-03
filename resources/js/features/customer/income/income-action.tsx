import { edit, deleteMethod } from "@/routes/customer/income"
import { router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { MoreHorizontal, Trash, Pencil } from "lucide-react"

export default function IncomeAction({ id }: { id: number }) {

    const handleDelete = (id: number) => {
        router.get(deleteMethod.url(id))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 shadow-none">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="md:w-[140px]">
                <DropdownMenuItem asChild className="md:px-4 md:py-2 cursor-pointer">
                    <a href={edit.url({ id })}>
                        <Pencil /> Edit
                    </a>
                </DropdownMenuItem>  

                <DropdownMenuSeparator />              

                <DropdownMenuItem asChild className="md:px-4 md:py-2 cursor-pointer">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start px-2 text-red-500"><Trash /> Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Do you want to delete this income?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deleting this income will permanently remove it and all associated data. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
