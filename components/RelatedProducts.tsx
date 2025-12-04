import { fetchProductsByCategory } from "@/lib/fetchProducts";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  categoryId: number;
  categorySlug: string;
  currentProductId: number;
}

export default async function RelatedProducts({
  categoryId,
  categorySlug,
  currentProductId,
}: RelatedProductsProps) {
  const products = await fetchProductsByCategory(categoryId);

  if (!products || products.length === 0) {
    return null;
  }

  // Filter out current product and limit to 4 items
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16 border-t">
      <h2 className="font-poppins font-bold text-3xl text-black mb-8">
        Related Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={categorySlug}
          />
        ))}
      </div>
    </div>
  );
}
