import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${process.env.WEBSITE_URL}sitemap.xml`,
    };
};

export default robots;
