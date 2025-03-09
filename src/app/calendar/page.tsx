"use server";

import { UserDetails } from "@/types/UserDetails";
import { getUserDetails } from "@/utilities/actions/auth";
import { TableWithData } from "./table-with-data";
import { TableBlurred } from "./table-blurred";

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { country, state, city, year } = await searchParams;

    if (!country || !year) {
        throw new Error();
    }

    const isDataFree = Number(year) <= new Date().getFullYear();
    let user: UserDetails | null = null;

    // If data is not free, only then we want to verify the user details.
    if (!isDataFree) {
        user = await getUserDetails();
    }

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

            {isDataFree || user ? (
                <TableWithData
                    country={country}
                    state={state}
                    city={city}
                    year={year}
                />
            ) : (
                <TableBlurred user={user} />
            )}
        </section>
    );
};

export default Page;
