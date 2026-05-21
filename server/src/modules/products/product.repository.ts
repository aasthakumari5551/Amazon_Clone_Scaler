import prisma from "../../config/db";
import type { ProductQueryDto } from "./product.dto";

const findAll = async (query: ProductQueryDto, page: number, limit: number) => {
  const where: { name?: { contains: string; mode: "insensitive" }; categoryId?: string } = {};

  if (query.search) {
    where.name = { contains: query.search, mode: "insensitive" };
  }

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  const [total, data] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  return { data, total, page, limit };
};

const findById = (id: string) =>
  prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: true
    }
  });

const findCategories = () => prisma.category.findMany({ orderBy: { name: "asc" } });

export default {
  findAll,
  findById,
  findCategories
};
