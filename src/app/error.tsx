"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error.message);
    }, [error]);

    return (
        <section>
            <Alert variant="destructive" className="max-w-fit">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Oops! Something&apos;s Not Right</AlertTitle>
                <AlertDescription className="pr-8">
                    There was a problem with this section.
                    <Button
                        variant="link"
                        className="px-2"
                        onClick={() => reset()}
                    >
                        Try Again?
                    </Button>
                </AlertDescription>
            </Alert>
        </section>
    );
}
