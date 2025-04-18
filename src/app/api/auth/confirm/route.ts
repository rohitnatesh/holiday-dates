import { NotificationMessagesType } from "@/components/notification";
import {
    authenticateWithToken,
    getUserDetails,
} from "@/utilities/actions/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const tokenHash = request.nextUrl.searchParams.get("token_hash");
    const user = await getUserDetails();

    if (user) redirect("/");

    if (!tokenHash) {
        const notificationType: NotificationMessagesType = "token_invalid";
        redirect(`/login?notification=${notificationType}`);
    }

    const { error } = await authenticateWithToken(tokenHash);

    if (error) {
        const notificationType: NotificationMessagesType = "token_invalid";
        redirect(`/login?notification=${notificationType}`);
    } else {
        redirect("/change-password");
    }
};
