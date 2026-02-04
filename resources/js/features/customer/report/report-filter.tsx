import { ReportFilterProps } from "@/types/customer/report"
import { index } from "@/routes/customer/report"
import { router } from "@inertiajs/react"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Funnel, RotateCcw, Search } from "lucide-react"

export default function ReportFilter({ filters }: ReportFilterProps) {
    const [keyword, setKeyword] = useState(filters?.keyword || "")
    const [start_date, setStartDate] = useState(filters?.start_date || "")
    const [end_date, setEndDate] = useState(filters?.end_date || "")

    const handleSearch= (e: React.FormEvent) => {
        e.preventDefault()

        router.get(index.url(), {
            keyword: keyword,
            start_date: start_date,
            end_date: end_date,
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
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-2">
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

                    <Input type="date" 
                        value={start_date}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="h-10 xl:w-[200px] shadow-none border-1 rounded border-gray-300 dark:border-[#242424]" 
                    />
                    <Input type="date"
                        value={end_date}
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="ml-0 md:ml-2 h-10 xl:w-[200px] shadow-none border-1 rounded border-gray-300 dark:border-[#242424]" 
                    />
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
