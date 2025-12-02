-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playlistId" INTEGER NOT NULL,
    "trackId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "albumId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Track_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("albumId", "artist", "createdAt", "id", "image", "playlistId", "preview", "title", "trackId") SELECT "albumId", "artist", "createdAt", "id", "image", "playlistId", "preview", "title", "trackId" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_trackId_key" ON "Track"("trackId");
CREATE INDEX "Track_playlistId_idx" ON "Track"("playlistId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
