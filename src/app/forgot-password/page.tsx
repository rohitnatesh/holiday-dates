import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
    return (
        <PageBaseWithNav>
            <Suspense>
                <AuthenticationForm mode="forgot_password" />
            </Suspense>
        </PageBaseWithNav>
    );
}
