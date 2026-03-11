import BlogData from "@/data/Data";
import { getAllBlogPosts } from "@/lib/mdx";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export const metadata = {
    title: "Blog | Tempmail.sbs - Secure Temporary Email Service",
    description:
        "Learn about temporary email, privacy, and spam protection. Read our latest blog posts on TempMail.sbs.",
    openGraph: {
        title: "Blog",
        description:
            "Learn about temporary email, privacy, and spam protection.",
        url: "https://www.tempmail.sbs/blogs",
    },
    alternates: {
        canonical: "https://www.tempmail.sbs/blogs",
    },
};

export default function BlogPage() {
    // Get MDX blog posts
    const mdxPosts = getAllBlogPosts();

    // Merge Data.js blogs with MDX blogs
    const allPosts = [
        ...mdxPosts.map((post) => ({
            ...post,
            source: "mdx",
        })),
        ...BlogData.map((post) => ({
            ...post,
            source: "data",
        })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        TempMail Blog
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Tips, guides, and insights about temporary email, online privacy,
                        and spam protection.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {allPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No blog posts yet.</p>
                        <Link
                            href="/"
                            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Go Home
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allPosts.map((blog, index) => (
                            <BlogCard key={blog.slug || index} blog={blog} />
                        ))}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 text-white py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Protect Your Inbox Today
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Get a free temporary email address instantly — no signup required.
                    </p>
                    <Link
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg"
                    >
                        Get Free Temp Email
                    </Link>
                </div>
            </div>
        </div>
    );
}
