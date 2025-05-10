"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const NOTIFICATION_MESSAGES = {
    logged_in: "You are logged in. Welcome back!",
    logged_out: "Successfully logged out. See you next time!",
    account_created: "Account created! Welcome, you're now signed in.",
    password_reset_link_sent:
        "Password reset link sent! Check your email to continue.",
    password_changed: "Your password has been changed successfully.",
    token_invalid:
        "Your password reset link is invalid or expired. Please request a new one.",
    subscription_failed:
        "Subscription could not be completed. Please try again or contact us if the issue persists.",
    subscription_success: "You're subscribed! Thank you and welcome aboard.",
    subscription_pending:
        "We are processing your payment and it will be quick. Please check back shortly.",
};

const errorKeys = ["subscription_failed", "token_invalid"];

export type NotificationMessagesType = keyof typeof NOTIFICATION_MESSAGES;

export const sendNotification = (notification: NotificationMessagesType) => {
    const notificationType = errorKeys.includes(notification)
        ? "error"
        : "success";

    toast[notificationType](
        NOTIFICATION_MESSAGES[notification as NotificationMessagesType]
    );
};

export const Notification = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const notification = searchParams.get("notification");

        if (!notification) return;

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("notification");
        router.replace(`${pathname}?${newSearchParams}`);

        if (!(notification in NOTIFICATION_MESSAGES)) return;

        sendNotification(notification as NotificationMessagesType);
    }, [pathname, router, searchParams]);

    return (
        <Toaster
            duration={8000}
            position="bottom-right"
            offset={{ bottom: 80, right: 100 }}
            visibleToasts={1}
            richColors
        />
    );
};
