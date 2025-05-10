"use server";

import { verifyCheckout } from "@/utilities/actions/checkout";
import { updateSubscriptionStatus } from "@/utilities/actions/subscription";
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

    const checkoutSuccess = await verifyCheckout(checkoutSessionId);

    if (checkoutSuccess) {
        await updateSubscriptionStatus();
        return;
    }

    return redirect("/subscription?notification=subscription_pending");
};

export default PaymentProcessingPage;
