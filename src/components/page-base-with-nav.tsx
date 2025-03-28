import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PageBaseWithNav({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <nav>
                <Button
                    asChild
                    className="gap-0 text-slate-700 px-0"
                    variant="link"
                >
                    <Link href="/">
                        <ChevronLeft /> Home
                    </Link>
                </Button>
            </nav>

            {children}
        </>
    );
}
