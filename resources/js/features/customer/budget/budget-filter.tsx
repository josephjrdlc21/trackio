import { BudgetFilterProps } from "@/types/customer/budget"
import { index } from "@/routes/customer/budget"
import { router } from "@inertiajs/react"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Funnel, RotateCcw, Search } from "lucide-react"

export default function BudgetFilter({ filters }: BudgetFilterProps) {
    const [keyword, setKeyword] = useState(filters?.keyword || "")

    const handleSearch= (e: React.FormEvent) => {
        e.preventDefault()

        router.get(index.url(), {
            keyword: keyword 
        }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handleReset = () => {
        setKeyword("")

        router.get(index.url(), {}, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="block">
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5"
                        />

                        <Input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Type keyword..."
                            className="h-10 pl-12 pr-14 xl:w-[270px] shadow-none border-1 rounded border-gray-300 dark:border-[#242424]"
                        />
                    </div>
                </form>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="shadow-none h-10" onClick={handleSearch}>
                    <Funnel />
                </Button>
                <Button variant="outline" className="shadow-none h-10" onClick={handleReset}>
                    <RotateCcw />
                </Button>
            </div>
        </div>
    )
}
