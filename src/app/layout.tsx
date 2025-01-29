import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "World Holidays and Events",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-slate-50 px-12 py-8">
                <header>
                    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mt-8">
                        World Holidays and Events
                    </h1>
                </header>
                {children}
            </body>
        </html>
    );
}
