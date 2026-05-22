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
