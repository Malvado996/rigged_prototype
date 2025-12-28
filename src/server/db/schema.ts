import { pgTable, serial, text, timestamp, integer, jsonb, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    type: varchar("type", { length: 20 }).notNull(), // "community" | "forum" | "marketplace"
    content: text("content"),
    images: jsonb("images").$type<string[]>(), // array of UploadThing URLs
    upvotes: integer("upvotes").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});