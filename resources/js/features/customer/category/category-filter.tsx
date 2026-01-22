import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Funnel, RotateCcw, Search } from "lucide-react"

export default function CategoryFilter() {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className="hidden lg:block">
                <form>
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5"
                        />

                        <Input
                            type="text"
                            placeholder="Type keyword..."
                            className="h-10 pl-12 pr-14 xl:w-[270px] shadow-none border-1 rounded border-gray-300 dark:border-[#242424]"
                        />
                    </div>
                </form>
            </div>
            <Button variant="outline" className="shadow-none h-10">
                <Funnel />
            </Button>
            <Button variant="outline" className="shadow-none h-10">
                <RotateCcw />
            </Button>
        </div>
    )
}
