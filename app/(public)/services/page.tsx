import Image from "next/image";
import Link from "next/link";

async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services/categories`);
  return res.json();
}

export default async function ServicesPage() {
  const categories = await fetchCategories();

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {categories.map((cat: any) => (
          <Link key={cat.id} href={`/services/${cat.id}`}>
            <div className="rounded-xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
              {cat.image && <Image src={cat.image} alt={cat.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
              <h2 className="text-xl font-semibold">{cat.title}</h2>
              <p className="text-gray-500">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}