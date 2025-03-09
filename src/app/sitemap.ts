import type { MetadataRoute } from "next";
import {
    fetchCitiesList,
    fetchCountriesList,
    fetchStatesAndCitiesList,
} from "@/utilities/actions/data";
import { getUrlWithQueryParam } from "@/utilities/getUrlWithQueryParam";

// Revalidate every week.
export const revalidate = 604800;

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

const generateStateSitemap = async (
    country: string,
    state: string,
    lastModified: Date,
    year: number
): Promise<MetadataRoute.Sitemap> => {
    const stateEntry = getCalendarSitemapEntry(lastModified, {
        country,
        state,
        year,
    });

    const { cities } = await fetchCitiesList(country, state);

    const cityEntries = cities.map((city) =>
        getCalendarSitemapEntry(lastModified, {
            country,
            state,
            city: city.replace("&", "&amp;"),
            year,
        })
    );

    return [stateEntry, ...cityEntries];
};

const generateCountrySitemap = async (
    country: string,
    lastModified: Date,
    year: number
): Promise<MetadataRoute.Sitemap> => {
    const countryEntry = getCalendarSitemapEntry(lastModified, {
        country,
        year,
    });

    const { states, cities: countryCities } = await fetchStatesAndCitiesList(
        country
    );

    // Generate sitemaps for states in parallel.
    const stateSitemaps = await Promise.all(
        states.map((state) =>
            generateStateSitemap(
                country,
                state.replace("&", "&amp;"),
                lastModified,
                year
            )
        )
    );

    const countryCityEntries = countryCities.map((city) =>
        getCalendarSitemapEntry(lastModified, {
            country,
            city: city.replace("&", "&amp;"),
            year,
        })
    );

    return [countryEntry, ...stateSitemaps.flat(), ...countryCityEntries];
};

const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const lastModified = new Date();
    const year = lastModified.getFullYear();

    const { countries } = await fetchCountriesList();

    // Generate sitemaps for countries in parallel.
    const countrySitemaps = await Promise.all(
        countries.map((country) =>
            generateCountrySitemap(
                country.replace("&", "&amp;"),
                lastModified,
                year
            )
        )
    );

    return [
        {
            url: process.env.WEBSITE_URL!,
            lastModified,
            changeFrequency: "yearly",
            priority: 1,
        },
        ...countrySitemaps.flat(),
    ];
};

export default generateSitemap;
