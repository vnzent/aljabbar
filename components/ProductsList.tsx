import { fetchProducts } from "@/lib/fetchProducts";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

export default async function ProductsList() {
  const { products } = await fetchProducts({
    page: 1,
    perPage: 6,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <Card
          className="group overflow-hidden border-0 transition-all duration-300 cursor-pointer"
          key={index}
        >
          <CardContent className="p-0">
            {/* Image Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
              <Image
                src={product.images[0].src}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content Container */}
            <div className="p-6 space-y-3">
              <h3 className="font-poppins font-semibold text-xl text-black">
                {product.name}
              </h3>

              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.categories.slice(0, 2).map((category) => (
                    <span
                      key={category.id}
                      className="inline-block text-lg underline font-medium text-black/60 hover:text-primary transition-all duration-300"
                    >
                      {category.name} 
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
