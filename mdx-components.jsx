export function useMDXComponents(components) {
    return {
        // Custom MDX components with styled elements
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
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
                {children}
            </p>
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
        code: ({ children }) => (
            <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
                {children}
            </pre>
        ),
        table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    {children}
                </table>
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
        strong: ({ children }) => (
            <strong className="font-bold text-gray-900">{children}</strong>
        ),
        img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={alt || ""}
                className="rounded-xl shadow-md my-6 max-w-full"
                loading="lazy"
            />
        ),
        ...components,
    };
}
