import { Suspense } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { AccountDropdown } from "@/components/account-dropdown";
import { Notification } from "@/components/notification";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "World Holidays and Events",
    description:
        "Explore holidays and events worldwide for any year! Simply select a location and year to start exploring.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <header className="px-8 md:px-12 pt-6 md:pt-10 pb-8 max-w-screen-lg lg:mx-auto">
                    <AccountDropdown />
                    <h1 className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-5xl">
                        <Link href="/">World Holidays and Events</Link>
                    </h1>
                    <p className="text-md sm:text-xl text-muted-foreground mt-2">
                        Explore holidays and events worldwide
                    </p>
                </header>
                <main className="px-8 md:px-12 pb-12 max-w-screen-lg lg:mx-auto">
                    {children}
                </main>
                <Footer />
                <Suspense>
                    <Notification />
                </Suspense>
            </body>
        </html>
    );
}
