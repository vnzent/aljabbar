import axios from "axios";
import { Category, FetchProductsParams, Pagination, Product } from "./types";

const baseURL = "https://aljabbarcarpets.com/wp-json/wc/v3/products";

export async function fetchProducts(
  params: FetchProductsParams = {}
): Promise<{ products: Product[]; pagination: Pagination }> {
  try {
    const {
      page = 1,
      perPage = 12,
      search = "",
      categories = "",
      orderby = "",
    } = params;

    const auth = Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    // Map orderby values to WooCommerce API format
    // Default is title A-Z
    let wcOrderBy = "title";
    let wcOrder = "asc";

    switch (orderby) {
      case "title-asc":
        wcOrderBy = "title";
        wcOrder = "asc";
        break;
      case "title-desc":
        wcOrderBy = "title";
        wcOrder = "desc";
        break;
      case "latest":
        wcOrderBy = "date";
        wcOrder = "desc";
        break;
      case "oldest":
        wcOrderBy = "date";
        wcOrder = "asc";
        break;
      default:
        wcOrderBy = "title";
        wcOrder = "asc";
    }

    const queryParams = new URLSearchParams({
      per_page: perPage.toString(),
      page: page.toString(),
      orderby: wcOrderBy,
      order: wcOrder,
      ...(search && { search }),
      ...(categories && categories.trim() && { category: categories }),
    });

    const fullUrl = `${baseURL}?${queryParams}`;

    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Cache-Control": "no-cache",
      },
    });

    const total = parseInt(response.headers["x-wp-total"] || "0");
    const totalPages = parseInt(response.headers["x-wp-totalpages"] || "0");

    return {
      products: response.data,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        perPage,
      },
    };
  } catch (error) {
    console.error("Error fetcching products: ", error);
    return {
      products: [],
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage: 1,
        perPage: 12,
      },
    };
  }
}

export async function fetchProductCategories(): Promise<Category[] | null> {
  try {
    const auth = Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    // Fetch all categories with high per_page limit
    const response = await axios.get(
      `${baseURL}/categories?per_page=100&hide_empty=false`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Cache-Control": "no-cache",
        },
      }
    );
    response.data.map((cat: Category) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));

    return response.data || null;
  } catch (error) {
    console.error("Error fetching category: ", error);
    return [];
  }
}

export async function fetchProductsByCategory(
  categoryId: number
): Promise<Product[] | null> {
  try {
    const auth = Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    const response = await axios.get(`${baseURL}?category=${categoryId}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data || null;
  } catch (error) {
    console.error("Error fetching products by category: ", error);
    return [];
  }
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const auth = Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    const response = await axios.get(`${baseURL}?slug=${slug}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching product: ", error);
    return null;
  }
}

export async function fetchSearchProduct(
  search: string
): Promise<Product[] | null> {
  try {
    const auth = Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    const response = await axios.get(`${baseURL}?search=${search}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data || null;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return null;
  }
}

export async function fetchCategoryById(
  categoryId: number
): Promise<Category[] | null> {
  try {
    const auth = Buffer.from(
      `${process.env.consumer_key}:${process.env.consumer_secret}`
    ).toString("base64");

    const response = await axios.get(`${baseURL}/categories/${categoryId}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching category: ", error);
    return null;
  }
}
