"use client";

import { FormEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate, forgotPassword } from "@/utilities/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const authenticationStrings = {
    login: {
        otherAuthenticationBaseUrl: "/create-account",
        heading: "Login",
        description: "Enter your email below to login to your account",
        submitButtonText: "Login",
        footerText: "Don't have an account? ",
        footerLinkText: "Create Account",
    },
    create_account: {
        otherAuthenticationBaseUrl: "/login",
        heading: "Create Account",
        description: "Enter your email and password to create your account",
        submitButtonText: "Create Account",
        footerText: "Already have an account? ",
        footerLinkText: "Login",
    },
    forgot_password: {
        otherAuthenticationBaseUrl: "/login",
        heading: "Forgot Password",
        description: "A password reset link will be emailed to you",
        submitButtonText: "Send Reset Link",
        footerText: "Remembered your password? ",
        footerLinkText: "Login",
    },
};

export const AuthenticationForm = ({
    mode,
}: {
    mode: "login" | "create_account" | "forgot_password";
}) => {
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const strings = authenticationStrings[mode];

    const searchParam = useSearchParams();
    const calendarParam = searchParam.get("calendarParam");
    const otherAuthenticationUrl = `${strings.otherAuthenticationBaseUrl}${
        calendarParam
            ? `?calendarParam=${encodeURIComponent(calendarParam)}`
            : ""
    }`;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirm-password")?.toString();

        if (mode === "forgot_password" && !email?.length) {
            setErrorMessage("Email is required.");
            return;
        }

        if (
            mode !== "forgot_password" &&
            (!email?.length || !password?.length)
        ) {
            setErrorMessage("Email and password are required.");
            return;
        }

        if (mode === "create_account" && password !== confirmPassword) {
            setErrorMessage("Passwords are not matching! Please try again.");
            return;
        }

        startTransition(async () => {
            const response =
                mode === "forgot_password"
                    ? forgotPassword(email!)
                    : authenticate(mode, email!, password!, calendarParam);

            const { error, errorMessage } = await response;

            if (error) {
                setErrorMessage(error ? errorMessage : "Something went wrong!");
            }
        });
    };

    return (
        <div className="flex sm:ml-4 mt-4">
            <Card className="max-w-96 w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {strings.heading}
                    </CardTitle>
                    <CardDescription>{strings.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {errorMessage !== null && (
                        <p className="font-medium leading-snug mb-4 text-red-600">
                            {errorMessage}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="me@example.com"
                                    required
                                />
                            </div>
                            {mode !== "forgot_password" && (
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        {mode === "login" && (
                                            <a
                                                href="/forgot-password"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        {...(mode === "create_account" && {
                                            autoComplete: "new-password",
                                        })}
                                    />
                                </div>
                            )}
                            {mode === "create_account" && (
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        name="confirm-password"
                                        autoComplete="new-password"
                                        required
                                    />
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {strings.submitButtonText}
                            </Button>
                        </div>
                        <div className="mt-6 text-center text-sm">
                            {strings.footerText}
                            <Link
                                href={otherAuthenticationUrl}
                                className="underline underline-offset-4"
                            >
                                {strings.footerLinkText}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
