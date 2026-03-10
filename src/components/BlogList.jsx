import Link from "next/link";
import Blogs from "@/data/Data";
import { getAllBlogPosts } from "@/lib/mdx";

function BlogList() {
    const mdxPosts = getAllBlogPosts();

    const allPosts = [...mdxPosts, ...Blogs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Latest Blog Posts</h2>
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                    View All {'>'} Latest Blogs →
                </Link>
            </div>

            {/* 2-Column Horizontal Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allPosts.map((blog, index) => (
                    <Link
                        key={blog.slug || index}
                        href={`/blog/${blog.slug}`}
                        className="group"
                    >
                        <div className="flex bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden h-full">
                            {/* Text Content — Left Side */}
                            <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
                                <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                    {blog.description}
                                </p>
                            </div>

                            {/* Image — Right Side */}
                            <div className="w-[130px] sm:w-[150px] flex-shrink-0">
                                {blog.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={blog.image}
                                        alt={blog.title || "Blog image"}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default BlogList;
