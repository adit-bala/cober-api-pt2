/*
  Warnings:

  - Added the required column `active` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "active" BOOL NOT NULL;
ALTER TABLE "Request" ADD COLUMN     "destination" STRING;
