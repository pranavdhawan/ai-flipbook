-- CreateTable
CREATE TABLE "BookExcerpt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookExcerpt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExcerptImage" (
    "id" TEXT NOT NULL,
    "exceprtId" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExcerptImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExcerptImage_exceprtId_key" ON "ExcerptImage"("exceprtId");

-- AddForeignKey
ALTER TABLE "ExcerptImage" ADD CONSTRAINT "ExcerptImage_exceprtId_fkey" FOREIGN KEY ("exceprtId") REFERENCES "BookExcerpt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
