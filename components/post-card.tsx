"use client";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Link from "next/link";
import BlurFade from "./magicui/blur-fade";
import { Skeleton } from "./ui/skeleton";

/**
 * Props interface for the PostCard component
 */
interface PostCardProps {
  /** Category or categories the post belongs to */
  category: string | string[];
  /** Estimated reading time of the post */
  readTime: string;
  /** Title of the post */
  title: string;
  /** URL slug for the post */
  slug: string;
  /** Brief description or excerpt of the post */
  description: string;
  /** Publication date of the post */
  date: string;
}

/**
 * PostCard component displays a blog post preview with hover animations
 *
 * @component
 * @param {PostCardProps} props - The props for the PostCard component
 * @returns {JSX.Element} A card displaying post information with hover effects
 *
 * @example
 * ```tsx
 * <PostCard
 *   category={["Tech", "Programming"]}
 *   readTime="5 min"
 *   title="My Blog Post"
 *   slug="my-blog-post"
 *   description="A brief description of the post"
 *   date="2024-03-20"
 * />
 * ```
 */
export const PostCard = ({
  category,
  readTime,
  title,
  slug,
  description,
  date,
}: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const categories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];

  return (
    <Link href={`blog/${slug}`} className="block">
      <BlurFade delay={0.04}>
        <motion.div
          className="max-w-4xl"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="bg-accent/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5 p-6 transition-colors duration-300 hover:bg-muted/35 hover:border-foreground">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                {categories?.map((cat, i) => (
                  <Fragment key={i}>
                    <span>{cat}</span>
                    {i < categories.length - 1 && <span key={i + 1}>|</span>}
                  </Fragment>
                ))}
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{readTime} read</span>
                </div>
              </div>

              <h1 className="text-2xl font-semibold">{title}</h1>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? "auto" : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden  text-muted-foreground text-sm leading-relaxed"
              >
                {description}
              </motion.div>

              <motion.div
                animate={{ marginTop: isHovered ? "12px" : 0 }}
                className="text-sm"
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {date}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </BlurFade>
    </Link>
  );
};

export const BlogPostSkeleton = () => {
  return (
    <BlurFade delay={0.04}>
      <div className="block max-w-2xl">
        <div className="rounded-lg p-6 bg-muted/10 border">
          <div className="space-y-3">
            {/* Categories and read time section */}
            <div className="flex items-center gap-3 text-sm">
              <Skeleton className="h-4 w-16" />
              <span>|</span>
              <Skeleton className="h-4 w-20" />
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {/* Title */}
            <Skeleton className="h-8 w-full" />

            {/* Description placeholder (hidden by default like the original) */}
            <div className="opacity-0">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>

            {/* Date */}
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </BlurFade>
  );
};
