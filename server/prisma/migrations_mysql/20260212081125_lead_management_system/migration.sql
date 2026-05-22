/*
  Warnings:

  - You are about to drop the column `date` on the `Interaction` table. All the data in the column will be lost.
  - The values [REVISIT] on the enum `Lead_source` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `status` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.
  - A unique constraint covering the columns `[friendlyId]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendlyId` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Interaction` DROP COLUMN `date`;

-- AlterTable
ALTER TABLE `Lead` ADD COLUMN `customerName` VARCHAR(191) NULL,
    ADD COLUMN `friendlyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `purpose` VARCHAR(191) NULL,
    MODIFY `source` ENUM('WALK_IN', 'WEBSITE', 'REFERRAL', 'PHONE', 'ADVERTISEMENT') NOT NULL DEFAULT 'WALK_IN',
    MODIFY `status` ENUM('VISIT', 'REVISIT', 'BOOKED', 'CANCELLED', 'FOLLOW_UP') NOT NULL DEFAULT 'VISIT';

-- CreateIndex
CREATE UNIQUE INDEX `Lead_friendlyId_key` ON `Lead`(`friendlyId`);

-- CreateIndex
CREATE INDEX `Lead_friendlyId_idx` ON `Lead`(`friendlyId`);

-- CreateIndex
CREATE INDEX `Lead_phone_idx` ON `Lead`(`phone`);
