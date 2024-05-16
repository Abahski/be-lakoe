/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payment_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Stores_name_key" ON "Stores"("name");
