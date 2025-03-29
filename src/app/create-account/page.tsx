import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { Suspense } from "react";

export default function CreateAccountPage() {
    return (
        <PageBaseWithNav>
            <Suspense>
                <AuthenticationForm mode="create_account" />
            </Suspense>
        </PageBaseWithNav>
    );
}
