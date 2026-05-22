import prisma from "../../config/db";
import { Prisma } from "../../../generated/prisma/client";
import type { ProductQueryDto } from "./product.dto";

const findAll = async (query: ProductQueryDto, page: number, limit: number) => {
  const where: Prisma.ProductWhereInput = {};

  if (query.search) {
    where.name = { contains: query.search, mode: "insensitive" };
  }

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.brands) {
    const list = query.brands.split(",").map((item) => item.trim()).filter(Boolean);
    if (list.length) {
      where.brand = { in: list };
    }
  }

  if (query.minPrice || query.maxPrice) {
    where.price = {
      ...(query.minPrice ? { gte: new Prisma.Decimal(query.minPrice) } : {}),
      ...(query.maxPrice ? { lte: new Prisma.Decimal(query.maxPrice) } : {})
    };
  }

  if (query.ratingMin) {
    where.rating = { gte: new Prisma.Decimal(query.ratingMin) };
  }

  if (query.freeDelivery) {
    where.isFreeDelivery = true;
  }

  if (query.discount) {
    where.discountPercent = { gt: 0 };
  }

  if (query.condition) {
    where.condition = query.condition;
  }

  const orderBy = (() => {
    switch (query.sort) {
      case "price_low":
        return { price: "asc" } as const;
      case "price_high":
        return { price: "desc" } as const;
      case "rating":
        return { rating: "desc" } as const;
      case "newest":
        return { createdAt: "desc" } as const;
      default:
        return { createdAt: "desc" } as const;
    }
  })();

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
      orderBy
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

const getFiltersMeta = async () => {
  const [priceAgg, brandGroups, conditionGroups] = await Promise.all([
    prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true }
    }),
    prisma.product.groupBy({
      by: ["brand"],
      _count: { brand: true },
      orderBy: { brand: "asc" }
    }),
    prisma.product.groupBy({
      by: ["condition"],
      _count: { condition: true }
    })
  ]);

  return {
    minPrice: Number(priceAgg._min.price ?? 0),
    maxPrice: Number(priceAgg._max.price ?? 0),
    brands: brandGroups.map((group) => ({
      name: group.brand,
      count: group._count.brand
    })),
    conditions: conditionGroups.map((group) => ({
      name: group.condition,
      count: group._count.condition
    }))
  };
};

export default {
  findAll,
  findById,
  findCategories,
  getFiltersMeta
};
