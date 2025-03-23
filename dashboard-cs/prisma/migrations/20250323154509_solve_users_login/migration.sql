/*
  Warnings:

  - You are about to drop the `user_login` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_login" DROP CONSTRAINT "user_login_user_id_fkey";

-- DropTable
DROP TABLE "user_login";

-- CreateTable
CREATE TABLE "users_login" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "users_login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_login_user_id_idx" ON "users_login"("user_id");

-- AddForeignKey
ALTER TABLE "users_login" ADD CONSTRAINT "users_login_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
