import Image from "next/image";
import Link from "next/link";

async function fetchProducts(categoryId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services/category/${categoryId}`);
  return res.json();
}

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;
  const products = await fetchProducts(categoryId);

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">Products</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {products.map((p: any) => (
          <Link key={p.id} href={`/services/${categoryId}/book/${p.id}`}>
            <div className="rounded-xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
              {p.image && <Image src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-500">{p.description}</p>
              <p className="mt-2 font-semibold">KES {p.price.toLocaleString()}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}