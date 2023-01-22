/*
  Warnings:

  - You are about to drop the column `project_version_id` on the `ProjectVersion` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `ProjectVersion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectVersion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    CONSTRAINT "ProjectVersion_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectVersion" ("id", "name") SELECT "id", "name" FROM "ProjectVersion";
DROP TABLE "ProjectVersion";
ALTER TABLE "new_ProjectVersion" RENAME TO "ProjectVersion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
