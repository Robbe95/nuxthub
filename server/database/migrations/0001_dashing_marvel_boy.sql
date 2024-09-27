CREATE TABLE IF NOT EXISTS "pinger_project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pinger_url_id" uuid NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"name" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pinger_project" ADD CONSTRAINT "pinger_project_pinger_url_id_pinger_url_id_fk" FOREIGN KEY ("pinger_url_id") REFERENCES "public"."pinger_url"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
