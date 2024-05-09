/*
  Warnings:

  - You are about to drop the `InformationSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocationSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product_Order" DROP CONSTRAINT "Product_Order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Product_Order" DROP CONSTRAINT "Product_Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateMessage" DROP CONSTRAINT "TemplateMessage_customerId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateMessage" DROP CONSTRAINT "TemplateMessage_productId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateMessage" DROP CONSTRAINT "TemplateMessage_store_nameId_fkey";

-- DropTable
DROP TABLE "InformationSetting";

-- DropTable
DROP TABLE "LocationSetting";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "Product_Order";

-- DropTable
DROP TABLE "TemplateMessage";
