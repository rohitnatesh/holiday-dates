"use client";

import { useState, useTransition } from "react";
import { SelectWithInfo } from "@/components/ui/select-with-info";
import { Button } from "@/components/ui/button";
import {
    fetchCitiesList,
    fetchStatesAndCitiesList,
} from "@/utilities/fetchData";

const additionalInfoTexts = {
    country:
        "Selecting a country displays holidays and events observed countrywide. If specific states or cities have unique holidays, they can be selected next.",
    state: "A state is listed only if it has holidays or events unique to the state or its cities.",
    city: "A city is listed only if it has unique holidays or events unique to the city.",
};

export const Form = ({ countries }: { countries: string[] }) => {
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");

    const [isStatesAndCityPending, startStatesAndCityTransition] =
        useTransition();
    const [isCityPending, startCityTransition] = useTransition();

    const isStatesDisabled = states.length === 0 || isStatesAndCityPending;
    const isCitiesDisabled =
        cities.length === 0 || isStatesAndCityPending || isCityPending;

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        setSelectedState("");
        setSelectedCity("");

        startStatesAndCityTransition(async () => {
            const { states, cities } = await fetchStatesAndCitiesList(country);
            setStates(states);
            setCities(cities);
        });
    };

    const handleStateChange = (state: string) => {
        setSelectedState(state);
        setSelectedCity("");

        startCityTransition(async () => {
            const { cities } = await fetchCitiesList(selectedCountry, state);
            setCities(cities);
        });
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

            <Button className="mt-24">Explore</Button>
        </form>
    );
};
