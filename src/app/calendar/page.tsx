import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { country, state, city, year } = await searchParams;

    return (
        <div>
            {country}
            {state}
            {city}
            {year}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Businesses Closed</TableHead>
                        <TableHead>Banks Closed</TableHead>
                        <TableHead>Religious Holiday</TableHead>
                        <TableHead>Religion</TableHead>
                        <TableHead>Disrespectful to hold an event</TableHead>
                        <TableHead>Note</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    );
};

export default Page;
