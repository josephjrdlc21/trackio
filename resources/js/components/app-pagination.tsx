import { PaginationProps } from "@/types/pagination";

export default function AppPagination({ links }: PaginationProps) {
    return (
        <nav aria-label="navigation pagination" className="flex justify-center p-4 my-1">
            <ul className="flex -space-x-px text-sm">
                {links.map((link, index) => {
                    const isDisabled = link.url === null;
                    const isActive = link.active;

                    const baseClasses =
                        "flex items-center justify-center box-border border border-default-medium text-sm w-8 h-8 focus:outline-none";

                    const activeClasses =
                        "text-fg-brand bg-neutral-tertiary-medium font-medium";

                    const inactiveClasses =
                        "text-body bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium";

                    const disabledClasses =
                        "opacity-50 cursor-not-allowed";

                    const roundedClasses =
                        index === 0
                            ? "rounded-s-lg"
                            : index === links.length - 1
                            ? "rounded-e-lg"
                            : "";

                    return (
                        <li key={link.page ?? index}>
                            {isDisabled ? (
                                <span
                                    className={`${baseClasses} ${inactiveClasses} ${disabledClasses} ${roundedClasses}`}
                                >
                                    {renderLabel(link.label)}
                                </span>
                            ) : (
                                <a
                                    href={link.url ?? undefined}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`${baseClasses} ${
                                        isActive ? activeClasses : inactiveClasses
                                    } ${roundedClasses}`}
                                >
                                    {renderLabel(link.label)}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/**
 * Renders pagination label:
 * - Previous / Next icons
 * - Page numbers
 */
function renderLabel(label: string | null) {
    if (!label) return null;

    if (label.includes("Previous")) {
        return (
            <>
                <span className="sr-only">Previous</span>
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 19-7-7 7-7"
                    />
                </svg>
            </>
        );
    }

    if (label.includes("Next")) {
        return (
            <>
                <span className="sr-only">Next</span>
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m9 5 7 7-7 7"
                    />
                </svg>
            </>
        );
    }

    return <span dangerouslySetInnerHTML={{ __html: label }} />;
}
