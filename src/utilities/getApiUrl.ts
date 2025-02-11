export const getApiUrl = (
    resource: string,
    substitutes?: { [key: string]: string }
) => {
    let path = process.env[resource];

    if (!path) throw new Error("getApiUrl: Resource does not exist.");

    if (substitutes) {
        Object.entries(substitutes).forEach(([key, value]) => {
            path = path!.replace(`{${key}}`, value);
        });
    }

    return `${process.env.API_DOMAIN}${process.env.API_BASE}${path}`;
};
