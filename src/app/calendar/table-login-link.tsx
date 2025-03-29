"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const TableLoginLink = () => {
    const searchParams = useSearchParams();

    const url = `/login?calendarParam=${encodeURIComponent(
        searchParams.toString()
    )}`;

    return (
        <Button asChild>
            <Link href={url}>Login</Link>
        </Button>
    );
};
