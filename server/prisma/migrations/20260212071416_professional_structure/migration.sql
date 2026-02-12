/*
  Warnings:

  - You are about to drop the column `projectInterest` on the `Lead` table. All the data in the column will be lost.
  - You are about to alter the column `source` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `Revisit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Revisit` DROP FOREIGN KEY `Revisit_leadId_fkey`;

-- AlterTable
ALTER TABLE `Lead` DROP COLUMN `projectInterest`,
    ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `assignedToId` INTEGER NULL,
    ADD COLUMN `projectId` INTEGER NULL,
    MODIFY `source` ENUM('WALK_IN', 'WEBSITE', 'REFERRAL', 'REVISIT', 'PHONE', 'ADVERTISEMENT') NOT NULL DEFAULT 'WALK_IN',
    MODIFY `status` ENUM('NEW', 'ASSIGNED', 'VISIT', 'REVISIT', 'BOOKED', 'CANCELLED') NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('SALES_EXECUTIVE', 'RECEPTIONIST', 'RECEPTIONIST_2', 'ADMIN') NOT NULL DEFAULT 'RECEPTIONIST';

-- DropTable
DROP TABLE `Revisit`;

-- CreateTable
CREATE TABLE `Interaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leadId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `content` TEXT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interaction` ADD CONSTRAINT `Interaction_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
