CREATE TABLE "fjsh_users_auth" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "fjsh_users_auth_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "fjsh_users_profile" (
	"email" text PRIMARY KEY NOT NULL,
	"logo" text,
	"introduction" text
);
--> statement-breakpoint
DROP TABLE "posts_table" CASCADE;--> statement-breakpoint
DROP TABLE "users_table" CASCADE;--> statement-breakpoint
ALTER TABLE "fjsh_users_profile" ADD CONSTRAINT "fjsh_users_profile_email_fjsh_users_auth_email_fk" FOREIGN KEY ("email") REFERENCES "public"."fjsh_users_auth"("email") ON DELETE cascade ON UPDATE no action;