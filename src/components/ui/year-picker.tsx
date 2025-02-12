"use client";

import { useState, Fragment } from "react";
import {
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    CircleHelp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { PopoverClose } from "@radix-ui/react-popover";

const getDecadeStart = (year: number) => year - (year % 10);

export type YearPickerProps = {
    label: string;
    id: string;
    additionalInfo: string;
    onChange: (value: number) => void;
    value: number;
    disabled?: boolean;
};

const MIN_VALUE = 1000;
const MAX_VALUE = 9999;

export const YearPicker = ({
    label,
    id,
    additionalInfo,
    onChange,
    value,
    disabled,
}: YearPickerProps) => {
    const [decade, setDecade] = useState(getDecadeStart(value));
    const [open, setOpen] = useState(false);

    const yearOptions = Array.from({ length: 10 }).map((_, i) => decade + i);

    const previousDecade = () => setDecade((previous) => previous - 10);
    const nextDecade = () => setDecade((previous) => previous + 10);

    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <Label
                    htmlFor={id}
                    className={disabled ? "text-muted-foreground" : ""}
                >
                    {label}
                </Label>

                <Popover>
                    <PopoverTrigger
                        aria-label={`More information about ${label} field`}
                    >
                        <CircleHelp role="presentation" className="h-4 w-4" />
                    </PopoverTrigger>

                    <PopoverContent
                        className="bg-slate-200 max-w-full"
                        side="bottom"
                        align="center"
                    >
                        <p className="leading-7">{additionalInfo}</p>
                        <PopoverClose asChild>
                            <Button variant="secondary" className="m-0 mt-2">
                                Okay
                            </Button>
                        </PopoverClose>
                    </PopoverContent>
                </Popover>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        disabled={disabled}
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal border-slate-400 gap-3",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {value ? value : <span>{label}</span>}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto max-w-[100vw] p-2 space-y-2"
                    align="start"
                    side="top"
                >
                    <div className="flex justify-between items-center">
                        {decade > MIN_VALUE ? (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={previousDecade}
                            >
                                <ChevronLeft />
                                <span className="sr-only">Previous Decade</span>
                            </Button>
                        ) : (
                            <span className="w-8 h-8" role="none" />
                        )}

                        <p className="text-sm font-medium cursor-default">
                            {decade} – {decade + 9}
                        </p>
                        {decade + 9 < MAX_VALUE ? (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={nextDecade}
                            >
                                <ChevronRight />
                                <span className="sr-only">Next Decade</span>
                            </Button>
                        ) : (
                            <span className="w-8 h-8" role="none" />
                        )}
                    </div>

                    <div className="grid grid-flow-row grid-cols-3 gap-2">
                        {yearOptions.map((yearOption, i) => (
                            <Fragment key={yearOption}>
                                {i === 9 ? <span role="none" /> : null}
                                <Button
                                    className="font-normal"
                                    variant={
                                        yearOption === value
                                            ? "default"
                                            : "ghost"
                                    }
                                    onClick={() => {
                                        onChange(yearOption);
                                        setOpen(false);
                                    }}
                                >
                                    {yearOption}
                                </Button>
                            </Fragment>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
