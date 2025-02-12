import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => (
    <LoaderCircle
        className={cn("spinner animate-spin stroke-slate-800", className)}
        aria-label="Loading"
    />
);
