import { Button } from "@/components/ui/button";
import { getUrlWithQueryParam } from "@/utilities/getUrlWithQueryParam";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

export const AdjacentYearLinks = ({
    country,
    state,
    city,
    year,
    heading,
}: {
    country: string;
    state?: string;
    city?: string;
    year: string;
    heading: string;
}) => {
    const currentYear = Number(year);
    if (!currentYear) return null;

    const previousYear = currentYear - 1;
    const nextYear = currentYear + 1;

    const previousYearUrl = getUrlWithQueryParam("/calendar", {
        country,
        state,
        city,
        year: previousYear,
    });
    const nextYearUrl = getUrlWithQueryParam("/calendar", {
        country,
        state,
        city,
        year: nextYear,
    });

    return (
        <nav className="flex justify-between mt-8">
            {previousYear > 0 && (
                <Button asChild variant="link">
                    <Link
                        href={previousYearUrl}
                        className="pl-0"
                        title={`${previousYear} ${heading}`}
                    >
                        <MoveLeft />
                        {previousYear}
                    </Link>
                </Button>
            )}
            <Button asChild variant="link">
                <Link
                    href={nextYearUrl}
                    className="pr-0"
                    title={`${nextYear} ${heading}`}
                >
                    {nextYear}
                    <MoveRight />
                </Link>
            </Button>
        </nav>
    );
};
