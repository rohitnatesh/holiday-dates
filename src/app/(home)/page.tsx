import { getApiUrl } from "@/utilities/getApiUrl";
import { ListResponse } from "@/types/ListResponse";
import mockCountriesList from "@/mocks/countries.json";
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

const countriesApi = getApiUrl("COUNTRY_LIST");

const fetchCountriesList = async () => {
    // const countriesResponse = await fetch(countriesApi, {});
    // const countriesList: ListResponse = await countriesResponse.json();

    // return countriesList.theList;

    return new Promise<ListResponse["theList"]>((resolve) =>
        setTimeout(() => resolve(mockCountriesList.theList), 1000)
    );
};

const SelectWithInfo = ({
    label,
    id,
    options,
    optional,
    additionalInfo,
}: {
    label: string;
    id: string;
    options: Array<string>;
    optional?: boolean;
    additionalInfo: string;
}) => {
    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <Label htmlFor={id}>
                    Select a {label}
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

            <Select>
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
        </div>
    );
};

const additionalInfoTexts = {
    country:
        "Selecting a country displays holidays and events observed countrywide. If specific states or cities have unique holidays, they can be selected next.",
    state: "A state is listed only if it has holidays or events unique to the state or its cities.",
    city: "A city is listed only if it has unique holidays or events unique to the city.",
};

export default async function Home() {
    const countriesList = await fetchCountriesList();

    return (
        <section className="sm:ml-4">
            <form className="sm:w-2/3 lg:w-1/3 space-y-6">
                <SelectWithInfo
                    label="Country"
                    id="country-dropdown"
                    options={countriesList}
                    additionalInfo={additionalInfoTexts.country}
                />

                <SelectWithInfo
                    label="State/Province"
                    id="state-dropdown"
                    options={countriesList}
                    additionalInfo={additionalInfoTexts.state}
                    optional
                />

                <SelectWithInfo
                    label="City"
                    id="city-dropdown"
                    options={countriesList}
                    additionalInfo={additionalInfoTexts.city}
                    optional
                />
            </form>
        </section>
    );
}
