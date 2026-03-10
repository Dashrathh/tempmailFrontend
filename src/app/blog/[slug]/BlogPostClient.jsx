"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

export default function BlogPostClient({ blog, relatedPosts, readingTime }) {
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

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
                            Blogs
                        </Link>
                    </li>
                    {blog.category && (
                        <li className="before:content-['/'] before:mr-2">
                            <span className="hover:text-blue-600 transition">
                                {blog.category}
                            </span>
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
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                                Share on X
                            </button>

                            <button
                                onClick={() => shareOnSocial("facebook")}
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Share on Facebook
                            </button>

                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                        </div>
                    </div>

                    {/* Optimized Image */}
                    <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-100 aspect-video">
                        {blog.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 border-2 border-dashed rounded-xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/favicon.png"
                                    alt="Tempmail.sbs"
                                    className="w-16 h-16 opacity-50"
                                />
                            </div>
                        )}
                    </div>
                </header>

                {/* Blog Content */}
                <div
                    className="prose prose-lg max-w-none text-gray-700 blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>

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
            <div className="mt-12 text-center border-t border-gray-200 pt-8">
                <Link
                    href="/blogs"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
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
