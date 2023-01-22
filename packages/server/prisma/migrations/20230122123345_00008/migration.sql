-- CreateTable
CREATE TABLE "Error" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "lineno" INTEGER NOT NULL,
    "colno" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "client_session_id" INTEGER NOT NULL,
    "creation_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Error_client_session_id_fkey" FOREIGN KEY ("client_session_id") REFERENCES "ClientSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
