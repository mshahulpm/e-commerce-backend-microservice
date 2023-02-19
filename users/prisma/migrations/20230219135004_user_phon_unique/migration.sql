/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT ARRAY[]::"roles"[];

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
