import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function textSpace(str: string): string {
    return str.replace(/_/g, ' ');
};

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
        case "pending":
            return "default";

        case "active":
        case "approved":
            return "success";

        case "inactive":
        case "cancelled":
            return "danger";
        
        default:
            return "default";
    }
}

export function formatId(id: number, length: number = 5): string {
    return String(id).padStart(length, "0");
}