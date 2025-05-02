import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - World Holidays and Events",
};

export default function LoginPage() {
    return (
        <PageBaseWithNav>
            <AuthenticationForm mode="login" />
        </PageBaseWithNav>
    );
}
