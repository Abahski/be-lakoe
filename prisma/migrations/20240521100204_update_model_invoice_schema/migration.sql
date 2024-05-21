/*
  Warnings:

  - You are about to drop the column `invoice_id` on the `Couriers` table. All the data in the column will be lost.
  - Added the required column `courier_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Couriers" DROP CONSTRAINT "Couriers_invoice_id_fkey";

-- DropIndex
DROP INDEX "Couriers_invoice_id_key";

-- AlterTable
ALTER TABLE "Couriers" DROP COLUMN "invoice_id";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "courier_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "Couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
