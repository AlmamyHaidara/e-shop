/*
  Warnings:

  - Added the required column `qte` to the `Panier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Panier` ADD COLUMN `qte` INTEGER NOT NULL;
