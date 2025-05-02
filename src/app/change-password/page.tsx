import { AuthenticationForm } from "@/components/authentication-form";
import PageBaseWithNav from "@/components/page-base-with-nav";
import { getUserDetails } from "@/utilities/actions/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Change Password - World Holidays and Events",
};

export default async function ChangePasswordPage() {
    const user = await getUserDetails();

    return (
        <PageBaseWithNav>
            <AuthenticationForm
                userEmail={user?.email}
                mode="change_password"
            />
        </PageBaseWithNav>
    );
}
