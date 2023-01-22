/*
  Warnings:

  - Added the required column `client_session_id` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "log" TEXT NOT NULL,
    "log_type_id" INTEGER NOT NULL,
    "client_session_id" INTEGER NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "LogType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_client_session_id_fkey" FOREIGN KEY ("client_session_id") REFERENCES "ClientSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("creation_datetime", "id", "log", "log_type_id") SELECT "creation_datetime", "id", "log", "log_type_id" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
