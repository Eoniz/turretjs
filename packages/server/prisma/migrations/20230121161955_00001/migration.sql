-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectVersion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "project_version_id" INTEGER NOT NULL,
    CONSTRAINT "ProjectVersion_project_version_id_fkey" FOREIGN KEY ("project_version_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "log_type_id" INTEGER NOT NULL,
    "log" TEXT NOT NULL,
    CONSTRAINT "Log_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "LogType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
