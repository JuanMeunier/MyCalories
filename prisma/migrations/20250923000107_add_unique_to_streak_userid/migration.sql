/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Streak` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Streak_userId_key" ON "public"."Streak"("userId");
