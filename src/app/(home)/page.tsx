import { Form } from "./form";
import { fetchCountriesList } from "@/utilities/actions";

const Page = async () => {
    const { countries } = await fetchCountriesList();

    return (
        <section className="sm:ml-4">
            <Form countries={countries} />
        </section>
    );
};

export default Page;
