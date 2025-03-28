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
import { login } from "@/utilities/actions/auth";
import Link from "next/link";

export const CreateAccountForm = ({}) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(false);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            setError(true);
            return;
        }

        startTransition(async () => {
            const { error } = await login(email, password);
            setError(Boolean(error));
        });
    };

    return (
        <div className="flex sm:ml-4 mt-4">
            <Card className="max-w-96 w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>
                        Enter your email and password to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <p className="font-medium leading-snug mb-4 text-red-600">
                            Something went wrong! Please check your email and
                            password and try again.
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
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                Create Account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="underline underline-offset-4"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
