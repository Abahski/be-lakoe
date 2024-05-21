/*
  Warnings:

  - Changed the type of `status` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `invoice_history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusInvoice" AS ENUM ('BELUM_DIBAYAR', 'PESANAN_BARU', 'SIAP_DIKIRIM', 'DALAM_PENGIRIMAN', 'PESANAN_SELESAI', 'DIBATALKAN');

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "status",
ADD COLUMN     "status" "StatusInvoice" NOT NULL;

-- AlterTable
ALTER TABLE "invoice_history" DROP COLUMN "status",
ADD COLUMN     "status" "StatusInvoice" NOT NULL;
