import Image from "next/image";

interface BlogHeaderProps {
  title: string;
  featuredImage?: string | null;
  createdAt: Date;
  authorName?: string;
}

export default function BlogHeader({
  title,
  featuredImage,
  createdAt,
  authorName,
}: BlogHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        {new Date(createdAt).toLocaleDateString()}
        {authorName && ` • ${authorName}`}
      </div>

      {featuredImage && (
        <Image
          src={featuredImage}
          alt={title}
          className="rounded-xl w-full max-h-[420px] object-cover"
        />
      )}
    </header>
  );
}