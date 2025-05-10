// Duration in ms.
const TIMEOUT_DURATION = 10000;

export const fetchWithTimeout = (...args: Parameters<typeof fetch>) =>
    Promise.race<Response>([
        fetch(...args),
        new Promise((resolve, reject) =>
            setTimeout(
                () =>
                    reject(
                        new Response(null, {
                            status: 408,
                            statusText: "Request timed out!",
                        })
                    ),
                TIMEOUT_DURATION
            )
        ),
    ]);
