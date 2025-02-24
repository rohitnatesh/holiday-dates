"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

const contactUsLink = (
    <Button asChild variant="link" className="inline p-0">
        <a href="mailto:info@worldholidaysandevents.com">
            info@worldholidaysandevents.com
        </a>
    </Button>
);

const modals = {
    disclaimer: {
        title: "Disclaimer",
        content:
            "We strive for accuracy but cannot guarantee that all information on this site is correct. Dates of many Muslim, Hindu, and Buddhist holidays may vary based on local proclamations. Please verify with official sources.",
    },
    errors: {
        title: "Report Errors",
        content: (
            <>
                Spotted an error or have suggestions? Let us know at{" "}
                {contactUsLink}.
            </>
        ),
    },
    developers: {
        title: "For Developers",
        content: (
            <>
                Access our holiday and event data via a REST API. Send a locale
                and date range, and receive a list of events for that period.
                Contact us for details at {contactUsLink}.
            </>
        ),
    },
    acknowledgment: {
        title: "Acknowledgment",
        content:
            "This site uses the Calendrica software package, as described in Calendrical Calculations: Third Edition by Nachum Dershowitz & Edward M. Reingold (Cambridge University Press, 2008).",
    },
};

type ModalsType = keyof typeof modals;

const footerOrder: Array<ModalsType> = [
    "disclaimer",
    "errors",
    "developers",
    "acknowledgment",
];

const FooterModal = ({
    title,
    content,
    onClose,
}: {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
}) => {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <section className="leading-7">{content}</section>
                <DialogFooter>
                    <Button asChild variant="secondary">
                        <DialogClose>Okay</DialogClose>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const Footer = () => {
    const [modal, setModal] = useState<ModalsType | null>(null);

    const handleClick = (modalType: ModalsType) => {
        setModal(modalType);
    };

    const handleModalClose = () => {
        setModal(null);
    };

    return (
        <>
            <footer className="px-8 md:px-12 pb-8 mt-8 max-w-full bottom-full">
                <ul className="flex flex-wrap">
                    {footerOrder.map((modalType) => (
                        <li
                            key={modalType}
                            className="border-r-[1px] last:border-none border-slate-300 mb-2"
                        >
                            <Button
                                onClick={() => handleClick(modalType)}
                                variant="link"
                            >
                                {modals[modalType].title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </footer>
            {modal && (
                <FooterModal
                    title={modals[modal].title}
                    content={modals[modal].content}
                    onClose={handleModalClose}
                />
            )}
        </>
    );
};
