"use client";

import { useId, useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus, CircleCheck, CircleX } from "lucide-react";
import { Holiday } from "@/types/Holiday";

const getDataValue = (value?: string) => {
    if (!value) return "–";

    if (value === "Yes" || value === "yes") {
        return (
            <span title="Yes">
                <CircleCheck
                    aria-label="Yes"
                    className="inline-block w-5 h-5 fill-green-200"
                />
            </span>
        );
    }

    if (value === "No" || value === "no") {
        return (
            <span title="No">
                <CircleX
                    aria-label="No"
                    className="inline-block w-5 h-5 fill-red-200"
                />
            </span>
        );
    }

    return value;
};

const Data = ({ heading, value }: { heading: string; value?: string }) => {
    return (
        <div
            role="presentation"
            className="grid grid-cols-2 items-center border-b last:border-0 py-3"
        >
            <dt className="font-semibold pr-4">{heading}</dt>
            <dd className="pl-4 text-center sm:text-left">
                {getDataValue(value)}
            </dd>
        </div>
    );
};

export const TableRowWithDetails = ({ row }: { row: Holiday }) => {
    const [open, setOpen] = useState(false);
    const id = useId();

    const handleClick = () => setOpen((prev) => !prev);

    return (
        <>
            <TableRow>
                <TableCell className="w-14">
                    <Button
                        title="Additional Information"
                        variant="ghost"
                        size="icon"
                        aria-expanded={open ? "true" : "false"}
                        onClick={handleClick}
                        aria-controls={id}
                    >
                        {open ? <Minus /> : <Plus />}
                        <span className="sr-only">Additional Information</span>
                    </Button>
                </TableCell>
                <TableCell className={open ? "font-semibold" : ""}>
                    {row.startDate}
                </TableCell>
                <TableCell className={open ? "font-semibold" : ""}>
                    {row.name}
                </TableCell>
            </TableRow>

            <TableRow
                id={id}
                aria-hidden={!open}
                className={open ? "visible" : "collapse"}
            >
                <TableCell colSpan={3} className="bg-slate-50">
                    <div className="pl-14 pr-8 sm:pl-20 sm:pr-20">
                        <dl className="text-sm">
                            <Data
                                heading="Businesses Closed"
                                value={row.businessesClosed}
                            />
                            <Data
                                heading="Banks Closed"
                                value={row.banksClosed}
                            />
                            <Data
                                heading="Religious Holiday"
                                value={row.religiousHoliday}
                            />
                            <Data heading="Religion" value={row.religion} />
                            <Data
                                heading="Disrespectful to Hold an Event"
                                value={row.dis}
                            />
                            {row.holidayNote ? (
                                <Data
                                    heading="Note"
                                    value={row.holidayNote.replaceAll("\\", "")}
                                />
                            ) : null}
                        </dl>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};
