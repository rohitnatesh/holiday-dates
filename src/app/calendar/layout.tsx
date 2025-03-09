import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <nav>
                <Button
                    asChild
                    className="gap-0 text-slate-700 px-0"
                    variant="link"
                >
                    <Link href="/">
                        <ChevronLeft /> Back
                    </Link>
                </Button>
            </nav>

            {children}

            <Button asChild className="mt-14">
                <Link href="/">Explore Another</Link>
            </Button>
        </>
    );
};

export default Layout;
