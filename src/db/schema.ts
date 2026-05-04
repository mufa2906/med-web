import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

const timestampMs = (name: string) =>
  integer(name, { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date());

const bool = (name: string, def = false) =>
  integer(name, { mode: "boolean" }).notNull().default(def);

// —— Better Auth (core) ——
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: bool("emailVerified", false),
  image: text("image"),
  createdAt: timestampMs("createdAt"),
  updatedAt: timestampMs("updatedAt"),
});

export const session = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestampMs("createdAt"),
    updatedAt: timestampMs("updatedAt"),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [index("session_userId_idx").on(t.userId)],
);

export const account = sqliteTable(
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
    accessTokenExpiresAt: integer("accessTokenExpiresAt", {
      mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestampMs("createdAt"),
    updatedAt: timestampMs("updatedAt"),
  },
  (t) => [index("account_userId_idx").on(t.userId)],
);

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
  createdAt: timestampMs("createdAt"),
  updatedAt: timestampMs("updatedAt"),
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
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  nameId: text("name_id").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionId: text("description_id").notNull(),
  descriptionEn: text("description_en").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull().default("general"),
  createdAt: timestampMs("created_at"),
  updatedAt: timestampMs("updated_at"),
});

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientRole: text("client_role").notNull().default(""),
  messageId: text("message_id").notNull(),
  messageEn: text("message_en").notNull(),
  createdAt: timestampMs("created_at"),
});

export const gallery = sqliteTable("gallery", {
  id: text("id").primaryKey(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestampMs("created_at"),
});

export const blogs = sqliteTable(
  "blogs",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    titleId: text("title_id").notNull(),
    titleEn: text("title_en").notNull(),
    contentId: text("content_id").notNull(),
    contentEn: text("content_en").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    createdAt: timestampMs("created_at"),
    updatedAt: timestampMs("updated_at"),
  },
  (t) => [index("blogs_slug_idx").on(t.slug)],
);

export const teams = sqliteTable("teams", {
  id: text("id").primaryKey(),
  nameId: text("name_id").notNull(),
  nameEn: text("name_en").notNull(),
  positionId: text("position_id").notNull(),
  positionEn: text("position_en").notNull(),
  photoUrl: text("photo_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestampMs("created_at"),
});

export const messages = sqliteTable(
  "messages",
  {
    id: text("id").primaryKey(),
    senderName: text("sender_name").notNull(),
    senderEmail: text("sender_email").notNull(),
    messageContent: text("message_content").notNull(),
    createdAt: timestampMs("created_at"),
  },
  (t) => [index("messages_created_idx").on(t.createdAt)],
);
