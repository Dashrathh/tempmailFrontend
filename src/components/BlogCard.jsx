import Link from "next/link";

const BlogCard = ({ blog }) => {
    return (
        <div className="flex flex-col h-full p-4 rounded-lg shadow-md hover:shadow-lg transition-all bg-white overflow-hidden">
            <div className="relative pb-[56.25%] mb-4 rounded-lg overflow-hidden">
                {blog.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={blog.image}
                        alt={blog.title || "Blog image"}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow">
                <Link href={`/blog/${blog.slug}`} className="group">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {blog.title}
                    </h2>
                </Link>

                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {blog.description}
                </p>

                <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto text-blue-600 hover:underline font-medium text-sm inline-flex items-center"
                >
                    Read more
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
        </div>
    );
};

export default BlogCard;
