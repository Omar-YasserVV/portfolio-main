import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { BlogPageFloatingDock } from "@/components/BlogPageFloatingDock";

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
                <BlurFade
                  delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                  key={post.slug}
                >
                  <Link
                    className="block group mb-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 overflow-hidden"
                    href={`/blog/${post.slug}`}
                  >
                    <div className="w-full flex flex-col space-y-3">
                      <h2 className="text-xl md:text-2xl font-medium text-white group-hover:text-blue-100 transition-colors duration-300">
                        {post.metadata.title}
                      </h2>

                      {/* Summary with hover animation */}
                      {post.metadata.summary && (
                        <div className="relative overflow-hidden h-6">
                          <div className="absolute inset-0 transform transition-all duration-500 ease-out group-hover:translate-y-0 translate-y-full opacity-0 group-hover:opacity-100">
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                              {post.metadata.summary}
                            </p>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-blue-100 font-mono">
                        {new Date(post.metadata.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              ))}
          </div>
        </section>
      </div>

      {/* Blog Floating Dock */}
      <BlogPageFloatingDock />
    </main>
  );
}
