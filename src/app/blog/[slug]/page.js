import BlogData from "@/data/Data";
import { getAllBlogSlugs, getBlogPostBySlug, getAllBlogPosts } from "@/lib/mdx";
import BlogPostClient from "./BlogPostClient";
import MdxBlogPost from "./MdxBlogPost";
import { notFound } from "next/navigation";

// Generate static params for ALL blog posts — Data.js + MDX (SSG)
export async function generateStaticParams() {
    const dataJsSlugs = BlogData.map((blog) => ({
        slug: blog.slug,
    }));

    const mdxSlugs = getAllBlogSlugs().map((slug) => ({
        slug,
    }));

    return [...dataJsSlugs, ...mdxSlugs];
}

// Generate metadata for each blog post dynamically
export async function generateMetadata({ params }) {
    const { slug } = await params;

    // Check MDX first, then Data.js
    const mdxPost = getBlogPostBySlug(slug);
    const dataPost = BlogData.find((b) => b.slug === slug);
    const blog = mdxPost || dataPost;

    if (!blog) {
        return {
            title: "Blog Not Found",
        };
    }

    return {
        title: blog.title,
        description: blog.description,
        keywords:
            blog.tags?.join(", ") ||
            "temporary email, disposable email, secure email",
        authors: [{ name: blog.author || "Tempmail.sbs", url: "https://tempmail.sbs" }],
        openGraph: {
            type: "article",
            title: blog.title,
            description: blog.description,
            images: [
                {
                    url: blog.image ? `https://www.tempmail.sbs${blog.image}` : "https://www.tempmail.sbs/favicon.png",
                    alt: blog.title,
                },
            ],
            url: `https://www.tempmail.sbs/blog/${blog.slug}`,
            siteName: "Tempmail.sbs",
            publishedTime: blog.date,
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.description,
            images: [blog.image ? `https://www.tempmail.sbs${blog.image}` : "https://www.tempmail.sbs/favicon.png"],
            site: "@tempmail_sbs",
        },
        alternates: {
            canonical: `https://www.tempmail.sbs/blog/${blog.slug}`,
        },
    };
}

export default async function BlogPage({ params }) {
    const { slug } = await params;

    // Check MDX first
    const mdxPost = getBlogPostBySlug(slug);

    if (mdxPost) {
        // Get related posts from both sources
        const allMdxPosts = getAllBlogPosts();
        const allPosts = [...allMdxPosts, ...BlogData];
        const relatedPosts = allPosts
            .filter(
                (b) =>
                    b.slug !== slug &&
                    (b.category === mdxPost.category ||
                        b.tags?.some((tag) => mdxPost.tags?.includes(tag)))
            )
            .slice(0, 3);

        const wordCount = mdxPost.content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        return (
            <>
                {/* Structured Data - BlogPosting Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: mdxPost.title,
                            description: mdxPost.description,
                            image: mdxPost.image ? `https://www.tempmail.sbs${mdxPost.image}` : "https://www.tempmail.sbs/favicon.png",
                            datePublished: mdxPost.date,
                            dateModified: mdxPost.date,
                            author: {
                                "@type": "Organization",
                                name: mdxPost.author || "Tempmail.sbs",
                                url: "https://tempmail.sbs",
                            },
                            publisher: {
                                "@type": "Organization",
                                name: "Tempmail.sbs",
                                logo: {
                                    "@type": "ImageObject",
                                    url: "https://tempmail.sbs/favicon.png",
                                },
                            },
                            mainEntityOfPage: {
                                "@type": "WebPage",
                                "@id": `https://www.tempmail.sbs/blog/${mdxPost.slug}`,
                            },
                            keywords: mdxPost.tags?.join(", "),
                        }),
                    }}
                />

                <MdxBlogPost
                    blog={mdxPost}
                    relatedPosts={relatedPosts}
                    readingTime={readingTime}
                />
            </>
        );
    }

    // Fallback to Data.js blog
    const blog = BlogData.find((b) => b.slug === slug);

    if (!blog) {
        notFound();
    }

    // Find related posts
    const relatedPosts = BlogData.filter(
        (b) =>
            b.slug !== slug &&
            (b.category === blog.category ||
                b.tags?.some((tag) => blog.tags?.includes(tag)))
    ).slice(0, 3);

    // Calculate reading time
    const wordCount = blog.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <>
            {/* Structured Data - BlogPosting Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: blog.title,
                        description: blog.description,
                        image: blog.image ? (blog.image.startsWith("http") ? blog.image : `https://www.tempmail.sbs${blog.image.replace("./", "/")}`) : "https://www.tempmail.sbs/favicon.png",
                        datePublished: blog.date,
                        dateModified: blog.date,
                        author: {
                            "@type": "Organization",
                            name: "Tempmail.sbs",
                            url: "https://tempmail.sbs",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Tempmail.sbs",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://tempmail.sbs/favicon.png",
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://www.tempmail.sbs/blog/${blog.slug}`,
                        },
                    }),
                }}
            />

            <BlogPostClient
                blog={blog}
                relatedPosts={relatedPosts}
                readingTime={readingTime}
            />
        </>
    );
}
