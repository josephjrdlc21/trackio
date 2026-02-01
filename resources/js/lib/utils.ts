import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function textSpace(str: string): string {
    return str.replace(/_/g, ' ');
};

export function moneyFormat(value: number | string): string {
    const num = typeof value === "string" ? parseFloat(value) : value;
    
    if (isNaN(num)) return "0.00";

    return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function titleCase(str?: string | null): string {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(/[\s_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function initialsFormat(name?: string | null): string {
    if (!name) return "";

    const words = name.trim().split(/\s+/);
    const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase() || "").join("");

    return initials;
}

export function strTitleCase(str?: string | null): string {
    if (!str) return "";

    return str.replace(/\w\S*/g, (w) =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
}

export function statusBadgeClass(status?: string | null): string {
    if (!status) return "";

    switch (status.toLowerCase()){
        case "active":
            return "default";

        case "inactive":
            return "destructive";
        
        default:
            return "default";
    }
}

export function formatId(id: number, length: number = 5): string {
    return String(id).padStart(length, "0");
}

export function dateTime(input: string): string {
    if (!input) return "";

    const date = new Date(input);

    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Singapore",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);
}

export function toHtmlDate(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}