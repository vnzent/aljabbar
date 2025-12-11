import { fetchProductsByCategory } from "@/lib/fetchProducts";
import ProductCard from "@/components/molecules/ProductCard";
import SectionWrapper from "./SectionWrapper";
import TextHeading from "../atoms/TextHeading";
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
    <SectionWrapper className="main-wrapper mx-auto">
      <TextHeading>{t("detailPage.relatedTitle")}</TextHeading>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  );
}
