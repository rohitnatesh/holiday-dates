"use client";

import { sendNotification } from "@/components/notification";
import { Button } from "@/components/ui/button";
import { initCheckout } from "@/utilities/actions/checkout";
import { useState } from "react";

export const SubscribeButton = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const { error } = await initCheckout();
        setLoading(false);

        if (error) {
            sendNotification("subscription_failed");
        }
    };

    return (
        <Button className="mt-4" onClick={handleSubmit} disabled={loading}>
            Subscribe
        </Button>
    );
};
