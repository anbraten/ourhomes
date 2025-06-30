CREATE TABLE `homes-members` (
	`home-id` integer NOT NULL,
	`user-id` integer NOT NULL,
	FOREIGN KEY (`home-id`) REFERENCES `homes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user-id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
