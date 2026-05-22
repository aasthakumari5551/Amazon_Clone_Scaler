import AppError from "../../utils/AppError";
import type { ProductQueryDto } from "./product.dto";
import productRepository from "./product.repository";

const getProducts = async (query: ProductQueryDto) => {
  const page = query.page ?? 1;
  const limit = query.limit ?? 20;

  return productRepository.findAll(query, page, limit);
};

const getProductById = async (id: string) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

const getCategories = () => productRepository.findCategories();
const getFiltersMeta = () => productRepository.getFiltersMeta();

export default {
  getProducts,
  getProductById,
  getCategories,
  getFiltersMeta
};
