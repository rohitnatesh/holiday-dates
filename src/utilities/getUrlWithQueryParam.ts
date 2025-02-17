export const getUrlWithQueryParam = (
    url: string,
    params?: { [key: string]: string | number | undefined },
    separator: string = "&"
) => {
    if (!params) return url;

    const queryParams: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "none") return;
        queryParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
    });

    if (!queryParams.length) return url;

    return `${url}?${queryParams.join(separator)}`;
};
