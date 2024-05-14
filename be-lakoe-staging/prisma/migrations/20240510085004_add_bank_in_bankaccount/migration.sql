/*
  Warnings:

  - Added the required column `bank` to the `BankAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_store_id_fkey";

-- AlterTable
ALTER TABLE "BankAccounts" ADD COLUMN     "bank" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "store_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
