import { getPosts, categories } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const posts = getPosts();
  return <BlogClient posts={posts} categories={categories} />;
}
