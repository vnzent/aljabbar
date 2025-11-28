export interface Product {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    sku: number;
    categories: Category[];
    images: Image[];
    related_ids: number[];
}

export interface Category {
    id: number,
    name: string,
    slug: string
}

export interface Image {
    src: string,
    name: string,
}

export interface FetchProductsParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
}

