"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserDetails } from "@/types/UserDetails";
import { createClient } from "@/utilities/supabase/server";

export const getUserDetails = async (): Promise<UserDetails | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error(error);
        return null;
    }

    const { data: userData, error: userError } = await supabase
        .from("user_details")
        .select("name, isSubscriber")
        .eq("id", data.user.id)
        .single();

    if (userError) {
        console.error(userError);
        return null;
    }

    return {
        id: data.user.id,
        email: data.user.email || "",
        name: userData.name || "",
        isSubscriber: Boolean(userData.isSubscriber),
    };
};

export const login = async (
    email: string,
    password: string,
    redirectPath = "/"
) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return { error: true, success: false };

    revalidatePath("/", "layout");
    redirect(redirectPath);
};

export const signup = async (formData: FormData) => {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
};

export const logout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath("/", "layout");
    redirect("/");
};
