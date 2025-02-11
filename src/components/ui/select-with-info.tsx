import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";

export type SelectWithInfoProps = {
    label: string;
    id: string;
    options: Array<string>;
    optional?: boolean;
    additionalInfo: string;
    onChange?: (value: string) => void;
    value?: string;
    disabled?: boolean;
    loading?: boolean;
};

export const SelectWithInfo = ({
    label,
    id,
    options,
    optional,
    additionalInfo,
    onChange,
    value,
    loading,
    disabled,
}: SelectWithInfoProps) => {
    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <Label htmlFor={id}>
                    {label}
                    {optional ? " (Optional)" : ""}
                </Label>

                <Popover>
                    <PopoverTrigger
                        aria-label={`More information about the ${label} field`}
                    >
                        <CircleHelp role="presentation" className="h-4 w-4" />
                    </PopoverTrigger>

                    <PopoverContent
                        className="bg-slate-200 max-w-full"
                        side="right"
                        align="start"
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

            <Select onValueChange={onChange} value={value} disabled={disabled}>
                <SelectTrigger id={id}>
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {loading ? "Loading..." : null}
        </div>
    );
};
