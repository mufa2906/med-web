import { relations } from "drizzle-orm";
import { pgTable, text, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";

const ts = (name: string) =>
  timestamp(name).notNull().$defaultFn(() => new Date());

// —— Better Auth (core) ——
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: ts("createdAt"),
  updatedAt: ts("updatedAt"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: ts("createdAt"),
    updatedAt: ts("updatedAt"),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [index("session_userId_idx").on(t.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: ts("createdAt"),
    updatedAt: ts("updatedAt"),
  },
  (t) => [index("account_userId_idx").on(t.userId)],
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: ts("createdAt"),
  updatedAt: ts("updatedAt"),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

// —— CMS / public content ——
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  nameId: text("name_id").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionId: text("description_id").notNull(),
  descriptionEn: text("description_en").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull().default("general"),
  createdAt: ts("created_at"),
  updatedAt: ts("updated_at"),
});

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientRole: text("client_role").notNull().default(""),
  messageId: text("message_id").notNull(),
  messageEn: text("message_en").notNull(),
  createdAt: ts("created_at"),
});

export const gallery = pgTable("gallery", {
  id: text("id").primaryKey(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: ts("created_at"),
});

export const blogs = pgTable(
  "blogs",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    titleId: text("title_id").notNull(),
    titleEn: text("title_en").notNull(),
    contentId: text("content_id").notNull(),
    contentEn: text("content_en").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    publishedAt: timestamp("published_at"),
    createdAt: ts("created_at"),
    updatedAt: ts("updated_at"),
  },
  (t) => [index("blogs_slug_idx").on(t.slug)],
);

export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  nameId: text("name_id").notNull(),
  nameEn: text("name_en").notNull(),
  positionId: text("position_id").notNull(),
  positionEn: text("position_en").notNull(),
  photoUrl: text("photo_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: ts("created_at"),
});

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey(),
    senderName: text("sender_name").notNull(),
    senderEmail: text("sender_email").notNull(),
    messageContent: text("message_content").notNull(),
    createdAt: ts("created_at"),
  },
  (t) => [index("messages_created_idx").on(t.createdAt)],
);
