import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `digimon-deck-builder-t3_${name}`);

export const attributes = mysqlTable(
  "attribute",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const cards = mysqlTable(
  "card",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    bp: int("bp"),
    level: int("level"),
    effect: varchar("effect", { length: 512 }),
    image: varchar("image", { length: 512 }).notNull(),
    imageAlt: varchar("imageAlt", { length: 512 }),
    inheritedEffect: varchar("inheritedEffect", { length: 512 }),
    attributeId: int("attributeId"),
    cardTypeId: int("cardTypeId").notNull(),
    setId: int("setId").notNull(),
    stageId: int("stageId"),
    typeId: int("typeId")
  }
);

export const cardRelations = relations(cards, ({ many, one }) => ({
  attributes: one(attributes, {
    fields: [cards.attributeId],
    references: [attributes.id]
  }),
  cardTimings: many(cardTimings),
  cardType: one(cardTypes, {
    fields: [cards.cardTypeId],
    references: [cardTypes.id]
  }),
  colors: many(colors),
  keywords: many(keywords),
  set: one(sets, {
    fields: [cards.setId],
    references: [sets.id]
  }),
  stage: one(stages, {
    fields: [cards.stageId],
    references: [stages.id]
  }),
  typeId: one(types, {
    fields: [cards.typeId],
    references: [types.id]
  })
}));

export const cardTimings = mysqlTable(
  "cardtiming",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const cardTimingRelations = relations(cardTimings, ({ many }) => ({
  card: many(cards)
}));

export const cardTypes = mysqlTable(
  "cardtype",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const cardTypeRelations = relations(cardTypes, ({ many }) => ({
  card: many(cards)
}));

export const colors = mysqlTable(
  "color",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const colorRelations = relations(colors, ({ many }) => ({
  card: many(cards)
}));

export const deckCard = mysqlTable("deckcard", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  quantity: int("quantity"),
  deckId: int("deckId"),
  cardId: int("cardId")
});

export const deckCardRelations = relations(deckCard, ({ one }) => ({
  deck: one(decks, {
    fields: [deckCard.deckId],
    references: [decks.id]
  }),
  card: one(cards, {
    fields: [deckCard.cardId],
    references: [cards.id]
  })
}));

export const decks = mysqlTable("deck", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  strategy: varchar("strategy", { length: 500 }),
  userId: int("userId").notNull()
});

export const deckRelations = relations(decks, ({ many, one }) => ({
  user: one(users, {
    fields: [decks.userId],
    references: [users.id]
  }),
  cards: many(deckCard),
}));

export const keywords = mysqlTable(
  "keyword",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const keywordRelations = relations(keywords, ({ many }) => ({
  card: many(cards)
}));

export const sets = mysqlTable(
  "set",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    identifier: varchar("identifier", { length: 5 }).notNull()
  }
);

export const stages = mysqlTable(
  "stage",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const types = mysqlTable(
  "type",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull()
  }
);

export const typeRelations = relations(types, ({ many }) => ({
  card: many(cards)
}));

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
