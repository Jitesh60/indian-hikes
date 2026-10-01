/**
 * cn — class-name joiner shared by the vendored fx components.
 *
 * Stand-in for the `cn()` helper that Magic UI / shadcn components import
 * from "@/lib/utils": clsx for conditional joins, tailwind-merge so a
 * caller's className can override a component's default Tailwind classes
 * (e.g. passing "bg-white" to a card whose default is "bg-ink-900").
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
