ALTER TABLE "pinger_project" DROP CONSTRAINT "pinger_project_pinger_url_id_pinger_url_id_fk";
--> statement-breakpoint
ALTER TABLE "pinger_url" DROP CONSTRAINT "pinger_url_pinger_ping_id_pinger_ping_id_fk";
--> statement-breakpoint
ALTER TABLE "pinger_ping" ADD COLUMN "pinger_url_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "pinger_url" ADD COLUMN "pinger_project_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinger_ping" ADD CONSTRAINT "pinger_ping_pinger_url_id_pinger_url_id_fk" FOREIGN KEY ("pinger_url_id") REFERENCES "public"."pinger_url"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinger_url" ADD CONSTRAINT "pinger_url_pinger_project_id_pinger_project_id_fk" FOREIGN KEY ("pinger_project_id") REFERENCES "public"."pinger_project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "pinger_project" DROP COLUMN IF EXISTS "pinger_url_id";--> statement-breakpoint
ALTER TABLE "pinger_url" DROP COLUMN IF EXISTS "pinger_ping_id";