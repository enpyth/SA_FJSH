CREATE TYPE "public"."event_status" AS ENUM('upcoming', 'past');--> statement-breakpoint
CREATE TABLE "fjsh_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"address" text NOT NULL,
	"price" text NOT NULL,
	"image" text,
	"registered_count" integer DEFAULT 0 NOT NULL,
	"max_capacity" integer NOT NULL,
	"organizer" text NOT NULL,
	"contact_email" text NOT NULL,
	"contact_phone" text NOT NULL,
	"status" "event_status" DEFAULT 'upcoming' NOT NULL
);
