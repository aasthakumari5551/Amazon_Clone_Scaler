/*
  Warnings:

  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('NEW', 'RENEWED', 'USED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "condition" "ProductCondition" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "discountPercent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isFreeDelivery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" DECIMAL(2,1) NOT NULL,
ADD COLUMN     "reviewCount" INTEGER NOT NULL;
