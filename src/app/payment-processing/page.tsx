"use server";

import { updateSubscriptionStatus } from "@/utilities/actions/subscription";
import { stripe } from "@/utilities/stripe";
import { redirect } from "next/navigation";

const PaymentProcessingPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamEntries = await searchParams;
    let checkoutSessionId = searchParamEntries["checkout_session_id"];

    if (Array.isArray(checkoutSessionId)) {
        checkoutSessionId = checkoutSessionId[0];
    }

    if (!checkoutSessionId)
        return redirect("/subscription?notification=subscription_pending");

    const checkoutSession = await stripe.checkout.sessions.retrieve(
        checkoutSessionId
    );

    if (checkoutSession.payment_status === "paid") {
        await updateSubscriptionStatus();
        return;
    }

    return redirect("/subscription?notification=subscription_pending");
};

export default PaymentProcessingPage;
