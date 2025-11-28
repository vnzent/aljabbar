import { NextRequest, NextResponse } from "next/server";
import { fetchSearchProduct } from "@/lib/fetchProducts";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";

    if (!query) {
      return NextResponse.json({ products: [] });
    }

    const products = await fetchSearchProduct(query);

    return NextResponse.json({
      products: products || [],
      count: products?.length || 0,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
