"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const TableAccessLink = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const searchParams = useSearchParams();

    const url = `/${
        isLoggedIn ? "subscription" : "login"
    }?calendarParam=${encodeURIComponent(searchParams.toString())}`;

    return (
        <Button asChild>
            <Link href={url}>{isLoggedIn ? "Subscribe" : "Login"}</Link>
        </Button>
    );
};
