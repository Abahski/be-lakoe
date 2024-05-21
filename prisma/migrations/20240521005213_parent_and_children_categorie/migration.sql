/*
  Warnings:

  - You are about to drop the column `category_id` on the `Categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_category_id_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "category_id",
ADD COLUMN     "children_id" INTEGER,
ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
