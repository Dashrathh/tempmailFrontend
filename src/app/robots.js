export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/faviconEmail.png"],
            },
        ],
        sitemap: "https://www.tempmail.sbs/sitemap.xml",
    };
}
