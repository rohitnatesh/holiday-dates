import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
            <body>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="3rem"
                    marginBottom="2rem"
                    component="header"
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        style={{ userSelect: "none" }}
                    >
                        World Holidays and Events
                    </Typography>
                </Box>
                {children}
            </body>
        </html>
    );
}
