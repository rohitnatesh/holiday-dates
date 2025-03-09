import { Table, TableBody } from "@/components/ui/table";
import { CalendarTableHeader } from "./calendar-table-header";
import { UserDetails } from "@/types/UserDetails";
import placeholderHolidaysAndEvents from "@/mocks/placeholderHolidaysAndEvents.json";
import { Holiday } from "@/types/Holiday";
import { TableRowWithDetails } from "./table-row-with-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const placeholderTableBody = placeholderHolidaysAndEvents.map((row) => (
    <TableRowWithDetails
        key={`${row.startDate}-${row.name}`}
        row={row as Holiday}
        disableDetails
    />
));

export const TableBlurred = ({ user }: { user: UserDetails | null }) => {
    const isLoggedIn = Boolean(user);
    // const isSubscriber = Boolean(user?.isSubscriber);

    return (
        <div className="relative">
            <Table aria-describedby="holidays-heading">
                <CalendarTableHeader />
                <TableBody role="presentation" aria-hidden>
                    {placeholderTableBody}
                </TableBody>
            </Table>

            <div className="absolute top-12 backdrop-blur-sm left-0 h-full w-full">
                <Card className="absolute top-1/3 w-full left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 max-w-lg">
                    <CardHeader>
                        <CardTitle className="flex gap-2 justify-center sm:justify-start">
                            <LockKeyhole
                                role="presentation"
                                className="self-start h-5 w-5 shrink-0"
                            />
                            <h3 className="text-lg leading-none tracking-tight text-center sm:text-left">
                                Looking for Future Holidays and Events?
                            </h3>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="leading-7">
                            Explore holidays and events for current year and
                            earlier for free.
                            {isLoggedIn
                                ? " Subscribe to unlock future years!"
                                : " Log in to see future years!"}
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch sm:items-end">
                        {isLoggedIn ? (
                            <Button asChild>
                                <Link href="/login">Subscribe</Link>
                            </Button>
                        ) : (
                            <Button asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
