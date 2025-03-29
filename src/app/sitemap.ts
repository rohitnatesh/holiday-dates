import type { MetadataRoute } from "next";
import {
    fetchCitiesList,
    fetchCountriesList,
    fetchStatesAndCitiesList,
} from "@/utilities/actions/data";
import { getUrlWithQueryParam } from "@/utilities/getUrlWithQueryParam";

// Revalidate every week.
export const revalidate = 604800;

// Generate an array of years (past 10 and future 10)
const generateYearsList = (): number[] => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    // Last 10 years (including current year)
    for (let year = currentYear - 9; year <= currentYear; year++) {
        years.push(year);
    }

    // Next 10 years
    for (let year = currentYear + 1; year <= currentYear + 10; year++) {
        years.push(year);
    }

    return years;
};

const getCalendarSitemapEntry = (
    lastModified: Date,
    params: { [key: string]: string | number }
): MetadataRoute.Sitemap[number] => ({
    url: getUrlWithQueryParam(
        `${process.env.WEBSITE_URL}calendar`,
        params,
        "&amp;"
    ),
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
});

const generateStateSitemapForYears = async (
    country: string,
    state: string,
    lastModified: Date,
    years: number[]
): Promise<MetadataRoute.Sitemap> => {
    // Fetch cities once for all years
    const { cities } = await fetchCitiesList(country, state);
    const entries: MetadataRoute.Sitemap = [];

    // Generate entries for each year
    years.forEach((year) => {
        // Add state entry for this year
        entries.push(
            getCalendarSitemapEntry(lastModified, {
                country,
                state,
                year,
            })
        );

        // Add city entries for this year
        cities.forEach((city) => {
            entries.push(
                getCalendarSitemapEntry(lastModified, {
                    country,
                    state,
                    city: city.replace("&", "&amp;"),
                    year,
                })
            );
        });
    });

    return entries;
};

const generateCountrySitemapForYears = async (
    country: string,
    lastModified: Date,
    years: number[]
): Promise<MetadataRoute.Sitemap> => {
    // Fetch states and cities once for all years
    const { states, cities: countryCities } = await fetchStatesAndCitiesList(
        country
    );
    const entries: MetadataRoute.Sitemap = [];

    // Generate entries for each year
    years.forEach((year) => {
        // Add country entry for this year
        entries.push(
            getCalendarSitemapEntry(lastModified, {
                country,
                year,
            })
        );

        // Add country-city entries for this year
        countryCities.forEach((city) => {
            entries.push(
                getCalendarSitemapEntry(lastModified, {
                    country,
                    city: city.replace("&", "&amp;"),
                    year,
                })
            );
        });
    });

    // Generate state sitemaps in parallel
    const stateSitemaps = await Promise.all(
        states.map((state) =>
            generateStateSitemapForYears(
                country,
                state.replace("&", "&amp;"),
                lastModified,
                years
            )
        )
    );

    return [...entries, ...stateSitemaps.flat()];
};

const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const lastModified = new Date();
    const years = generateYearsList();

    // Fetch countries once for all years
    const { countries } = await fetchCountriesList();

    // Generate home page entry
    const homepageEntry = {
        url: process.env.WEBSITE_URL!,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 1,
    };

    // Generate sitemaps for countries in parallel
    const countrySitemaps = await Promise.all(
        countries.map((country) =>
            generateCountrySitemapForYears(
                country.replace("&", "&amp;"),
                lastModified,
                years
            )
        )
    );

    return [homepageEntry, ...countrySitemaps.flat()];
};

export default generateSitemap;
