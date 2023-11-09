-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "dishes" ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "price" SET DEFAULT 50.0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT;
