export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type ProductImage = {
  id: string;
  url: string;
  altText: string;
  sortOrder: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  rating: number;
  reviewCount: number;
  isFreeDelivery: boolean;
  discountPercent: number;
  condition: "NEW" | "RENEWED" | "USED";
  stock: number;
  createdAt: string;
  categoryId: string;
  category: Category;
  images: ProductImage[];
};

export type ProductListResponse = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
};

export type ProductFiltersMeta = {
  minPrice: number;
  maxPrice: number;
  brands: Array<{ name: string; count: number }>;
  conditions: Array<{ name: "NEW" | "RENEWED" | "USED"; count: number }>;
};
