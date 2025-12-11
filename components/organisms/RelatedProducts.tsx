import { fetchProductsByCategory } from "@/lib/fetchProducts";
import ProductCard from "@/components/molecules/ProductCard";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("collections")
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
    <div className="main-wrapper mx-auto py-10 md:py-12 lg:py-16 border-t">
      <h2 className="font-poppins font-bold text-2xl md:text-3xl text-black mb-6 md:mb-8">
        {t("detailPage.relatedTitle")}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
