"use server";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { fetchHolidayList } from "@/utilities/actions/data";
import { AlertTriangle } from "lucide-react";
import { TableRowWithDetails } from "./table-row-with-details";
import { CalendarTableHeader } from "./calendar-table-header";

export const TableWithData = async ({
    country,
    year,
    state,
    city,
}: {
    country: string;
    year: string;
    state?: string;
    city?: string;
}) => {
    const { holidays } = await fetchHolidayList(country, year, state, city);

    return (
        <Table aria-describedby="holidays-heading">
            <CalendarTableHeader />
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
    );
};
