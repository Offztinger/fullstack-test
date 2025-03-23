-- CreateEnum
CREATE TYPE "tasks_category" AS ENUM ('WORK', 'PERSONAL', 'STUDY', 'HEALTH', 'OTHER');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "category" "tasks_category" NOT NULL DEFAULT 'OTHER';
