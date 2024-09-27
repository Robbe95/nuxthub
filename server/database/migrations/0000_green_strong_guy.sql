DO $$ BEGIN
 CREATE TYPE "public"."state" AS ENUM('pending', 'success', 'error');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pinger_ping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"time" numeric NOT NULL,
	"state" "state" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pinger_url" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pinger_ping_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"name" text,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"new_thing" text DEFAULT 'some default value'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinger_url" ADD CONSTRAINT "pinger_url_pinger_ping_id_pinger_ping_id_fk" FOREIGN KEY ("pinger_ping_id") REFERENCES "public"."pinger_ping"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_accounts" ADD CONSTRAINT "users_to_accounts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_accounts" ADD CONSTRAINT "users_to_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
