"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const mdxComponents = {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 leading-tight">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-10 pb-2 border-b border-gray-200">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-gray-700 leading-relaxed mb-4 text-base">{children}</p>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors font-medium"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 pl-2">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700 pl-2">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-3 pr-4 my-6 rounded-r-lg text-gray-700 italic">
            {children}
        </blockquote>
    ),
    strong: ({ children }) => (
        <strong className="font-bold text-gray-900">{children}</strong>
    ),
    table: ({ children }) => (
        <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200">
            <table className="min-w-full">{children}</table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-gray-50">{children}</thead>
    ),
    th: ({ children }) => (
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
            {children}
        </td>
    ),
    tr: ({ children }) => (
        <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
    ),
    hr: () => <hr className="my-8 border-gray-200" />,
};

export default function MdxBlogPost({ blog, relatedPosts, readingTime }) {
    const [mdxSource, setMdxSource] = useState(null);
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Serialize MDX content on the client
        async function compileMdx() {
            try {
                const source = await serialize(blog.content, {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                });
                setMdxSource(source);
            } catch (error) {
                console.error("Error compiling MDX:", error);
            }
        }
        compileMdx();
    }, [blog.content]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const progress = (scrollTop / (docHeight - windowHeight)) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const shareOnSocial = (platform) => {
        const url = window.location.href;
        const title = blog?.title || "Check out this blog post";

        switch (platform) {
            case "x":
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
                    "_blank"
                );
                break;
            case "facebook":
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    "_blank"
                );
                break;
            case "linkedin":
                window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                    "_blank"
                );
                break;
            default:
                break;
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            {/* Breadcrumb Navigation */}
            <nav className="text-sm mb-6" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center space-x-2 text-gray-600">
                    <li>
                        <Link href="/" className="hover:text-blue-600 transition">
                            Home
                        </Link>
                    </li>
                    <li className="before:content-['/'] before:mr-2">
                        <Link href="/blogs" className="hover:text-blue-600 transition">
                            Blog
                        </Link>
                    </li>
                    {blog.category && (
                        <li className="before:content-['/'] before:mr-2">
                            <span className="text-blue-500">{blog.category}</span>
                        </li>
                    )}
                    <li className="before:content-['/'] before:mr-2">
                        <span className="text-gray-400" aria-current="page">
                            {blog.title}
                        </span>
                    </li>
                </ol>
            </nav>

            <article>
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <time dateTime={new Date(blog.date).toISOString()}>
                                {new Date(blog.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>

                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{readingTime} min read</span>
                        </div>

                        {blog.category && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                {blog.category}
                            </span>
                        )}

                        {blog.author && (
                            <span className="text-gray-500">By {blog.author}</span>
                        )}
                    </div>

                    {/* Social sharing buttons */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/faviconEmail.png"
                                alt="Tempmail.sbs"
                                loading="lazy"
                                className="w-10 h-10 rounded-lg mr-3 border border-gray-200"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Share this article
                                </p>
                                <p className="text-xs text-gray-500">
                                    Help others discover this content
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => shareOnSocial("x")}
                                className="flex items-center gap-1 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm transition"
                            >
                                Share on X
                            </button>
                            <button
                                onClick={() => shareOnSocial("facebook")}
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition"
                            >
                                Share on Facebook
                            </button>
                            <button
                                onClick={() => shareOnSocial("linkedin")}
                                className="flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md text-sm transition"
                            >
                                Share on LinkedIn
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm transition"
                            >
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {blog.image && (
                        <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-100 aspect-video">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    )}
                </header>

                {/* MDX Content */}
                <div className="prose-custom">
                    {mdxSource ? (
                        <MDXRemote {...mdxSource} components={mdxComponents} />
                    ) : (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            <span className="ml-3 text-gray-500">Loading content...</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}


            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="mt-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">You Might Also Like</h2>
                        <Link
                            href="/blogs"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                            View all articles
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPosts.map((post) => (
                            <BlogCard key={post.slug} blog={post} />
                        ))}
                    </div>
                </section>
            )}

            {/* Back to Blog List */}
            <div className="mt-8 text-center border-t border-gray-200 pt-8">
                <Link
                    href="/blogs"
                    className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to All Articles
                </Link>
            </div>
        </div>
    );
}
