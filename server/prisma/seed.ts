import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { PrismaClient, Prisma } from "../generated/prisma/client";
import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";

const envPath = path.resolve(__dirname, "../.env");
let parsedEnv: Record<string, string> | undefined;

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath);
  parsedEnv = dotenv.parse(envFile);

  for (const [key, value] of Object.entries(parsedEnv)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const connectionString = parsedEnv?.DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

type CategorySeed = { name: string; slug: string };
type ProductSeed = { name: string; price: number; category: string };

const categories: CategorySeed[] = [
  { name: "Electronics", slug: "electronics" },
  { name: "Books", slug: "books" },
  { name: "Clothing", slug: "clothing" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Sports", slug: "sports" },
  { name: "Beauty", slug: "beauty" },
  { name: "Toys", slug: "toys" },
  { name: "Grocery", slug: "grocery" }
];

const productSeeds: ProductSeed[] = [
  { name: "Aurora Noise-Canceling Headphones", price: 129.99, category: "electronics" },
  { name: "Nimbus 4K Action Camera", price: 219.0, category: "electronics" },
  { name: "Orbit Wireless Charger Duo", price: 39.5, category: "electronics" },
  { name: "Stride Smartwatch Series 5", price: 179.25, category: "electronics" },
  { name: "Pulse Bluetooth Speaker", price: 59.99, category: "electronics" },
  { name: "Vector Mechanical Keyboard", price: 89.0, category: "electronics" },

  { name: "Modern JavaScript Mastery", price: 29.99, category: "books" },
  { name: "Design Systems Handbook", price: 34.5, category: "books" },
  { name: "Atomic Habits Workbook", price: 18.75, category: "books" },
  { name: "History of Innovation", price: 22.4, category: "books" },
  { name: "Mindful Productivity", price: 16.0, category: "books" },
  { name: "The Clean Code Companion", price: 31.25, category: "books" },

  { name: "AeroFit Running Shoes", price: 74.99, category: "clothing" },
  { name: "Cotton Lounge Hoodie", price: 42.0, category: "clothing" },
  { name: "Everyday Stretch Jeans", price: 49.5, category: "clothing" },
  { name: "Linen Summer Shirt", price: 35.25, category: "clothing" },
  { name: "Thermal Base Layer Set", price: 58.0, category: "clothing" },
  { name: "Classic Leather Belt", price: 24.99, category: "clothing" },

  { name: "Ceramic Nonstick Pan", price: 28.75, category: "home-kitchen" },
  { name: "Bamboo Cutting Board", price: 19.25, category: "home-kitchen" },
  { name: "Aroma Electric Kettle", price: 39.99, category: "home-kitchen" },
  { name: "Stoneware Dinner Set", price: 64.0, category: "home-kitchen" },
  { name: "SoftGlow Table Lamp", price: 47.5, category: "home-kitchen" },
  { name: "Cloud Comfort Pillow", price: 32.0, category: "home-kitchen" },

  { name: "Flex Pro Yoga Mat", price: 26.5, category: "sports" },
  { name: "Carbon Fiber Tennis Racket", price: 88.0, category: "sports" },
  { name: "UltraGrip Water Bottle", price: 15.99, category: "sports" },
  { name: "Trailblaze Hiking Backpack", price: 69.0, category: "sports" },
  { name: "Pulse Resistance Bands", price: 21.75, category: "sports" },
  { name: "StormFit Training Gloves", price: 18.5, category: "sports" },

  { name: "Rose Bloom Face Serum", price: 27.99, category: "beauty" },
  { name: "SilkTouch Moisturizer", price: 19.5, category: "beauty" },
  { name: "GlowTint Lip Balm Set", price: 12.75, category: "beauty" },
  { name: "Velvet Matte Foundation", price: 24.25, category: "beauty" },
  { name: "Herbal Hair Mask", price: 16.0, category: "beauty" },
  { name: "Nectar Fragrance Mist", price: 22.0, category: "beauty" },

  { name: "Solar Explorer Kit", price: 29.0, category: "toys" },
  { name: "Magnetic Builder Blocks", price: 34.5, category: "toys" },
  { name: "Adventure Puzzle Set", price: 18.99, category: "toys" },
  { name: "Galaxy RC Rover", price: 44.75, category: "toys" },
  { name: "Mini Artist Studio", price: 21.5, category: "toys" },
  { name: "Classic Story Cubes", price: 14.0, category: "toys" },

  { name: "Organic Trail Mix", price: 9.5, category: "grocery" },
  { name: "Cold Brew Coffee Pack", price: 13.25, category: "grocery" },
  { name: "Himalayan Sea Salt", price: 6.99, category: "grocery" },
  { name: "Golden Honey Jar", price: 11.5, category: "grocery" },
  { name: "Protein Granola Bites", price: 8.75, category: "grocery" },
  { name: "Premium Olive Oil", price: 17.0, category: "grocery" }
];

const brandMap: Record<string, string[]> = {
  electronics: ["Amzon", "NexTek", "ByteWave", "Aurora", "Pulse"],
  books: ["Storyline", "PaperTrail", "Inkspire", "MindWorks"],
  clothing: ["Loom", "Drift", "Coastline", "Everyday"],
  "home-kitchen": ["Hearth", "CloudHome", "KitchenCraft", "Nordic"],
  sports: ["Stride", "Summit", "Trailblaze", "Flex"],
  beauty: ["Glow", "Silk", "Bloom", "Aura"],
  toys: ["Spark", "Orbit", "Playhouse", "Wonder"],
  grocery: ["Harvest", "Pantry", "Greenfield", "Daily"]
};

const conditions = ["NEW", "RENEWED", "USED"] as const;

const buildCatalog = () => {
  const expanded: Array<ProductSeed & { brand: string; rating: number; reviewCount: number; isFreeDelivery: boolean; discountPercent: number; condition: (typeof conditions)[number] }> = [];

  productSeeds.forEach((seed, index) => {
    const brands = brandMap[seed.category] ?? ["Amzon"];
    for (let variant = 0; variant < 10; variant += 1) {
      const brand = brands[(index + variant) % brands.length];
      const priceFactor = 1 + (variant % 5) * 0.12;
      const price = Number((seed.price * priceFactor + variant * 3).toFixed(2));
      const rating = Number((3.6 + ((index + variant) % 15) * 0.1).toFixed(1));
      const reviewCount = 50 + (index + variant) * 7;
      const isFreeDelivery = price >= 499;
      const discountPercent = ((index + variant) % 6) * 5;
      const condition = conditions[(index + variant) % conditions.length];

      expanded.push({
        name: `${seed.name} ${brand} Edition ${variant + 1}`,
        price,
        category: seed.category,
        brand,
        rating,
        reviewCount,
        isFreeDelivery,
        discountPercent,
        condition
      });
    }
  });

  return expanded;
};

const descriptionTemplates = [
  "Designed for daily use with premium materials and lasting comfort.",
  "Compact, reliable, and crafted for modern routines.",
  "A best-seller with trusted performance and clean aesthetics.",
  "Balanced features and value for smart everyday upgrades.",
  "Engineered to deliver smooth results and easy maintenance.",
  "Lightweight build with a focus on durability and style."
];

const buildDescription = (name: string, index: number) => {
  const template = descriptionTemplates[index % descriptionTemplates.length];
  return `${name}. ${template}`;
};

const toDecimal = (value: number) => new Prisma.Decimal(value.toFixed(2));

const main = async () => {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const createdCategories = await prisma.category.createMany({
    data: categories
  });

  if (createdCategories.count !== categories.length) {
    throw new Error("Category seeding failed");
  }

  const categoryMap: Array<{ id: string; slug: string }> =
    await prisma.category.findMany({
      select: {
        id: true,
        slug: true
      }
    });
  const categoryLookup = new Map(categoryMap.map((cat) => [cat.slug, cat.id]));

  const catalog = buildCatalog();

  const products: Array<{ id: string; name: string }> = [];
  const chunkSize = 50;

  for (let i = 0; i < catalog.length; i += chunkSize) {
    const slice = catalog.slice(i, i + chunkSize);
    const created = await Promise.all(
      slice.map((product, index) => {
        const categoryId = categoryLookup.get(product.category);

        if (!categoryId) {
          throw new Error(`Missing category for ${product.category}`);
        }

        const absoluteIndex = i + index;

        return prisma.product.create({
          data: {
            name: product.name,
            description: buildDescription(product.name, absoluteIndex),
            price: toDecimal(product.price),
            brand: product.brand,
            rating: toDecimal(product.rating),
            reviewCount: product.reviewCount,
            isFreeDelivery: product.isFreeDelivery,
            discountPercent: product.discountPercent,
            condition: product.condition,
            stock: 12 + (absoluteIndex % 11),
            categoryId
          },
          select: {
            id: true,
            name: true
          }
        });
      })
    );

    products.push(...created);
  }

  const imageData = products.flatMap((product: { id: string; name: string }, index: number) => {
    const baseSeed = `${product.id}-${index}`;
    return [0, 1, 2].map((imageIndex) => ({
      productId: product.id,
      url: `https://picsum.photos/seed/${baseSeed}-${imageIndex}/800/800`,
      altText: `${product.name} image ${imageIndex + 1}`,
      sortOrder: imageIndex + 1
    }));
  });

  await prisma.productImage.createMany({ data: imageData });

  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      email: "test@example.com",
      fullName: "Test User",
      passwordHash
    }
  });
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
