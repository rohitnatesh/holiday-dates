"use client";

import { MouseEventHandler, useState, useTransition } from "react";
import { SelectWithInfo } from "@/components/ui/select-with-info";
import { Button } from "@/components/ui/button";
import { YearPicker } from "@/components/ui/year-picker";
import { fetchCitiesList, fetchStatesAndCitiesList } from "@/utilities/actions";
import { useRouter } from "next/navigation";
import { getUrlWithQueryParam } from "@/utilities/getUrlWithQueryParam";

const additionalInfoTexts = {
    country:
        "Selecting a country displays holidays and events observed countrywide. If specific states or cities have unique holidays, they can be selected next.",
    state: "A state is listed only if it has holidays or events unique to the state or its cities.",
    city: "A city is listed only if it has unique holidays or events unique to the city.",
    year: " Holidays and events for the current year are available for free. Logging into a profile is required to access information for other years.",
};

export const Form = ({ countries }: { countries: string[] }) => {
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("none");
    const [selectedState, setSelectedState] = useState("none");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [isStatesAndCityPending, startStatesAndCityTransition] =
        useTransition();
    const [isCityPending, startCityTransition] = useTransition();

    const router = useRouter();

    const isStatesDisabled = states.length === 0 || isStatesAndCityPending;
    const isCitiesDisabled =
        cities.length === 0 || isStatesAndCityPending || isCityPending;

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        setSelectedState("none");
        setSelectedCity("none");

        startStatesAndCityTransition(async () => {
            const { states, cities } = await fetchStatesAndCitiesList(country);
            setStates(states);
            setCities(cities);
        });
    };

    const handleStateChange = (state: string) => {
        setSelectedState(state);
        setSelectedCity("none");

        startCityTransition(async () => {
            const { cities } = await fetchCitiesList(selectedCountry, state);
            setCities(cities);
        });
    };

    const handleExplore: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const calendarUrl = getUrlWithQueryParam("/calendar", {
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            year: selectedYear,
        });

        router.push(calendarUrl);
    };

    return (
        <form className="sm:w-2/4 md:w-2/4 lg:w-1/4 space-y-6">
            <SelectWithInfo
                label="Country"
                id="country-dropdown"
                options={countries}
                additionalInfo={additionalInfoTexts.country}
                onChange={handleCountryChange}
                value={selectedCountry}
                disabled={isStatesAndCityPending}
            />

            <SelectWithInfo
                label="State/Province"
                id="state-dropdown"
                options={states}
                additionalInfo={additionalInfoTexts.state}
                optional
                disabled={isStatesDisabled}
                loading={isStatesAndCityPending}
                onChange={handleStateChange}
                value={selectedState}
            />

            <SelectWithInfo
                label="City"
                id="city-dropdown"
                options={cities}
                additionalInfo={additionalInfoTexts.city}
                optional
                disabled={isCitiesDisabled}
                loading={isStatesAndCityPending || isCityPending}
                onChange={setSelectedCity}
                value={selectedCity}
            />
            <YearPicker
                label="Year"
                additionalInfo={additionalInfoTexts.year}
                id="year-picker"
                value={selectedYear}
                onChange={setSelectedYear}
            />
            <Button
                disabled={!selectedCountry}
                onClick={handleExplore}
                className="!mt-10"
            >
                Explore
            </Button>
        </form>
    );
};
