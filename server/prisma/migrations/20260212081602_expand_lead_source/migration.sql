/*
  Warnings:

  - The values [PHONE] on the enum `Lead_source` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Lead` MODIFY `source` ENUM('WALK_IN', 'SOCIAL_MEDIA', 'GOOGLE', 'WEBSITE', 'ADVERTISEMENT', 'REFERRAL', 'OTHER') NOT NULL DEFAULT 'WALK_IN';
