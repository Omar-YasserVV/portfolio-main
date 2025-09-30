import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SyntaxHighlighter } from "@/components/SyntaxHighlighter";
import { Navigation } from "@/components/navigation/Navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative bg-black-100 flex  items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 min-h-screen">
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

        <section id="blog" className="relative z-10 pt-20 pb-20">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `${DATA.url}${post.metadata.image}`
                  : `${DATA.url}/og?title=${post.metadata.title}`,
                url: `${DATA.url}/blog/${post.slug}`,
                author: {
                  "@type": "Person",
                  name: DATA.name,
                },
              }),
            }}
          />

          {/* Back button */}
          <BlurFade delay={0.04}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </Link>
          </BlurFade>

          {/* Article header */}
          <BlurFade delay={0.08}>
            <div className="max-w-4xl mx-auto border-b border-gray-700 mb-4">
              <h1 className="font-medium text-3xl md:text-4xl lg:text-4xl tracking-tighter text-white mb-2">
                {post.metadata.title}
              </h1>

              <div className=" flex-col !gap-2 md:flex-row justify-between items-center mb-5">
                <Suspense fallback={<p className="h-5 " />}>
                  <p className="text-sm  text-gray-300 mb-6 font-mono">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </Suspense>
                {/* {post.metadata.summary && (
                  <p className="text-gray-300 text-sm max-w-md text-left">
                    {post.metadata.summary}
                  </p>
                )} */}
              </div>
            </div>
          </BlurFade>

          {/* Article content */}
          <BlurFade delay={0.12}>
            <article
              className="max-w-4xl mx-auto text-gray-300 leading-relaxed w-full overflow-hidden
                [&_h1]:text-white [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-8 [&_h1]:mt-12 [&_h1]:border-b [&_h1]:border-white/10 [&_h1]:pb-4
                [&_h2]:text-blue-100 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-6 [&_h2]:mt-10
                [&_h3]:text-blue-200 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:mt-8
                [&_h4]:text-blue-300 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-3 [&_h4]:mt-6
                [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6
                [&_a]:text-blue-100 [&_a]:no-underline hover:[&_a]:underline [&_a]:font-medium
                [&_strong]:text-white [&_strong]:font-semibold
                [&_code]:text-blue-100 [&_code]:bg-white/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                [&_pre]:bg-gray-900 [&_pre]:border [&_pre]:border-gray-700 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:font-mono [&_pre]:max-w-full [&_pre]:whitespace-pre [&_pre]:scrollbar-thin [&_pre]:scrollbar-track-gray-800 [&_pre]:scrollbar-thumb-gray-600 [&_pre]:hover:scrollbar-thumb-gray-500
                [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-white [&_pre_code]:block [&_pre_code]:min-w-0 [&_pre_code]:overflow-x-auto
                [&_blockquote]:border-l-4 [&_blockquote]:border-blue-100 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:bg-white/5 [&_blockquote]:py-4 [&_blockquote]:rounded-r-lg
                [&_ul]:text-gray-300 [&_ul]:space-y-2 [&_ul]:mb-6
                [&_ol]:text-gray-300 [&_ol]:space-y-2 [&_ol]:mb-6
                [&_li]:text-gray-300 [&_li]:leading-relaxed
                [&_table]:text-gray-300 [&_table]:border [&_table]:border-white/10 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:w-full
                [&_th]:bg-white/5 [&_th]:text-white [&_th]:font-semibold [&_th]:px-4 [&_th]:py-3 [&_th]:border [&_th]:border-white/10
                [&_td]:px-4 [&_td]:py-3 [&_td]:border [&_td]:border-white/10
                [&_hr]:border-white/10 [&_hr]:my-8"
              dangerouslySetInnerHTML={{ __html: post.source }}
            />
          </BlurFade>
        </section>
      </div>

      {/* Syntax Highlighter */}
      <SyntaxHighlighter />

      {/* Blog Responsive Navigation */}
      <Navigation variant="blog" />
    </main>
  );
}
