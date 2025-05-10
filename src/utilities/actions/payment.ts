"use server";

import { stripe } from "@/utilities/stripe";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { getUserDetails } from "./auth";

export const initPayment = async () => {
    const userDetails = await getUserDetails();

    if (!userDetails) return { error: true };

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: process.env.SUBSCRIPTION_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.WEBSITE_URL}payment-processing?checkout_session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.WEBSITE_URL}subscription?notification=subscription_failed`,
            customer_email: userDetails.email,
            metadata: {
                internalUserId: userDetails.id,
                email: userDetails.email,
            },
        });

        if (!session.url) return { error: true };

        revalidatePath("/", "layout");
        redirect(session.url);
    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }

        console.error(err);
        return { error: true };
    }
};
