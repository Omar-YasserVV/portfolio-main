import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { BlogPageFloatingDock } from "@/components/BlogPageFloatingDock";
import { PostCard } from "@/components/post-card";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="relative bg-black-100 flex items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Spotlight effects to match app theme */}
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />

        {/* Radial gradient overlay */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <section className="relative z-10 pt-20 pb-20">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-center mb-16">
              <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tighter text-white">
                Blog
              </h1>
              <p className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto">
                My thoughts on software development, life, and more.
              </p>
            </div>
          </BlurFade>

          <div className="max-w-4xl mx-auto">
            {posts
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post, id) => (
                <PostCard
                  key={id}
                  category={post.metadata.category}
                  readTime={post.metadata.readTime}
                  title={post.metadata.title}
                  slug={post.slug}
                  description={post.metadata.summary}
                  date={post.metadata.publishedAt}
                />
              ))}
          </div>
        </section>
      </div>

      {/* Blog Floating Dock */}
      <BlogPageFloatingDock />
    </main>
  );
}
