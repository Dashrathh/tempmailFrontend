import { redirect } from "next/navigation";

// Redirect /blog to /blogs for consistency
export default function BlogRedirect() {
    redirect("/blogs");
}
