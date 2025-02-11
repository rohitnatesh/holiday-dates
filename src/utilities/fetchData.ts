"use server";

import { getApiUrl } from "@/utilities/getApiUrl";
import { ListResponse } from "@/types/ListResponse";
import mockCountriesList from "@/mocks/countries.json";
import mockStatesList from "@/mocks/countryStates.json";

export const fetchCountriesList = async () => {
    if (process.env.NODE_ENV === "production") {
        try {
            const countriesApi = getApiUrl("COUNTRY_LIST");
            const countriesResponse = await fetch(countriesApi, {});
            const countriesList: ListResponse = await countriesResponse.json();

            return { countries: countriesList.theList };
        } catch (error) {
            console.error(error);
            return { countries: [], error: true };
        }
    } else {
        return new Promise<{ countries: ListResponse["theList"] }>((resolve) =>
            setTimeout(
                () => resolve({ countries: mockCountriesList.theList }),
                1000
            )
        );
    }
};

export const fetchStatesAndCitiesList = async (country: string) => {
    if (process.env.NODE_ENV === "production") {
        try {
            const countryStateApi = getApiUrl("COUNTRY_STATE_LIST", {
                country,
            });
            const countryCityApi = getApiUrl("COUNTRY_CITY_LIST", { country });

            const [statesResponse, citiesResponse] = await Promise.all([
                fetch(countryStateApi),
                fetch(countryCityApi),
            ]);

            const statesList: ListResponse = await statesResponse.json();
            const citiesList: ListResponse = await citiesResponse.json();

            return {
                states: statesList.theList,
                cities: citiesList.theList,
            };
        } catch (error) {
            console.error(error);
            return {
                states: [],
                cities: [],
                error: true,
            };
        }
    } else {
        return new Promise<{
            states: ListResponse["theList"];
            cities: ListResponse["theList"];
        }>((resolve) =>
            setTimeout(
                () =>
                    resolve({
                        states: mockStatesList.theList,
                        cities: mockStatesList.theList,
                    }),
                1000
            )
        );
    }
};

export const fetchCitiesList = async (country: string, state: string) => {
    if (process.env.NODE_ENV === "production") {
        try {
            const countryStateCityApi = getApiUrl("COUNTRY_STATE_CITY_LIST", {
                country,
                state,
            });
            const citiesResponse = await fetch(countryStateCityApi);
            const citiesList: ListResponse = await citiesResponse.json();

            return { cities: citiesList.theList };
        } catch (error) {
            console.error(error);
            return {
                cities: [],
                error: true,
            };
        }
    } else {
        return new Promise<{ cities: ListResponse["theList"] }>((resolve) =>
            setTimeout(() => resolve({ cities: mockStatesList.theList }))
        );
    }
};
