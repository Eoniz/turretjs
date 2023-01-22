-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "navigator_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ClientNavigator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "app_code_name" TEXT NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_version" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,
    CONSTRAINT "ClientNavigator_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientNavigator_client_id_key" ON "ClientNavigator"("client_id");
