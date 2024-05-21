/*
  Warnings:

  - You are about to drop the column `children_id` on the `Categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_children_id_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "children_id";
