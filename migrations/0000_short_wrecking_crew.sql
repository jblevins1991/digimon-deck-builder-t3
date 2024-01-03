CREATE TABLE `digimon-deck-builder-t3_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `digimon-deck-builder-t3_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_attribute` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_attribute_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_cardtiming` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_cardtiming_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_cardtype` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_cardtype_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_card` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`bp` int,
	`level` int,
	`effect` varchar(512),
	`image` varchar(512) NOT NULL,
	`imageAlt` varchar(512),
	`inheritedEffect` varchar(512),
	`attributeId` int,
	`cardTypeId` int NOT NULL,
	`setId` int NOT NULL,
	`stageId` int,
	`typeId` int,
	CONSTRAINT `digimon-deck-builder-t3_card_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_color` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_color_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_deckcard` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`quantity` int,
	`deckId` int,
	`cardId` int,
	CONSTRAINT `digimon-deck-builder-t3_deckcard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_deck` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`strategy` varchar(500),
	`userId` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_deck_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_keyword` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_keyword_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_set` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`identifier` varchar(5) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_set_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_stage` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_stage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_type` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `digimon-deck-builder-t3_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `digimon-deck-builder-t3_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `digimon-deck-builder-t3_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `digimon-deck-builder-t3_account` (`userId`);--> statement-breakpoint
CREATE INDEX `attribute_id_index` ON `digimon-deck-builder-t3_card` (`attributeId`);--> statement-breakpoint
CREATE INDEX `card_type_id_index` ON `digimon-deck-builder-t3_card` (`cardTypeId`);--> statement-breakpoint
CREATE INDEX `set_id_index` ON `digimon-deck-builder-t3_card` (`setId`);--> statement-breakpoint
CREATE INDEX `stage_id_index` ON `digimon-deck-builder-t3_card` (`stageId`);--> statement-breakpoint
CREATE INDEX `type_id_index` ON `digimon-deck-builder-t3_card` (`typeId`);--> statement-breakpoint
CREATE INDEX `deck_id_index` ON `digimon-deck-builder-t3_deckcard` (`deckId`);--> statement-breakpoint
CREATE INDEX `card_id_index` ON `digimon-deck-builder-t3_deckcard` (`cardId`);--> statement-breakpoint
CREATE INDEX `user_id_index` ON `digimon-deck-builder-t3_deck` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `digimon-deck-builder-t3_session` (`userId`);