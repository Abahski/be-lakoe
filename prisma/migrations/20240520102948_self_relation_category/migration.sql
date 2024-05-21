-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "children_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
