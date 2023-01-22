-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientNavigator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "app_code_name" TEXT NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_version" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClientNavigator_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientNavigator" ("app_code_name", "app_name", "app_version", "client_id", "id", "platform", "user_agent", "vendor") SELECT "app_code_name", "app_name", "app_version", "client_id", "id", "platform", "user_agent", "vendor" FROM "ClientNavigator";
DROP TABLE "ClientNavigator";
ALTER TABLE "new_ClientNavigator" RENAME TO "ClientNavigator";
CREATE UNIQUE INDEX "ClientNavigator_client_id_key" ON "ClientNavigator"("client_id");
CREATE TABLE "new_ProjectVersion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectVersion_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectVersion" ("id", "name", "project_id") SELECT "id", "name", "project_id" FROM "ProjectVersion";
DROP TABLE "ProjectVersion";
ALTER TABLE "new_ProjectVersion" RENAME TO "ProjectVersion";
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "log_type_id" INTEGER NOT NULL,
    "log" TEXT NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "LogType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("id", "log", "log_type_id") SELECT "id", "log", "log_type_id" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("id", "name") SELECT "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Client" ("id", "uuid") SELECT "id", "uuid" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
