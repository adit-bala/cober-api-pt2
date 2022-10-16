/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
ALTER TABLE "User" ADD COLUMN     "firstName" STRING;
ALTER TABLE "User" ADD COLUMN     "gender" STRING;
ALTER TABLE "User" ADD COLUMN     "lastName" STRING;
ALTER TABLE "User" ADD COLUMN     "username" STRING NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Request" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "date" TIMESTAMP(3) NOT NULL DEFAULT '2020-03-19 14:21:00 +02:00',
    "domestic" BOOL NOT NULL,
    "pickup" STRING,
    "hostUserName" STRING,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_hostUserName_fkey" FOREIGN KEY ("hostUserName") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
