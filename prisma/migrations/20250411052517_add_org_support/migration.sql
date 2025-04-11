/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,organizationId]` on the table `OrganizationMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Service_userId_idx";

-- DropIndex
DROP INDEX "User_externalId_key";

-- AlterTable
ALTER TABLE "OrganizationMember" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "role" SET DEFAULT 'member';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "content",
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "externalId",
DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMember_userId_organizationId_key" ON "OrganizationMember"("userId", "organizationId");
