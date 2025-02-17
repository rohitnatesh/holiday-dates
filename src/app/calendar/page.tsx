"use server";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchHolidayList } from "@/utilities/actions";
import { AlertTriangle } from "lucide-react";
import { TableRowWithDetails } from "./table-row-with-details";

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { country, state, city, year } = await searchParams;

    if (!country || !year) {
        throw new Error();
    }

    const { holidays } = await fetchHolidayList(country, year, state, city);

    return (
        <section className="sm:ml-4 sm:max-w-[800px]">
            <h2
                id="holidays-heading"
                className="text-lg sm:text-2xl font-semibold tracking-tight mt-4 mb-8 text-center"
            >
                {year} Holidays and Events in {city ? `${city}, ` : null}
                {state ? `${state}, ` : null}
                {country}
            </h2>

            <Table aria-describedby="holidays-heading">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <span className="sr-only">
                                Additional Information
                            </span>
                        </TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {holidays.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="border-b font-medium text-slate-600 text-md text-center px-2 py-8 sm:py-20"
                            >
                                <AlertTriangle className="inline-block mr-2 fill-yellow-200" />
                                No holidays or events found for the selected
                                location and year.
                            </TableCell>
                        </TableRow>
                    ) : (
                        holidays.map((row) => (
                            <TableRowWithDetails
                                key={`${row.startDate}-${row.name}`}
                                row={row}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </section>
    );
};

export default Page;
