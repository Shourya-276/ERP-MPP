/*
  Warnings:

  - You are about to drop the column `city` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Lead` DROP COLUMN `city`,
    DROP COLUMN `occupation`,
    ADD COLUMN `aadhar` VARCHAR(191) NULL,
    ADD COLUMN `age` VARCHAR(191) NULL,
    ADD COLUMN `businessType` VARCHAR(191) NULL,
    ADD COLUMN `companyType` VARCHAR(191) NULL,
    ADD COLUMN `config` VARCHAR(191) NULL,
    ADD COLUMN `cpExec` VARCHAR(191) NULL,
    ADD COLUMN `cpFirm` VARCHAR(191) NULL,
    ADD COLUMN `cpPhone` VARCHAR(191) NULL,
    ADD COLUMN `department` VARCHAR(191) NULL,
    ADD COLUMN `designation` VARCHAR(191) NULL,
    ADD COLUMN `dob` VARCHAR(191) NULL,
    ADD COLUMN `fieldOfWork` VARCHAR(191) NULL,
    ADD COLUMN `floor` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `jobTitle` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `maritalStatus` VARCHAR(191) NULL,
    ADD COLUMN `middleName` VARCHAR(191) NULL,
    ADD COLUMN `nationality` VARCHAR(191) NULL,
    ADD COLUMN `orgName` VARCHAR(191) NULL,
    ADD COLUMN `pinCode` VARCHAR(191) NULL,
    ADD COLUMN `possession` VARCHAR(191) NULL,
    ADD COLUMN `prevOccupation` VARCHAR(191) NULL,
    ADD COLUMN `refContact` VARCHAR(191) NULL,
    ADD COLUMN `refName` VARCHAR(191) NULL,
    ADD COLUMN `residenceType` VARCHAR(191) NULL,
    ADD COLUMN `signature` LONGTEXT NULL,
    ADD COLUMN `sourcesList` TEXT NULL,
    ADD COLUMN `spouseName` VARCHAR(191) NULL,
    ADD COLUMN `spousePhone` VARCHAR(191) NULL,
    ADD COLUMN `subLocation` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL,
    ADD COLUMN `view` VARCHAR(191) NULL,
    ADD COLUMN `workType` VARCHAR(191) NULL,
    ADD COLUMN `yearsInBusiness` VARCHAR(191) NULL,
    ADD COLUMN `yearsOfExperience` VARCHAR(191) NULL,
    ADD COLUMN `yearsOfService` VARCHAR(191) NULL,
    ADD COLUMN `yearsSinceRetirement` VARCHAR(191) NULL;
