CREATE TABLE `accounts` (
	`uuid` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`provider` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`uuid` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT '"2024-09-16T13:42:26.854Z"' NOT NULL,
	`email` text NOT NULL,
	`first_name` text,
	`last_name` text
);
--> statement-breakpoint
CREATE TABLE `users_to_accounts` (
	`account_id` text NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `account_id`),
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`uuid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`uuid`) ON UPDATE no action ON DELETE no action
);
