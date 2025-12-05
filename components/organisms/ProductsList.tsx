import { fetchProducts } from "@/lib/fetchProducts";
import ProductCard from "@/components/molecules/ProductCard";

export default async function ProductsList() {
  const { products } = await fetchProducts({
    page: 1,
    perPage: 6,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
