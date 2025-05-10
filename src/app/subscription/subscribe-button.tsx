"use client";

import { sendNotification } from "@/components/notification";
import { Button } from "@/components/ui/button";
import { initPayment } from "@/utilities/actions/payment";
import { useState } from "react";

export const SubscribeButton = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const { error } = await initPayment();
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
