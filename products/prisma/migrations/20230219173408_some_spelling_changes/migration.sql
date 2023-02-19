/*
  Warnings:

  - You are about to drop the column `productsId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `descripton` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `disabeled` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "productsId";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "descripton",
DROP COLUMN "disabeled",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "disabled" BOOLEAN;
