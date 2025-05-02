import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password - World Holidays and Events",
};

export default function ForgotPasswordPage() {
    return (
        <PageBaseWithNav>
            <AuthenticationForm mode="forgot_password" />
        </PageBaseWithNav>
    );
}
