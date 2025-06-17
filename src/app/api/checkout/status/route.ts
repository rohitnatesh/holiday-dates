import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/utilities/stripe";
import { updateSubscriptionFromWebhook } from "@/utilities/actions/subscription";

export const POST = async (request: NextRequest) => {
    const requestBody = await request.text();
    const requestHeaders = await headers();
    const signature = requestHeaders.get("Stripe-Signature") as string;

    try {
        const event = stripe.webhooks.constructEvent(
            requestBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            const checkoutSession = await stripe.checkout.sessions.retrieve(
                event.id
            );
            if (!checkoutSession)
                throw new Error("Session not found. " + request);

            const { internalUserId } = checkoutSession.metadata || {};
            if (!internalUserId)
                throw new Error("Metadata not valid. " + request);

            const { error } = await updateSubscriptionFromWebhook(
                internalUserId
            );
            if (error) throw new Error(error);
        }
    } catch (error) {
        console.error("Checkout webhook: ", error);
        return new Response("Something went wrong.", { status: 500 });
    }

    return Response.json({ received: true });
};
