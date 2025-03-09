"use client";

import { CircleUserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoggedIn } from "@/utilities/useLoggedIn";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { ReactNode } from "react";
import { logout } from "@/utilities/actions/auth";

const DropdownMenuLink = ({
    children,
    href,
}: {
    children: ReactNode;
    href: string;
}) => (
    <DropdownMenuItem asChild className="block">
        <Button asChild variant="link">
            <Link href={href}>{children}</Link>
        </Button>
    </DropdownMenuItem>
);

export const AccountDropdown = () => {
    const { isLoggedIn, refresh } = useLoggedIn();

    const handleClick = () => {};

    return (
        <nav className="flex flex-row-reverse mb-1">
            <DropdownMenu onOpenChange={refresh} modal>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="size-9 rounded-2xl"
                        title="Account"
                        onClick={handleClick}
                    >
                        <CircleUserIcon className="!size-8" />
                        <span className="sr-only">Account</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {isLoggedIn ? (
                        <>
                            <DropdownMenuLink href="/change-password">
                                Profile
                            </DropdownMenuLink>
                            <DropdownMenuLink href="/subscription">
                                Subscription
                            </DropdownMenuLink>
                            <DropdownMenuItem asChild>
                                <Button
                                    variant="link"
                                    className="w-full justify-start"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <DropdownMenuLink href="/login">Login</DropdownMenuLink>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
};
