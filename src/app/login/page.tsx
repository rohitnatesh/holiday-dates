import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <PageBaseWithNav>
            <Suspense>
                <AuthenticationForm mode="login" />
            </Suspense>
        </PageBaseWithNav>
    );
}
