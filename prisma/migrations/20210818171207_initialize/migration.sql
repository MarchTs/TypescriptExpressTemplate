-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('parent', 'child', 'standalone');

-- CreateTable
CREATE TABLE "Product" (
    "sku" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "name" TEXT NOT NULL,
    "parentSku" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Stock" (
    "sku" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDelete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Product.sku_unique" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Stock.sku_unique" ON "Stock"("sku");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("parentSku") REFERENCES "Product"("sku") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD FOREIGN KEY ("sku") REFERENCES "Product"("sku") ON DELETE CASCADE ON UPDATE CASCADE;
