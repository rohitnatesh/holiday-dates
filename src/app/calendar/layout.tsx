import PageBaseWithNav from "@/components/page-base-with-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <PageBaseWithNav>
            {children}
            <Button asChild className="mt-8">
                <Link href="/">Explore Another</Link>
            </Button>
        </PageBaseWithNav>
    );
};

export default Layout;
