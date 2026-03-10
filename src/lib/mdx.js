import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Get all blog post slugs (for generateStaticParams)
 */
export function getAllBlogSlugs() {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
    return files.map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get all blog posts with frontmatter (for listing page)
 */
export function getAllBlogPosts() {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(BLOG_DIR, file);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                description: data.description || "",
                date: data.date || new Date().toISOString(),
                image: data.image || null,
                tags: data.tags || [],
                category: data.category || "General",
                author: data.author || "TempMail.sbs",
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    return posts;
}

/**
 * Get a single blog post by slug (for individual page)
 */
export function getBlogPostBySlug(slug) {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        image: data.image || null,
        tags: data.tags || [],
        category: data.category || "General",
        author: data.author || "TempMail.sbs",
    };
}
