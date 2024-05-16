/*
  Warnings:

  - Added the required column `is_off` to the `OperationHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OperationHours" ADD COLUMN     "is_off" BOOLEAN NOT NULL,
ALTER COLUMN "day" SET NOT NULL,
ALTER COLUMN "day" SET DATA TYPE TEXT;
