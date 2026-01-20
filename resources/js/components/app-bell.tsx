import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function AppBell() {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-10 h-10 lg:h-11 lg:w-11 p-5 shadow-none rounded-full"
        >
            <Bell />
        </Button>
    )
}
