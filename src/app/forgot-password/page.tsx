import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";

export default function ForgotPasswordPage() {
    return (
        <PageBaseWithNav>
            <AuthenticationForm mode="forgot_password" />
        </PageBaseWithNav>
    );
}
