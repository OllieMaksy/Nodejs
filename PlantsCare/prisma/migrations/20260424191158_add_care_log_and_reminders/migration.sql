-- CreateTable
CREATE TABLE "CareLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userPlantId" TEXT NOT NULL,
    CONSTRAINT "CareLog_userPlantId_fkey" FOREIGN KEY ("userPlantId") REFERENCES "UserPlant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "remindAt" DATETIME NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userPlantId" TEXT NOT NULL,
    CONSTRAINT "Reminder_userPlantId_fkey" FOREIGN KEY ("userPlantId") REFERENCES "UserPlant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
