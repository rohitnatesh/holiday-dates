import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CalendarTableHeader = () => (
    <TableHeader>
        <TableRow>
            <TableHead>
                <span className="sr-only">Additional Information</span>
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
        </TableRow>
    </TableHeader>
);
