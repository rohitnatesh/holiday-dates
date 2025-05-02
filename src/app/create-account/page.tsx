import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account - World Holidays and Events",
};

export default function CreateAccountPage() {
    return (
        <PageBaseWithNav>
            <AuthenticationForm mode="create_account" />
        </PageBaseWithNav>
    );
}
