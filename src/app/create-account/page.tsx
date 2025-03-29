import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";

export default function CreateAccountPage() {
    return (
        <PageBaseWithNav>
            <AuthenticationForm mode="create_account" />
        </PageBaseWithNav>
    );
}
