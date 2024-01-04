CREATE TABLE `digimon-deck-builder-t3_cardList` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_cardList_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_format` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`banListId` varchar(256),
	`limitedListId` varchar(256),
	CONSTRAINT `digimon-deck-builder-t3_format_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `digimon-deck-builder-t3_deck` ADD `formatId` varchar(256);