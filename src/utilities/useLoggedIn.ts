"use client";

import { createClient } from "@/utilities/supabase/client";
import { useCallback, useEffect, useState } from "react";

export const useLoggedIn = () => {
    const [supabase] = useState(() => createClient());
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Manually need to check the refresh state because
    // the auth listener is not working correctly.
    const refresh = useCallback(async () => {
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(Boolean(data?.session?.user));
    }, [supabase]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { isLoggedIn, refresh };
};
