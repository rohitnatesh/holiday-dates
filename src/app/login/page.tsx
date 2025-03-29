import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";

export default function LoginPage() {
    return (
        <PageBaseWithNav>
            <AuthenticationForm mode="login" />
        </PageBaseWithNav>
    );
}
