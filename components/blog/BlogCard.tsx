import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string | null;
  createdAt?: Date;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  createdAt,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="border rounded-xl p-5 hover:shadow-md transition block"
    >
      {featuredImage && (
        <Image
          src={featuredImage}
          alt={title}
          className="rounded-lg mb-4 h-48 w-full object-cover"
        />
      )}

      <h2 className="text-xl font-semibold">{title}</h2>

      {excerpt && (
        <p className="text-gray-600 mt-2 line-clamp-3">{excerpt}</p>
      )}

      {createdAt && (
        <p className="text-sm text-gray-400 mt-4">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      )}
    </Link>
  );
}