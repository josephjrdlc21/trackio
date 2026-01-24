import { PaginationProps } from "@/types/pagination";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"

export default function AppPagination({ links }: PaginationProps) {
    if (!links || links.length === 0) return null;

    const prevLink = links[0];
    const nextLink = links[links.length - 1];
    const numberLinks = links.slice(1, -1);

    return (
        <Pagination className="py-3 w-full">
            <PaginationContent className="relative flex w-full items-center">
                
                {/* LEFT: Previous */}
                <div className="absolute left-0">
                    <PaginationItem>
                        {prevLink.url ? (
                            <PaginationPrevious size="sm" href={prevLink.url} className="hover:bg-transparent"/>
                            ) : (
                            <PaginationPrevious size="sm" className="opacity-50 pointer-events-none hover:bg-transparent" />
                            )}
                    </PaginationItem>
                </div>

                {/* CENTER: Page numbers */}
                <div className="mx-auto flex items-center gap-1">
                    {numberLinks.map((link, index) => {
                        const label =
                        link.label
                            ?.replace("&laquo;", "«")
                            .replace("&raquo;", "»")
                            .trim() ?? "";

                        if (!link.url) {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={link.page ?? index}>
                                <PaginationLink
                                size="sm"
                                href={link.url}
                                isActive={link.active}
                                dangerouslySetInnerHTML={{ __html: label }}
                                />
                            </PaginationItem>
                        );
                    })}
                </div>

                {/* RIGHT: Next */}
                <div className="absolute right-0">
                    <PaginationItem>
                        {nextLink.url ? (
                        <PaginationNext size="sm" href={nextLink.url} className="hover:bg-transparent" />
                        ) : (
                        <PaginationNext size="sm" className="opacity-50 pointer-events-none hover:bg-transparent" />
                        )}
                    </PaginationItem>
                </div>

            </PaginationContent>
    
        </Pagination>
    );
}