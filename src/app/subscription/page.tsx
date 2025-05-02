import PageBaseWithNav from "@/components/page-base-with-nav";
import { Button } from "@/components/ui/button";
import { getUserDetails } from "@/utilities/actions/auth";
import { formatDate } from "@/utilities/formatDate";
import { CalendarCheck2, CalendarPlus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Subscription - World Holidays and Events",
};

export default async function SubscriptionPage() {
    const userDetails = await getUserDetails();
    const isSubscriber = userDetails?.isSubscriber;

    return (
        <PageBaseWithNav>
            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight mt-4 mb-8">
                Subscription
            </h2>

            <div className="ml-4">
                <p className="flex gap-2 text-lg tracking-tight items-center">
                    {isSubscriber ? (
                        <>
                            <CalendarCheck2 className="fill-green-200 size-5" />
                            You&apos;re all set!
                        </>
                    ) : (
                        <>
                            <CalendarPlus className="fill-yellow-200 size-5" />
                            You&apos;re almost there!
                        </>
                    )}
                </p>
                <p className="leading-7 mt-3">
                    {isSubscriber ? (
                        <>
                            You&apos;ve been a subscriber since{" "}
                            <span className="font-bold">
                                {formatDate(userDetails?.subscriptionDate)}
                            </span>
                            .
                        </>
                    ) : (
                        <>
                            Subscribing gives you access to future holidays and
                            events — perfect for planning ahead.
                        </>
                    )}
                </p>
                <p className="mt-2">
                    {isSubscriber
                        ? "Enjoy full access to all future holidays and events. Thanks for being part of the community!"
                        : "Ready to join us?"}
                </p>
                {!isSubscriber && (
                    <Button asChild className="mt-4">
                        <Link href="">Subscribe</Link>
                    </Button>
                )}
            </div>
        </PageBaseWithNav>
    );
}
