"use server";

import { UserDetails } from "@/types/UserDetails";
import { getUserDetails } from "@/utilities/actions/auth";
import { TableWithData } from "./table-with-data";
import { TableBlurred } from "./table-blurred";
import { AdjacentYearLinks } from "./adjacent-year-links";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>;
    },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { country, state, city, year } = await searchParams;

    if (!country || !year) {
        return {
            title: (await parent).title,
            description: (await parent).description,
        };
    }

    const title = `${year} Holidays and Events in ${city ? `${city}, ` : ""}${
        state ? `${state}, ` : ""
    }${country}`;

    const description = `Find all ${year} public holidays and events in ${
        city ? city + ", " : ""
    }${
        state ? state + ", " : ""
    }${country}. See which businesses and banks are closed, religious observances, and event restrictions.`;

    return { title, description };
}

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { country, state, city, year } = await searchParams;
    const heading = `Holidays and Events in ${city ? `${city}, ` : ""}${
        state ? `${state}, ` : ""
    }${country}`;

    if (!country || !year) {
        throw new Error();
    }

    const isDataFree = Number(year) <= new Date().getFullYear();
    let user: UserDetails | null = null;

    // If data is not free, only then we want to verify the user details.
    if (!isDataFree) {
        user = await getUserDetails();
    }

    const isSubscriber = Boolean(user?.isSubscriber);

    return (
        <section className="sm:ml-4 sm:max-w-[800px]">
            <h2
                id="holidays-heading"
                className="text-lg sm:text-2xl font-semibold tracking-tight mt-4 mb-8 text-center"
            >
                {year} {heading}
            </h2>

            {isDataFree || isSubscriber ? (
                <TableWithData
                    country={country}
                    state={state}
                    city={city}
                    year={year}
                />
            ) : (
                <TableBlurred user={user} />
            )}

            <AdjacentYearLinks
                country={country}
                state={state}
                city={city}
                year={year}
                heading={heading}
            />
        </section>
    );
};

export default Page;
