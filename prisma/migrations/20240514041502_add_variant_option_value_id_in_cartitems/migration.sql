/*
  Warnings:

  - Added the required column `variant_option_value_id` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "variant_option_value_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_variant_option_value_id_fkey" FOREIGN KEY ("variant_option_value_id") REFERENCES "VariantOptionValues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
