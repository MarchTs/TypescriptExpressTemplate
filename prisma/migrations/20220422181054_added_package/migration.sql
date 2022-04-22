-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('parent', 'child', 'standalone');

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageThumbnail" TEXT,
    "remark" TEXT,
    "updated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
