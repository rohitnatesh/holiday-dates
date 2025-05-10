import { Form } from "./form";
import { fetchCountriesList } from "@/utilities/actions/data";

const Page = async () => {
    const { countries } = await fetchCountriesList();

    if (!countries?.length) throw new Error("Countries list is empty.");

    return (
        <section className="sm:ml-4">
            <Form countries={countries} />
        </section>
    );
};

export default Page;
