"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserDetails } from "@/types/UserDetails";
import { createClient } from "@/utilities/supabase/server";
import { NotificationMessagesType } from "@/components/notification";
import { isAuthSessionMissingError } from "@supabase/supabase-js";

export const getUserDetails = async (): Promise<UserDetails | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        if (!isAuthSessionMissingError(error)) console.error(error);
        return null;
    }

    const { data: userData, error: userError } = await supabase
        .from("user_details")
        .select("isSubscriber, subscriptionDate")
        .eq("id", data.user.id)
        .single();

    if (userError) {
        console.error(userError);
        return null;
    }

    return {
        id: data.user.id,
        email: data.user.email || "",
        isSubscriber: Boolean(userData.isSubscriber),
        subscriptionDate: userData.subscriptionDate,
    };
};

export const authenticateWithToken = async (tokenHash: string) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "email",
    });

    if (error)
        return {
            error: true,
            errorMessage: "Something went wrong!",
            success: false,
        };

    return {
        error: false,
        errorMessage: null,
        success: true,
    };
};

export const authenticate = async (
    mode: "login" | "create_account",
    email: string,
    password: string,
    calendarParams?: string | null
) => {
    const supabase = await createClient();

    const { error } = await supabase.auth[
        mode === "login" ? "signInWithPassword" : "signUp"
    ]({
        email,
        password,
    });

    if (error)
        return {
            error: true,
            errorMessage:
                error.code === "user_already_exists"
                    ? "User already exists. Please try to login."
                    : "Something went wrong! Please check your email and password and try again.",
            success: false,
        };

    const notificationType: NotificationMessagesType =
        mode === "login" ? "logged_in" : "account_created";

    const redirectUrl = calendarParams
        ? `/calendar?${decodeURIComponent(calendarParams)}&`
        : "/?";

    revalidatePath("/", "layout");
    redirect(`${redirectUrl}notification=${notificationType}`);
};

export const forgotPassword = async (email: string) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.WEBSITE_URL}/change-password`,
    });

    if (error)
        return {
            error: true,
            errorMessage: "Something went wrong! Please try again.",
            success: false,
        };

    const notificationType: NotificationMessagesType =
        "password_reset_link_sent";
    redirect(`/login?notification=${notificationType}`);
};

export const changePassword = async (password: string) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error)
        return {
            error: true,
            errorMessage: "Something went wrong! Please try again.",
            success: false,
        };

    const notificationType: NotificationMessagesType = "password_changed";
    redirect(`/?notification=${notificationType}`);
};

export const logout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath("/", "layout");
    redirect("/?notification=logged_out");
};
