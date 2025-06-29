ALTER TABLE `feed-items` RENAME COLUMN "createdAt" TO "created-at";--> statement-breakpoint
ALTER TABLE `feed-items` ADD `home-id` integer NOT NULL REFERENCES homes(id);