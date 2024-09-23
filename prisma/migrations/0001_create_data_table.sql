-- CreateTable
CREATE TABLE "Auteur" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "socialNetwork" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Rubrique" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "googleAccount" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Images" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "minetype" TEXT NOT NULL,
    "lastmodified" INTEGER NOT NULL,
    "originalname" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Article" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rubriqueID" TEXT NOT NULL,
    "lecture" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "auteurID" TEXT NOT NULL,
    CONSTRAINT "Article_rubriqueID_fkey" FOREIGN KEY ("rubriqueID") REFERENCES "Rubrique" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Article_auteurID_fkey" FOREIGN KEY ("auteurID") REFERENCES "Auteur" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Audio" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "taille" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "contenu" TEXT NOT NULL,
    "articleID" TEXT,
    "podcastID" TEXT,
    "videoID" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Commentaire_videoID_fkey" FOREIGN KEY ("videoID") REFERENCES "Video" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commentaire_articleID_fkey" FOREIGN KEY ("articleID") REFERENCES "Article" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commentaire_podcastID_fkey" FOREIGN KEY ("podcastID") REFERENCES "Podcast" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Podcast" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "audioID" TEXT NOT NULL,
    "ecoute" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "auteurID" TEXT NOT NULL,
    CONSTRAINT "Podcast_audioID_fkey" FOREIGN KEY ("audioID") REFERENCES "Audio" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Podcast_auteurID_fkey" FOREIGN KEY ("auteurID") REFERENCES "Auteur" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Video" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "auteurID" TEXT NOT NULL,
    "rubriqueID" TEXT NOT NULL,
    "vu" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_auteurID_fkey" FOREIGN KEY ("auteurID") REFERENCES "Auteur" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Video_rubriqueID_fkey" FOREIGN KEY ("rubriqueID") REFERENCES "Rubrique" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rubrique_ID_key" ON "Rubrique"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "Images_name_key" ON "Images"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Article_ID_key" ON "Article"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_name_key" ON "Audio"("name");
