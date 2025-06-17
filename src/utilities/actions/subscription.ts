"use server";

import { getUserDetails } from "@/utilities/actions/auth";
import { redirect } from "next/navigation";
import { createClient } from "@/utilities/supabase/server";

export const updateSubscription = async () => {
    const userDetails = await getUserDetails();

    if (!userDetails)
        return redirect("/subscription?notification=subscription_pending");

    if (userDetails.isSubscriber) {
        return redirect("/subscription?notification=subscription_success");
    }

    const supabase = await createClient();
    const { error } = await supabase
        .from("user_details")
        .update({
            isSubscriber: true,
            subscriptionDate: new Date().toUTCString(),
        })
        .eq("id", userDetails.id);

    if (error) {
        console.error(error);
        return redirect("/subscription?notification=subscription_pending");
    }

    return redirect("/subscription?notification=subscription_success");
};

export const updateSubscriptionFromWebhook = async (userId: string) => {
    const supabase = await createClient();
    const { error } = await supabase
        .from("user_details")
        .update({
            isSubscriber: true,
            subscriptionDate: new Date().toUTCString(),
        })
        .eq("id", userId);

    return { error: error && error.message };
};
