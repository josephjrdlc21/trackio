import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export default function AppNotification() {
    const { flash } = usePage().props

    useEffect(() => {
        if (!flash?.message) return

        switch (flash.status) {
            case "success":
                toast.success(flash.message)
                break
            case "warning":
                toast.warning(flash.message)
                break
            case "info":
                toast.info(flash.message)
                break
            case "error":
            default:
                toast.error(flash.message)
                break
        }
    }, [flash])

    return (
        <Toaster position="top-center"/>
    )
}
