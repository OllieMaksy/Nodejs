-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lightning" TEXT NOT NULL,
    "watering" TEXT NOT NULL,
    "wateringIntervalDays" INTEGER NOT NULL DEFAULT 7,
    "temperature" TEXT NOT NULL,
    "transplanting" TEXT NOT NULL
);
INSERT INTO "new_Plant" ("description", "id", "lightning", "name", "species", "temperature", "transplanting", "watering") SELECT "description", "id", "lightning", "name", "species", "temperature", "transplanting", "watering" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
