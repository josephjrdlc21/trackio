import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function AppSearch() {
    return (
        <div className="hidden lg:block">
            <form>
                <div className="relative">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5"
                    />

                    <Input
                        type="text"
                        placeholder="Search or type command..."
                        className="h-11 pl-12 pr-14 xl:w-[430px] shadow-none border-1 rounded- border-gray-300 dark:border-[#242424]"
                    />

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 text-xs gap-1"
                    >
                        <span>⌘</span>
                        <span>K</span>
                    </Button>
                </div>
            </form>
        </div>
    )
}
