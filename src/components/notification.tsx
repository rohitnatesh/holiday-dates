"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const NOTIFICATION_MESSAGES = {
    logged_in: "You are logged in. Welcome back!",
    logged_out: "Successfully logged out. See you next time!",
    account_created: "Account created! Welcome, you're now signed in.",
};

export type NotificationMessagesType = keyof typeof NOTIFICATION_MESSAGES;

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

        toast.success(
            NOTIFICATION_MESSAGES[notification as NotificationMessagesType]
        );
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
