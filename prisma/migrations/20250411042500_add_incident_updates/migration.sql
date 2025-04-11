/*
  Warnings:

  - You are about to drop the column `resolvedAt` on the `Incident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "resolvedAt";

-- CreateTable
CREATE TABLE "Update" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incidentId" TEXT NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
